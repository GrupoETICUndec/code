const {Schema, model} = require('mongoose')


// type Solution{
//     _id: ID!
//     owner: User!
//     problem: Problem!
//     source_code: String!
//     language: Int!
//     status: Int       
// }
const solutionSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    problem: {type: Schema.Types.ObjectId, ref: 'Problem'},
    source_code: { type : String, required : true },
    language: { type : Number, required : true },
    status: Number
})


const Solution = model('Solution', solutionSchema)

module.exports = Solution;