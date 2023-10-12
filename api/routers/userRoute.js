const router = require("express").Router();

const {
    userCreate, getUsers
} = require('../controllers/userController');


router.post('/create', userCreate);
router.get('/all', getUsers);


module.exports = router;