var categoryController = function(Category) {

    var getAll = function(req,res) {
        Category.find(function(err, categories) {
            if(err) res.status(500).send(err);
            else res.json(categories);
        });
    };

    var get = function (req,res) {
        res.json(req.category);
    };

    var post = function(req,res) {
        //creating new instance of model and pass the bodyParser
        var category = new Category(req.body);

        if(!req.body.name) {
            res.status(400);
            res.send('Name is required');
        } else {
            //saving in db
            category.save();
            //status 201 means created
            res.status(201);
            //send result
            res.send(category);
        }
    };

    var put = function(req,res) {
        req.category.name = req.body.name;
        req.category.body = req.body.body;

        req.category.save(function (err) {
            if (err) res.status(500).send(err);
            else {
                res.json(req.category);
            }
        });
    };

    var patch = function(req,res) {
        //first we delete the id
        if(req.body._id) delete(req.body._id);
        //then we loop through all the sets of the collection
        for(var set in req.body) {
            req.category[set] = req.body[set];
        }
        req.category.save(function (err) {
            if (err) res.status(500).send(err);
            else {
                res.json(req.category);
            }
        });
    };

    var remove = function(req,res) {
        req.category.remove(function(err) {
            if (err) res.status(500).send(err);
            else {
                //204 means removed
                res.status(204).send('Category removed');
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

module.exports = categoryController;