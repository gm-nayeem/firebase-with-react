const mongoose = require("mongoose");


const FolderStructureSchema = mongoose.Schema(
  {
    fname: { type: String, required: true, unique: true },
    subfname: { type: Array, default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FolderStructure", FolderStructureSchema);


// subfolders: [
//   {
//     fname: { type: String, required: true },
//     sfolders: { type: Array, default: [] }
//   }
// ]