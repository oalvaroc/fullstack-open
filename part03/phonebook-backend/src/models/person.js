require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // supress warning

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to MongoDB'))
    .catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);