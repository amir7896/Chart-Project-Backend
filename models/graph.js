const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const graphSchema = new Schema({
    name: String,
    data:  [Number],
    label: [String],
    graphlabels:[String]
});
module.exports  = mongoose.model('Graph', graphSchema);