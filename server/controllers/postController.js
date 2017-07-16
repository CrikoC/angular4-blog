var postController = function(Post) {

    var getAll = function(req,res) {
        // Post.find(function (err, posts) {
        //     if(err) res.status(500).send(err);
        //     else res.json(posts);
        //});
        res.json(req.posts);
    };

    var get = function (req,res) {
        res.json(req.post);
    };

    var post = function(req,res) {
        //creating new instance of model and pass the bodyParser
        var post = new Post(req.body);

        if(!req.body.name) {
            res.status(400);
            res.send('Name is required');
        } else {
            //saving in db
            post.save();
            //status 201 means created
            res.status(201);
            //send result
            res.send(post);
        }
    };

    var put = function(req,res) {
        req.post.name = req.body.name;
        req.post.body = req.body.body;
        req.post.author = req.body.author;
        req.post.published_at = req.body.published_at;

        req.post.save(function (err) {
            if (err) res.status(500).send(err);
            else {
                res.json(req.post);
            }
        });
    };

    var patch = function(req,res) {
        //first we delete the id
        if(req.body._id) delete(req.body._id);
        //then we loop through all the sets of the collection
        for(var set in req.body) {
            req.post[set] = req.body[set];
        }
        req.post.save(function (err) {
            if (err) res.status(500).send(err);
            else {
                res.json(req.post);
            }
        });
    };

    var remove = function(req,res) {
        req.post.remove(function(err) {
            if (err) res.status(500).send(err);
            else {
                //204 means removed
                res.status(204).send('Post removed');
            }
        });
    };

    return {
        getAll: getAll,
        get:    get,
        post:   post,
        put:    put,
        patch:  patch,
        remove: remove
    };
};

module.exports = postController;