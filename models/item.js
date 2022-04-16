const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}, 
        group: {type: Schema.Types.ObjectId, ref: 'Group'},
        category: {type: Schema.Types.ObjectId, ref: 'Category'}
    }
)

ItemSchema.virtual('url').get(function(){
    return '/inventory/' + this._id
})

module.exports = mongoose.model('Item', ItemSchema)