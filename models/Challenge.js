const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ChallengeSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageChallenge: {
        type: String
    },
    postsId: [{ type: ObjectId, ref: "Post" }],
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;