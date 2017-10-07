var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    models = require('./../../models');
var sha1 = require('sha1');
var RolesService = require('./../../services/RolesService')



passport.serializeUser(function (user, fn) {
    fn(null, user.id);
});


// deserializeUser is passed a function that will return the user the
// belongs to an id.
passport.deserializeUser(function (id, fn) {
    models.user
        .findOne({ where: {id: id} }).then(user => {
            fn(null, user)
        }, err => {
            fn(err, null)
    })
});


passport.use(new LocalStrategy(
    function(username, password, done) {
        try{
            models.user.findOne({ where: {email: username}}).then(
                function (user) {
                    if (!user) {
                        return done(null, false, { message: 'Incorrect login.' });
                    }
                    if (user.password != sha1(password) ) {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                    return done(null, user);
                }, function (err) {
                    return done(err);
                }
            );
        } catch (e){
            console.error(e);
        }

    }
));

module.exports.isAuthenticated = function(redirect){
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else{
            if(redirect) {
                return res.redirect(redirect);
            } else {
                return res.status(401).send();

            }
        }
    }
};

module.exports.hasRight = function(right){
    return function (req, res, next) {
        // make sure the user is logged in.
        if (req.isAuthenticated()) {
            RolesService.getRightListById(req.user.roleId).then(function(rightList) {
                // make sure the user has the right
                var inList = false;
                for(var i in rightList){
                    if(rightList[i].label == right){
                        inList = true;
                    }
                }
                if (inList) {
                    return next();
                } else {
                    // if the user can not access bo, redirect to front
                    return res.status(403).send();
                }
            });
        } else{
            // otherwise redirect to login
            return res.status(401).send();
        }
    }
};
