const mongoose = require("mongoose");


const FolderSchema = mongoose.Schema(
  {
    foldername: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", FolderSchema);


// subfolders: [
//   {
//     fname: { type: String, required: true },
//     sfolders: {type: Array, default: []}
//   }
// ]