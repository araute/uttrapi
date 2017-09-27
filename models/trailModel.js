var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var assetModel = new Schema({
    name: {type: String},
    description: {type: String},
    photos: {data:Buffer, type:String },
    tags: {type: Array, default: []},
    difficulty: {type: String, enum: ['Easy', 'Moderate', 'Difficult'], default: 'Easy'},
    elevation: {type:Number},
    distance: {type: Number}
});


module.exports = mongoose.model('Asset', assetModel);

