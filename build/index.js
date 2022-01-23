"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@haluka/core");
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
            let mongooseConfig = config('mongoose');
            return 0;
        });
    }
}
exports.default = MongooseServiceProvider;
//# sourceMappingURL=index.js.map