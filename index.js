const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


const resolvers = require('./src/resolvers/index')
const typeDefs = require('./src/schema/schema.js')


var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://code-etic.auth0.com/.well-known/jwks.json'
    }),
    audience: 'localhost:4000',
    issuer: 'https://code-etic.auth0.com/',
    algorithms: ['RS256']
});
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors:{ credentials: true, origin: "http://localhost:8080" },
    context: ({req}) => {
      return {
        user: req.user.sub
      }
    }
})
const app = express();
// Additional middleware can be mounted at this point to run before Apollo.
app.use(jwtCheck);

server.applyMiddleware({app});

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/code",{useNewUrlParser: true}).then(()=>{
  app.listen({port: 4000}, ()=>{
    console.log("Server running")
  })
}).catch(err =>{
  console.log(err)
});



