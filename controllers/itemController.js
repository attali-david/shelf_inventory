const Item = require('../models/item')
const Category = require('../models/category')

const async = require('async')
const {body, validationResult} = require('express-validator')
const item = require('../models/item')

exports.detail = function(req, res, next) {
    Item.findById(req.params.id)
    .populate('group')
    .exec(function(err, results) {
        if(err) next(err)
        if(results === null) {
            let error = new Error('Product not found')
            error.status = 404
            return next(error)
        }
        console.log(results)
        res.render('product_detail', {title: results.name, item: results})
    })
}

exports.create_get = function(req, res, next) {
    res.render('product_form')
}

exports.create_post = [
    body("name").trim().isLength({min: 1}).escape().withMessage('Product must have a name')
    .isAlphanumeric().withMessage("Name cannot have special characters"), 
    body('description').trim().isLength({min: 1}).escape().withMessage('Product must have a description'), 
    body('quantity').isNumeric().withMessage('Quantity must be a number greater than 0'),
    body('price').isNumeric().withMessage("Price must be a number greater than 0"),
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
                best_by: req.body.best_by,
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

exports.delete_get = function(req, res, next) {
    Item.findById(req.params.id, function(err, results) {
        if(err) return next(err)
        res.render('product_delete', {title: 'Delete', item: results})
    })
}

exports.delete_post = function(req, res, next) {
    Item.findByIdAndRemove(req.params.id, function(err, results) {
        if(err) return next(err)
        res.redirect('/inventory')
    })
}

exports.update_get = function(req, res, next) {
        Item.findById(req.params.id)
            .populate('group')
            .exec(function(err, results) {
                if(err) return next(err)
                if(results === null) {
                    let error = new Error('Product not found')
                    error.status(404)
                    return next(error)
                }
                res.render('product_form', {title: 'Edit Product', item: results})
            })
}

exports.update_post = [
    body('name').trim().notEmpty().withMessage('Product must have a name.').escape(),
    body('description').trim().notEmpty().withMessage('Product must have a description').escape(),
    body('quantity').isNumeric().withMessage('Quantity must be a number greater than 0.'),
    body('price').isNumeric().withMessage('Price must be a number greater than 0'),
    body('best_by').isISO8601().toDate(),

    (req, res, next) => {
        let errors = validationResult(req)

        let item = new Item({
            name: req.body.name,
            description: req.body.description,
            quantity: req.body.quantity,
            price: req.body.price,
            best_by: req.body.best_by,
            category: req.params.id,
            _id: req.params.id
        })

        if(!errors.isEmpty()) {
            res.render('product_form', {title: 'Update Product', item: item, errors: errors.array()})
            return
        } else {
            Item.findByIdAndUpdate(req.params.id, item, {}, function(err, theitem) {
                if(err) return next(err)
                res.redirect(theitem.url)
            })
        }
    }

]