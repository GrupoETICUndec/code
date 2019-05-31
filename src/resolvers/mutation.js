const { Solution, Problem} = require('../models/index')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
  Mutation:{
    // Set new user is useless for the moment 
    // newUser(username: String!): User!
    // newUser: (_,{username}) => {
    //   return new User({
    //     username
    //   }).save()
    // },


    // newProblem(name: String!, description: String!): Problem!
    // TODO: Check if the problem already existed
    newProblem: (_,{name,description}, {user})=>{
      return new Problem({
        name,
        description,
        owner: user
      }).save()
    },


    // newTestCase(problemId: ID!, input:String!, output:String!):Problem!
    // TODO: Check if problem was created by the user who is adding test cases
    newTestCase: (_,{problemId, input, output}, {user})=>{
      return Problem.findOne({_id: problemId})
              .then((problem)=>{
                problem.testCases.push({
                  input,
                  output
                })
                return problem.save()
              })
    },
    // newSolution(solutionInput: SolutionInput): Solution!
    /*
    input SolutionInput{
      problemId: ID!
      source_code: String!
      language: Int!
    }
    */
    newSolution: (_,{solutionInput},{user})=>{
        var {problemId, source_code, language} = solutionInput
        problemId = ObjectId(JSON.parse(problemId))
        return new Solution({
          problem: problemId,
          source_code,
          language,
          owner:user
        }).save()
      }
    }
  }