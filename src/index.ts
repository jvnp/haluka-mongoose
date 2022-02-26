
import { Application, IServiceProvider, ServiceProvider } from '@haluka/core'

import MongooseManager from './MongooseManager'

/**
 * @name HalukaMongoose
 * @author Jeevan Prakash Pant
 */

export default class MongooseServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.singleton('Mongoose/Manager', function (app: Application) {

			const mongooseConfig = config('database.mongoose')
			return new MongooseManager(mongooseConfig, app)

		})
	}

}
