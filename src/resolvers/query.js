const {User, Problem, Solution} = require('../models/index')


module.exports = {
  Query:{
    // getUser: User!
    getUser: (_, {id}) =>{
      return User.findOne({_id: id})
    },
    // getProblems: [Problem!]!
    getProblems: ()=>{
      return Problem.find()
    },
    // getProblem(problemId: ID!): Problem!
    getProblem: (_, {problemId})=>{
      return Problem.findOne({_id: problemId})
    },
    // getSolutions: [Solution]!
    getSolutions: ()=>{
      return Solution.find()
    },
    // getSolution(solutionId: ID!): Solution!
    getSolution: (_,{solutionId})=>{
      return Solution.findOne({_id: solutionId})
    }
  }
}