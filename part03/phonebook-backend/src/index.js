const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const PersonModel = require('./models/person');

const app = express();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', (req, res) => {
    PersonModel
        .find({})
        .then((persons) => {
            res.json(persons);
        });
});

app.get('/api/persons/:id', (req, res) => {
    PersonModel
        .findById(req.params.id)
        .then((person) => res.json(person));
});

app.delete('/api/persons/:id', (req, res) => {
    PersonModel
        .findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).end();
        });
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name) {
        res.status(400).json({ error: 'missing name' });
    }
    else if (!body.number) {
        res.status(400).json({ error: 'missing number' });
    }
    // else if (persons.some((p) => p.name === body.name)) {
    //     res.status(400).json({ error: 'name must be unique' });
    // }
    else {
        const person = new PersonModel({
            name: body.name,
            number: body.number
        });
        person.save().then((p) => res.json(p));
    }
});

app.get('/info', (req, res) => {
    PersonModel
        .find({})
        .then((persons) => {
            res.send(`<p>Phonebook has info for ${persons.length} ${persons.length > 1 ? 'people' : 'person'}</p>
                      <p>${new Date()}</p>`);
        });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
