import * as mongoose from 'mongoose'
import * as _ from 'lodash';

/**
 * @name HalukaMongoose
 * @author Jeevan Prakash Pant
 */

export default class MongooseManager {

    /**
      * Configs from configuaration file
      */
    protected config: any;

    /**
     * Check if database is connected
     */
    private booted: boolean;

    /**
     * Array of connections
     */
    protected connections: any[];

    constructor(config: any): any {
        this.config = config;
        this.booted = false;
    }

    private function createConnection(conf): Promise<any> {
        var connString = `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.database}`;
        var conn = await mongoose.createConnection(connString, Object.assign({ useNewUrlParser: true }, conf.options));
        return conn
    };

    private function setup (): Promise<void> {
		// Setup All Database
		for (var conf in this.config.connections) {
			var connection = this.config.connections[conf]
			this.connections[conf] = await createConnection(connection)
			this.app.use('Axe/Events').fire('Database.Connected', conf, connection)
		}
		if (!!this.config['default'] && !!this.config['connections'] && this.config.default in this.config['connections']) {
			this.connections['default'] = this.connections[this.config.default]
		}
		this.booted = true;
	}

	private function booted (): boolean {
		return this.booted;
	}

	public function default ():any {
		return this.connections['default'];
	}

	function using (conn): any {
		if (this.connections[conn])
			return this.connections[conn]
		else
			throw new Error(`No database connection exists  with name '${conn}'. Please check your database config.`)
	}

	async function close (conn): void {
		if (!!this.connections[conn]) {
            await (this.connections[conn]).close()
            // TODO: fire event (if needed)

		}
	}

	async function closeAll (): void {
		for (var conn in _.omit(this.connections, ['default'])) {
            await this.close(conn)
            // TODO: fire event (if needed)
		}
	}

}
