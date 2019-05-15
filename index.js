const {GraphQLServer} = require('graphql-yoga')
const mongoose = require('mongoose')
const resolvers = require('./src/resolvers/index')

const server = new GraphQLServer({
    typeDefs: './src/schema/schema.graphql',
    resolvers,
})


mongoose.connect("mongodb://localhost:27017/code",{useNewUrlParser: true}).then(()=>{
  server.start(()=>{
    console.log("Server running")
  })
}).catch(err =>{
  console.log(err)
});