const router = require('express').Router(); 

const { 
    thoughts, 
    singleThought, 
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thought-controller'); 

router.route('/').get(thoughts).post(createThought); 

router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction); 

router.route('/:thoughtId/reactions').post(addReaction)

module.exports = router; 

