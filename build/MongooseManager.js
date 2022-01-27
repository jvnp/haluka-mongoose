'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const mongoose_1 = require("mongoose");
/**
 * @name HalukaMongoose
 * @author Jeevan Prakash Pant
 */
class MongooseManager {
    constructor(config, app) {
        /**
         * Array of connections
         */
        this.connections = [];
        this.config = config;
        this.app = app;
        this._booted = false;
    }
    mongoConnect(conf) {
        var connString = `mongodb://${conf.username}:${conf.password}@${conf.host}:${conf.port}/${conf.database}`;
        return (0, mongoose_1.createConnection)(connString, Object.assign({ useNewUrlParser: true }, conf.options));
    }
    setup() {
        // Setup All Database
        for (var conf in this.config.connections) {
            var connection = this.config.connections[conf];
            this.connections[conf] = this.mongoConnect(connection);
            this.app.use('Haluka/Core/Events').fire('Database.Connected', conf, connection);
        }
        if (!!this.config['default'] && !!this.config['connections'] && this.config.default in this.config['connections']) {
            this.connections['default'] = this.connections[this.config.default];
        }
        this._booted = true;
    }
    booted() {
        return this._booted;
    }
    default() {
        return this.connections['default'];
    }
    using(conn) {
        if (this.connections[conn])
            return this.connections[conn];
        else
            throw new TypeError(`No database connection exists  with name '${conn}'. Please check your database config.`);
    }
    async close(conn) {
        if (!!this.connections[conn]) {
            await (this.connections[conn]).close();
            this.app.use('Haluka/Core/Events').fire('Database.Closed', conn, this.connections[conn]);
        }
    }
    async closeAll() {
        for (var conn in _.omit(this.connections, ['default'])) {
            await this.close(conn);
        }
    }
}
exports.default = MongooseManager;
//# sourceMappingURL=MongooseManager.js.map