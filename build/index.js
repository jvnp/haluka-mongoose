"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@haluka/core");
const MongooseManager_1 = require("./MongooseManager");
/**
 * @name HalukaMongoose
 * @author Jeevan Prakash Pant
 */
class MongooseServiceProvider extends core_1.ServiceProvider {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.singleton('Mongoose/Manager', function (app) {
            const mongooseConfig = config('mongoose');
            return new MongooseManager_1.default(mongooseConfig, app);
        });
    }
}
exports.default = MongooseServiceProvider;
//# sourceMappingURL=index.js.map