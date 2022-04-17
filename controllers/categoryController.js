const Item = require('../models/item')
const Category = require('../models/category')

const async = require('async')
const {body, validationResult} = require('express-validator')
const { __express } = require('pug/lib')
const category = require('../models/category')

exports.index = function(req, res) {
    async.parallel(
        {
          pastry_count: function(callback) {
              Item.countDocuments({name:"pastries"}, callback)
          },
          bread_count: function(callback) {
              Item.countDocuments({name: "breads"}, callback)
          },
          sandwhich_count: function(callback) {
              Item.countDocuments({name: "sandwhiches"}, callback)
          },
          beverage_count: function(callback) {
              Item.countDocuments({name: "beverages"}, callback)
          },
          category_list: function(callback) {
              Category.find({})
                .populate('products')
                .exec(callback)
          }
        }, function(err, results) {
            res.render('index', {title:'Shelf', error: err, data: results})
        }
    )
}

exports.list = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id, callback)
        },
        item: function(callback) {
            Item.find({})
                .populate('category')
                .where('category').equals(req.params.id)
                .exec(callback)
        }
    }, function(err, results) {
            if(err) {return next(err)}            
            res.render('product_list', {title: results.category.name, products: results.item, uri: req.params.id})
    })
}

exports.create_get = function(req, res, next) {
    async.parallel({
        name: function(callback) {
            Category.find(callback)
        },
        description: function(callback) {
            Category.find(callback)
        }
    }, function(err, results) {
        if(err) {return next(err)}
        res.render('category_form', {title: 'Create New Category', name: results.name, description: results.description})
    })
}

exports.create_post = [
    // Validate and sanitize fields
    body('name').trim().isLength({min: 1}).escape().withMessage('Category must have a name.')
        .isAlphanumeric().withMessage('Name cannot have special characters.'),
    body('description').trim().isLength({min: 1}).escape().withMessage('Category must have a description.'),
    
    // Process request after validation and sanitation.
    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.render('category_form', {title: 'Create New Category', name: req.body.name, description: req.body.description, errors: errors.array()})
            return
        } else {
            // Data is valid
            let category = new Category({
                    name: req.body.name,
                    description: req.body.description
                })
            category.save(function(err) {
                if(err) return next(err)
                res.redirect(category.url)
            })
        }
    }
]

exports.update_get = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback)
        }
    }, function(err, results) {
        if(err) return next(err)
        if(results.category === null) {
            let err = new Error('Category not found')
            err.status = 404
            return next(err)
        }
        res.render('category_form', {title: "Update Book", name: category.name, description: category.description})
    })
}

exports.delete_get = function(req, res, next) {
    Category.findById(req.params.id)
        .exec(function(err, results) {
        if(err) return next(err)
        res.render('category_delete', {title: 'Delete Category', category: results})
    })
}

exports.delete_post = function(req, res, next) {
    Category.findByIdAndDelete(req.params.id)
        .exec(function(err, results) {
            if(err) return next(err)
            res.redirect('/inventory')
        })
}