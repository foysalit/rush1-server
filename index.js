var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var Status = require('./models/status');

mongoose.connect('mongodb://rushdi:123admin!@ds135574.mlab.com:35574/rush1');

app.use(bodyParser.json());
app.use(cors());

function handleResponse (res, err, data) {
	if (err) {
		return errorResponse(err.message, res);
	}

	return successResponse(data, res);
};

function errorResponse (message, res) {
	return res.json({error: true, success: false, message: message});
};

function successResponse (data, res) {
	return res.json({error: false, success: true, data: data});
};

app.get('/statuses', function (req, res) {
	// retrieve statuses from database
	Status.find({}).sort({created_at: -1}).exec(handleResponse.bind(null, res));
});

app.post('/statuses', function (req, res) {
	// retrieve  status from post body and insert in the database
	var statusData = req.body.status;
	var statusEntry = new Status(statusData);

	statusEntry.save(handleResponse.bind(null, res));
});


app.put('/statuses/:_id', function (req, res) {
	// retrieve status from database and update from put body and update the database entry
	Status.update({
		_id: req.params._id
	}, {
		$inc: req.body.status
	}).exec(handleResponse.bind(null, res));
});

app.listen(4100, function () {
	console.log('Example app listening on port 4100!');
})