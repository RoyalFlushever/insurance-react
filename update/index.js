var RoleController = require('./../controllers/RoleController');

/**
 * Update role
 */
RoleController.updateRoleAndRight().then(
    function (data) {
        process.exit()
    },function (err) {
        console.log(err);
        process.exit()
    }
);