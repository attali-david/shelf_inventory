const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupSchema = new Schema(
    {
        name: String,
        perishable: Boolean
    }
 )

 GroupSchema.virtual('url').get(function(){
     return '/inventory/' + this._id
 })

 module.exports = mongoose.model('Group', GroupSchema)