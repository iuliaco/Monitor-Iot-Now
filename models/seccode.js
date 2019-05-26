var mongoose = require('mongoose');


const SeccodeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    security_code: {
        type: String,
    },
    Date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Seccode', SeccodeSchema);
