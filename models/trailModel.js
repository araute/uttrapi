/**
 * Created by Akshat on 9/25/2017.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var trailModel = new Schema({
    name: {type: String},
    description: {type: String},
    photos: {type:Array, default:[]},
    tags: {type: Array, default: []},
    difficulty: {type: String, enum: ['Easy', 'Moderate', 'Difficult'], default: 'Easy'},
    distance: {type: Number}
});


module.exports = mongoose.model('Trail', trailModel);

