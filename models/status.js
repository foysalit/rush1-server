var mongoose = require('mongoose');

module.exports = mongoose.model('Status', { 
	content: String,
	username: String,
	likes_count: {type: Number, default: 0},
	created_at: { type: Date, default: new Date() } 
});