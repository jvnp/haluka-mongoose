'use strict'
require('jest')

const MongooseServiceProvider = require('../build/index.js').default
const Haluka = require('@haluka/core').Application
const MongooseManager = require('../build/MongooseManager').default
const path = require('path')

describe('MongooseServiceProvider', () => {

	test('shall register and return mongoose service', async () => {

        let mongo = new MongooseServiceProvider(new Haluka(__dirname))
        mongo.register()

        let db = use('Mongoose/Manager')
        expect(db).toBeInstanceOf(MongooseManager)

        expect(() => await db.setup()).not.toThrow()

    })
})
