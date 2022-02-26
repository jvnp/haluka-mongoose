import { Connection, ConnectOptions } from 'mongoose';
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
    private _booted;
    /**
     * Array of connections
     */
    protected connections: Connection[];
    constructor(config: IMongooseConfig, app: Application);
    private mongoConnect;
    setupAll(): void;
    booted(): boolean;
    default(): Connection;
    using(conn: string): Connection;
    close(conn: string): Promise<void>;
    closeAll(): Promise<void>;
}
export interface IConnectionConfig {
    connString: string;
    options: ConnectOptions;
}
export interface IMongooseConfig {
    default: string;
    connections: {
        [key: string]: IConnectionConfig;
    };
}
