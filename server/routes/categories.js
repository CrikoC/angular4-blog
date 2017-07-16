/********************************************/
/*             CATEGORY ROUTES              */
/********************************************/
var express = require('express');
var passport = require('passport');

var categoryRoutes = function(Category) {
    var CategoryRouter = express.Router();
    var categoryController = require('../controllers/categoryController')(Category);

    //View all categories
    CategoryRouter.route('/', passport.authenticate('jwt', {session:false}))
        .get(categoryController.getAll);
    //View add mode for new category
    CategoryRouter.route('/add', passport.authenticate('jwt', {session:false}))
        .post(categoryController.post);
    //Middleware for updating categories
    CategoryRouter.use('/:id',function (req,res,next) {
        Category.findById(req.params.id, function (err, category) {
            if (err) res.status(500).send(err);
            else if(category) {
                req.category = category;
                next();
            }
            else {
                res.status(404).send('No category found');
            }
        })
    });

    //View selected category
    CategoryRouter.route('/:id',passport.authenticate('jwt', {session:false}))
        .get(categoryController.get)
        .put(categoryController.put)
        .patch(categoryController.patch)
        .delete(categoryController.remove);


    return CategoryRouter;
};

module.exports = categoryRoutes;
/********************************************/