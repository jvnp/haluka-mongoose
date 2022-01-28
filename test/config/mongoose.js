'use strict'

module.exports = {

	/**
	|--------------------------------------------------------------------------
	| Default Mongoose Connection
	|--------------------------------------------------------------------------
	|
	| This is the database connection to be used by default in application.
	| Default database can be access by using `default()` method from Database
	| provider.
	|
	| @example:
	|
	| const db = use('Database')
	| var default_db = db.default()
	|
	*/
	default: 'mongoose1',

	/**
	|--------------------------------------------------------------------------
	| Available Database Connections
	|--------------------------------------------------------------------------
	|
	| This object contains the database connections to use in the application.
	| Multiple entries can be added for multi-connection even for the same driver.
	|
	| @example:
	|
	| 	mongodb : {
	|		//...
	|	},
	| 	mongodb2 : {
	|		//...
	|	}
	|
	| Later, these connections can be used by `using()` method in Database provider.
	|
	| @example:
	| var mongo2 = use('Database').using('mongodb2')
	|
	*/
	connections: {

		mongoose1: {

			// Database Server Info
			host: env('DB_HOST', ''),
			port: env('DB_PORT', ''),
			database: env('DB_NAME', 'haluka'),
			username: env('DB_USER', ''),
			password: env('DB_PASS', ''),
			options: {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				retryWrites: true,
				w: 'majority'
			}
		},

	},

}