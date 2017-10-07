var UserController = require('./../controllers/UserController');
var PersonInfosService = require('./../services/PersonInfosService');

describe('Role Controller', function() {
    describe('#create()', function() {
        it('should save without error', function(done) {
            UserController.create({
                login : 'TEST',
                password : 'apideo',
                person_info : {
                    email  : "test@test.com",
                    firstName  : "test",
                    lastName  : "test"
                },
                role : {
                    label : 'ADMINISTRATOR'
                }
            }).then(function () {
                done();
            })
        });
    });
});




