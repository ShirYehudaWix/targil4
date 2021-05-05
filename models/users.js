const debug = require("debug")("mongo:model-user");
const mongo = require("mongoose");


import { google } from 'googleapis';

const googleConfig = {
    clientId: '<GOOGLE_CLIENT_ID>', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: '<GOOGLE_CLIENT_SECRET>', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'https://your-website.com/google-auth' // this must match your google api settings
};

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}
/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}

/**
 * Create the google url to be sent to the client.
 */
function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
}

module.exports = db => {
    // create a schema
    let schema = new mongo.Schema({
        type: { type: String, required: true },
        'first-name': { type: String, required: true },
        'last-name': { type: String, required: true },
        address: { type: String, required: true },
        'phone-number': { type: String, required: true },
        email: { type: String, required: true, unique: true, index: true },
        password: { type: String, required: true },
        'branch-number':String,
        ststus:{ type: String, required: true },
    }, { autoIndex: false });

    // custom method to add string to end of name
    // you can create more important methods like name validations or formatting
    // you can also do queries and find similar users
    // schema.methods.dudify = function() {
    //     // add some stuff to the users name
    //     this.name = this.name + '-dude';
    //     return this.name;
    // };

    schema.statics.CREATE = async function(user) {
        return this.create({
            type: user[0],
            'first-name': user[1],
            'last-name': user[2],
            address: user[3],
            'phone-number': user[4],
            email: user[5],
            password: user[6],
            'branch-number':user[7],
            ststus:user[8]
            
        });
    };

    // on every save, add the date
    schema.pre('save', function(next) {
        // get the current date
        let currentDate = new Date();
        // change the updated_at field to current date
        this.updated_at = currentDate;
        // if created_at doesn't exist, add to that field
        if (!this.created_at)
            this.created_at = currentDate;
        next();
    });

    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = Array.from(arguments); // [...arguments]
        if (args.length === 0) {
            debug("request: no arguments - bring all at once");
            return this.find({}).exec();
        }

        // perhaps last argument is a callback for every single document
        let callback = arguments[arguments.length - 1];
        if (callback instanceof Function) {
            let asynch = callback.constructor.name === 'AsyncFunction';
            debug(`request: with ${asynch?'async':'sync'} callback`);
            args.pop();
            let cursor, user;
            try {
                cursor = await this.find(...args).cursor();
            } catch (err) { throw err; }
            try {
                while (null !== (user = await cursor.next())) {
                    if (asynch) {
                        try {
                            await callback(user);
                        } catch (err) { throw err; }
                    }
                    else {
                        callback(user);
                    }
                }
            } catch (err) { throw err; }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    // the schema is useless so far
    // we need to create a model using it
    // db.model('User', schema, 'User'); // (model, schema, collection)
    db.model('users', schema); // if model name === collection name
    debug("User model created");
};
