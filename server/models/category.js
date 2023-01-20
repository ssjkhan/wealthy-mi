const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  // expenses: { type: [Schema.Types.ObjectId] },
  user: { type: Schema.Types.ObjectId },
});

// format category name: "caTegory" => "Category"
// CategorySchema.pre("save", function (next) {
//   this.name =
//     this.name.trim()[0].toUpperCase() + this.name.slice(1).toLowerCase();
//   next();
// });

module.exports = mongoose.model("Category", CategorySchema);
