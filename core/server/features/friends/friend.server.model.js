var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FriendSchema = new Schema({
    name: {
        type: String
    }
});

module.exports = mongoose.model('Friend', FriendSchema);