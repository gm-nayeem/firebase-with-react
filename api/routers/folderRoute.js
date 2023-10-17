const router = require("express").Router();

const {
    createFolder, getFolders, deleteFolder
} = require('../controllers/folderController');


router.post('/create', createFolder);
router.get('/all', getFolders);
router.delete('/:id', deleteFolder);


module.exports = router;