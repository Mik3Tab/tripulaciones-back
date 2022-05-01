const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor, introduce un nombre"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Email incorrecto"],
      required: [true, "Por favor, introduce un email"],
    },
    password: String,
    role: String,
    confirmed: Boolean,
    company: { type: ObjectId, ref: "Company" },
    token: [],
    postIds: [{ type: ObjectId, ref: "Post" }],
    imageUser: String,
    favorites: [{ type: ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

// UserSchema.methods.toJSON = function () {
// //   const user = this._doc;
// //   delete user.token;
// //   delete user.password;
// //   delete user.createdAt;
// //   delete user.updatedAt;
// //   delete user.__v;

//   return user;
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;