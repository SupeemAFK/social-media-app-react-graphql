const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');;
const mongoose = require('mongoose');
const redisClient = require('redis').createClient();
const RedisStore = require('connect-redis')(session);
const authRoute = require('./routes/auth');
const passport = require('passport');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');
const { ApolloServer } = require('apollo-server-express')
const { graphqlUploadExpress } = require("graphql-upload");
require('./config/passport');
require('dotenv').config()

async function run() {
    const app = express();
    const corsOptions = {
        origin: process.env.CLIENT_URL,
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }
    const csrfProtection = csrf({ cookie: { httpOnly: true, secure: true } })
    app.use(cors(corsOptions));;
    app.use(cookieParser(process.env.SESSION_SECRET))
    app.use(session({
        secret: process.env.SESSION_SECRET,
        store: new RedisStore({ client: redisClient }),
        resave: false,
        saveUninitialized: false,
        cookie: { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000 // 1 hour
        }
    }));
    app.use(csrfProtection) //csrf prevention
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(graphqlUploadExpress());
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/csrf-token', (req, res) => res.status(200).json({ csrfToken: req.csrfToken() })) //get csrf-token

    //auth route
    app.use('/auth', authRoute) 

    //graphql route
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers, 
        context: ({ req }) => {
            if (req.isAuthenticated()) {
                return { user: req.user }
            }
        },
    });
    await server.start()
    server.applyMiddleware({ app, cors: corsOptions });

    const PORT = process.env.PORT || 5000
    const URL = "localhost"
    mongoose.connect(process.env.MONGOOSE_CONNECTION_URL)
        .then(() => app.listen(PORT, () => console.log(`Server are running on ${URL}: ${PORT} 🚀`)))
        .catch(err => console.error(err))
}

run()
