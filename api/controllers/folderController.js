const Folder = require("../models/Folder");

const createFolder = async (req, res, next) => {
    console.log(req.body);

    const {
        parentId, foldername
    } = req.body;

    try {
        // if (parentId === 'root') {
        //     const folder = new Folder({
        //         foldername
        //     });
        //     await folder.save();

        //     return res.status(201).send({
        //         success: true,
        //         message: 'New folder created successfully'
        //     });
        // }

        const folder = new Folder({
            foldername
        });
        await folder.save();


        // const folder = new Folder();
        // const newFolder = await folder.save();

        return res.status(201).send({
            success: true,
            message: 'New folder created successfully'
        });
    } catch (err) {
        next(err);
    }
};

const getFolders = async (req, res, next) => {
    try {
        const folders = await Folder.find();

        res.status(200).send({
            success: true,
            folders
        });
    } catch (err) {
        next(err);
    }
};

const deleteFolder = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Folder.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: 'Folder deleted successfully'
        });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    createFolder,
    getFolders,
    deleteFolder
}