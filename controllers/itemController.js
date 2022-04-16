const Item = require('../models/item')
const Category = require('../models/category')

const async = require('async')
const {body, validationResult} = require('express-validator')
const item = require('../models/item')
// exports.index = 

// exports.list = 

// exports.detail = 

exports.create_get = function(req, res, next) {
    res.render('product_form', )
}

exports.create_post = [
    body("name").trim().isLength({min: 1}).escape().withMessage('Product must have a name')
    .isAlphanumeric().withMessage("Name cannot have special characters"), 
    body('description').trim().isLength({min: 1}).escape().withMessage('Product must have a description'), 
    body('quantity').isNumeric().withMessage('Quantity must be a number greater than 0'),
    body('price').isNumeric().withMessage("Price must be a number greater than 0"),
    body('group').trim().isLength({min: 1}).escape().withMessage('Product must have a group'),
    body('best_by').isISO8601().toDate(),

    (req, res, next) => {
         async.parallel({
             category: function(callback) {
                 Category.findById(req.params.id)
                    .exec(callback)
             }
         }, function(err, results) {
            if(err) next(err)
            const errors = validationResult(req)
            let item = new Item({
                name: req.body.name,
                description: req.body.description,
                quantity: req.body.quantity,
                price: req.body.price,
                group: req.body.group,
                category: results.category            
            })
                        
            if(!errors.isEmpty()) {
                res.render('product_form', {title: 'Create Item', item: item, errors: errors.array()})
                return
            }
             else {
                 item.save(function(err) {
                     if(err) return next(err)
                     res.redirect(item.category.url)
                 })
                }
         }) 
    }
]

// exports.delete_get = 

// exports.delete_post = 

// exports.update_get = 

// exports.update_post = 