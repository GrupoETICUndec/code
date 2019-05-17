const {User, Solution, Problem} = require('../models/index')


module.exports = {
  Mutation:{
    // newUser(username: String!): User!
    newUser: (_,{username}) => {
      return new User({
        username
      }).save()
    },
    // newProblem(name: String!, description: String!): Problem!
    newProblem: (_,{name,description})=>{
      return new Problem({
        name,
        description
      }).save()
    },
    // newTestCase(problemId: ID!, input:String!, output:String!):Problem!
    newTestCase: (_,{problemId, input, output})=>{
      return Problem.findOne({_id: problemId})
              .then((problem)=>{
                problem.testCases.push({
                  input,
                  output
                })
                return problem.save()
              })
    }
    // newSolution(solutionInput: SolutionInput): Solution!
  }
}