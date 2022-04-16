// GROUP ROUTES //

// GET request to create group
router.get('/group/create', group_controller.create_get)

// POST request to create group
router.post('/group/create', group_controller.create_post)

// GET request to delete group
router.get('/group/:id/delete', group_controller.delete_get)

// POST request to delte group
router.post('/group/:id/delete', group_controller.delete_post)

// GET request to update group
router.get('/group/:id/update', group_controller.update_post)

// POST request to update Group
router.post('/group/:id/update', group_controller.update_post)

// GET request for one group
router.get('/group/:id', group_controller.detail)

// GET request for list of all groups
router.get('/groups', group_controller.list)





// ITEM INSTANCE ROUTES //

// GET request to create item_instance
router.get('/item_instance/create')

// POST request to create item_instance
router.post('/item_instance/create')

// GET request to delete item_instance
router.get('/item_instance/:id/delete')

// POST request to delte item_instance
router.post('/item_instance/:id/delete')

// GET request to update item_instance
router.get('/item_instance/:id/update')

// POST request to update Group
router.post('/item_instance/:id/update')

// GET request for one item_instance
router.get('/item_instance/:id')

// GET request for list of all item instances
router.get('/item_instances')


// CATEGORY ROUTES //

// GET request to create category
router.get('/category/create')

// POST request to create category
router.post('/category/create')

// GET request to delete category
router.get('/category/:id/delete')

// POST request to delte category
router.post('/category/:id/delete')

// GET request to update category
router.get('/category/:id/update')

// POST request to update Group
router.post('/category/:id/update')

// GET request for one category
router.get('/category/:id')

// GET request for list of all categories
router.get('/categories')

