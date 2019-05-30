const {gql} = require('apollo-server')

module.exports = gql`

type Solution{
    _id: ID!
    source_code: String!
    language: Int!
    owner: ID!
    problem: Problem!
    status: Int       
}
input SolutionInput{
    problemId: ID!
    source_code: String!
    language: Int!
}    

type TestCase{
    _id: ID!
    input: String!
    output: String!
}
type Problem{
    _id: ID!
    name: String!
    description: String!
    testCases: [TestCase]!
    owner: ID!
}

type Query{
    getProblems: [Problem!]!
    getProblem(problemId: ID!): Problem!
    getSolutions: [Solution]!
    getSolution(solutionId: ID!): Solution!
}

type Mutation{
    newProblem(name: String!, description: String!): Problem!
    newTestCase(problemId: ID!, input:String!, output:String!):Problem!
    newSolution(solutionInput: SolutionInput): Solution!
}
`