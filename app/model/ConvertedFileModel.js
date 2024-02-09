const mongoose = require('mongoose');

const convertedFileSchema = new mongoose.Schema({
    originalFileName: String,
    convertedFilePath: String,
    conversionDate: {
        type: Date,
        default: Date.now,
    },
});

const ConvertedFileModel = mongoose.model('ConvertedFile', convertedFileSchema);

module.exports = ConvertedFileModel;