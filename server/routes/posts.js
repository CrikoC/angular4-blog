/********************************************/
/*               POST ROUTES                */
/********************************************/
var express = require('express');
var passport = require('passport');

var postRoutes = function(Post) {
    var PostRouter = express.Router();
    var postController = require('../controllers/postController')(Post);

    PostRouter.use('/:category_id',function (req,res,next) {
        const query = {category_id:req.params.category_id};
        Post.find(query, function (err, posts) {
            if (err) res.status(500).send(err);
            else if(posts) {
                req.posts = posts;
                next();
            }
            else {
                res.status(404).send('No posts found');
            }
        })
    });

    //View all posts
    PostRouter.route('/:category_id', passport.authenticate('jwt', {session:false}))
        .get(postController.getAll);
    //View add mode for new post
    PostRouter.route('/add', passport.authenticate('jwt', {session:false}))
        .post(postController.post);
    //Middleware for updating posts
    PostRouter.use('/:id',function (req,res,next) {
        Post.findById(req.params.id, function (err, post) {
            if (err) res.status(500).send(err);
            else if(post) {
                req.post = post;
                next();
            }
            else {
                res.status(404).send('No post found');
            }
        })
    });

    //View selected post
    PostRouter.route('/:id',passport.authenticate('jwt', {session:false}))
        .get(postController.get)
        .put(postController.put)
        .patch(postController.patch)
        .delete(postController.remove);


    return PostRouter;
};

module.exports = postRoutes;
/********************************************/