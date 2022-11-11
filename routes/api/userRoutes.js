const router = require('express').Router(); 

const { 
    users, 
    singleUser, 
    createUser, 
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

} = require('../../controllers/user-controller'); 

router.route('/').get(users).post(createUser); 

router.route('/:userId').get(singleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend); 

module.exports = router; 


