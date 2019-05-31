const {Problem, Solution} = require('../models/index')


module.exports = {
  Query:{
    // getUser: User!
    //Getting the user from auth0
    // getUser: (parent,_, {user}) =>{
    //   return User.findOne({_id: user})
    // },
    // getProblems: [Problem!]!
    getProblems: ()=>{
      return Problem.find()
    },
    // getProblem(problemId: ID!): Problem!
    getProblem: (_, {problemId})=>{
      return Problem.findOne({_id: problemId})
    },
    // getSolutions: [Solution]!
    getSolutions: (parent,_,{user})=>{
      return Solution.find({owner: user}).populate('problem')
    },
    // getSolution(solutionId: ID!): Solution!
    // TODO check if solution was created by the user who is requiring it
    getSolution: (_,{solutionId})=>{
      return Solution.findOne({_id: solutionId})
    }
  }
}