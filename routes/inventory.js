const express = require('express')
const router = express.Router()

const group_controller = require('../controllers/groupController')
const item_controller = require('../controllers/itemController')
const item_instance_controller = require('../controllers/itemInstanceController')
const category_controller = require('../controllers/categoryController')

// GET inventory home page
router.get('/', category_controller.index)

// // CATEGORY ROUTES //

// GET request to create category
router.get('/category/create', category_controller.create_get)

// POST request to create category
router.post('/category/create', category_controller.create_post)

// GET request to create item
router.get('/category/:id/create_item', item_controller.create_get)

// // POST request to create item
router.post('/category/:id/create_item', item_controller.create_post)

// // GET request to delete category
// router.get('/category/:id/delete')

// // POST request to delete category
// router.post('/category/:id/delete')

// GET request to update category
router.get('/category/:id/update')

// // POST request to update Group
// router.post('/category/:id/update')

// GET request for one category
router.get('/category/:id', category_controller.list)


// ITEM ROUTES //


// // GET request to delete item
// router.get('/item/:id/delete')

// // POST request to delte item
// router.post('/item/:id/delete')

// // GET request to update item
// router.get('/item/:id/update')

// // POST request to update Group
// router.post('/item/:id/update')

// // GET request for one item
// router.get('/item/:id')

// // GET request for list of all items
// router.get('/items')


module.exports = router