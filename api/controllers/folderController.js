const Folder = require("../models/FolderStructure");
const mongoose = require("mongoose");

const createFolder = async (req, res, next) => {
    const {
        parentId, foldername
    } = req.body;

    const addFolderById = async (folderArr, targetId, newFolder) => {
        try {
            const targetFolder = folderArr.find(folder => folder._id.toString() === targetId);
            if (targetFolder) {
                await Folder.findByIdAndUpdate(
                    targetId,
                    { $push: { subfname: newFolder } },
                    { new: true }
                )
                return true;
            }

            await Folder.updateOne(
                { 'subfname._id': targetId },
                { $push: { 'subfname.$.subfname': newFolder } },
                { new: true }
            );
            return true;

        } catch (err) {
            next(err);
        }

        return false;
    }

    try {
        if (parentId === 'root') {
            const folder = new Folder({
                fname: foldername
            });

            const newFolder = await folder.save();

            return res.status(201).send({
                success: true,
                message: 'New folder created successfully',
                folder: newFolder
            });
        }

        const folderArr = await Folder.find({});
        // console.log(folderArr);

        const newObjectId = new mongoose.Types.ObjectId();
        const newFolder = {
            _id: newObjectId,
            fname: foldername,
            subfname: []
        }

        await addFolderById(folderArr, parentId, newFolder);

        return res.status(200).send({
            success: true,
            message: 'New folder added successfully',
            folder: newFolder
        });
    } catch (err) {
        next(err);
    }
};

const getFolders = async (req, res, next) => {
    try {
        const folders = await Folder.find({});

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

    const deleteFolderById = async (folderArr, targetId) => {
        try {
            const targetFolder = folderArr.find(folder => folder._id.toString() === targetId);
            if (targetFolder) {
                await Folder.findByIdAndDelete(
                    targetId,
                    { new: true }
                )
                return true;
            }

            await Folder.deleteOne(
                { 'subfname._id': targetId },
                { new: true }
            );
            return true;

        } catch (err) {
            next(err);
        }

        return false;
    }

    try {
        const folderArr = await Folder.find({});

        await deleteFolderById(folderArr, id);

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