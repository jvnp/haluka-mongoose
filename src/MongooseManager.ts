'use strict'

import * as _ from 'lodash';
import { createConnection, Connection, ConnectOptions } from 'mongoose'
import { Application } from '@haluka/core';

/**
 * @name HalukaMongoose
 * @author Jeevan Prakash Pant
 */

export default class MongooseManager {

	/**
     * Haluka Application Instance
     */
	protected app: Application;

    /**
      * Configs from configuaration file
      */
    protected config: IMongooseConfig;

    /**
     * Check if database is connected
     */
    private _booted: boolean;


    /**
     * Array of connections
     */
    protected connections: Connection[] = [];

    constructor(config: IMongooseConfig, app: Application) {
        this.config = config;
		this.app = app;
        this._booted = false;
    }

    private async mongoConnect (conf: IConnectionConfig): Connection {
        var connString = `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.database}`;
		return await createConnection(connString, Object.assign({ useNewUrlParser: true }, conf.options));
    }

    public async setup () {
		// Setup All Database
		for (var conf in this.config.connections) {
			var connection = this.config.connections[conf]
			this.connections[conf] = await this.mongoConnect(connection)
			this.app.use<any>('Haluka/Core/Events').fire('Database.Connected', conf, connection)
		}
		if (!!this.config['default'] && !!this.config['connections'] && this.config.default in this.config['connections']) {
			this.connections['default'] = this.connections[this.config.default]
		}
		this._booted = true;
	}

	public booted (): boolean {
		return this._booted;
	}

	public  default (): Connection {
		return this.connections['default'];
	}

	using (conn: string): Connection {
		if (this.connections[conn])
			return this.connections[conn]
		else
			throw new TypeError(`No database connection exists  with name '${conn}'. Please check your database config.`)
	}

	public async close (conn: string) {
		if (!!this.connections[conn]) {
            await (this.connections[conn]).close()
            this.app.use<any>('Haluka/Core/Events').fire('Database.Closed', conn, this.connections[conn])

		}
	}

	async closeAll () {
		for (var conn in _.omit(this.connections, ['default'])) {
            await this.close(conn)
		}
	}

}

export interface IConnectionConfig {
	username: string
	password: string
	host: string
	port: number | string
	database: string,
	options: ConnectOptions
}

export interface IMongooseConfig {
	default: string,
	connections: { [key: string]: IConnectionConfig; }
}