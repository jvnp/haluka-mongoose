import * as mongoose from 'mongoose'

/**
 * @name HalukaMongoose
 * @author Jeevan Prakash Pant
 */

export default class MongooseManager {
    public ConfigName: string;
    constructor(ConfigName: string){
        this.ConfigName = ConfigName

        // create connection for all configs and return connections
    }

    // TODO: function to return connections from config

}
