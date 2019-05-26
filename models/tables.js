var mongoose = require('mongoose');


const GraphSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
        type: String,
	required: true,
    },
    value1_name: {
        type: String,
    },
    value2_name: {
        type: String,
    },
    value1: {type: Array, default: []},
    value2: {type: Array, default: []},
    Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tables', GraphSchema);
