
import { Application, IServiceProvider, ServiceProvider } from '@haluka/core'

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

			let mongooseConfig = config('mongoose')

			// TODO 1: Connection Class

			// TODO 2: Return Connections

		})
	}

}
