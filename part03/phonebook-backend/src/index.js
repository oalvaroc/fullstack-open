const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

function generateId() {
    return Math.floor(Math.random() * 1000000);
}

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find((p) => p.id === Number(req.params.id));
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter((p) => p.id !== Number(req.params.id));
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name) {
        res.status(400).json({ error: 'missing name' });
    }
    else if (!body.number) {
        res.status(400).json({ error: 'missing number' });
    }
    else if (persons.some((p) => p.name === body.name)) {
        res.status(400).json({ error: 'name must be unique' });
    }
    else {
        const person = {
            id: generateId(),
            name: body.name,
            number: body.number
        };
        persons = persons.concat(person);
        res.json(person);
    }
});

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} ${persons.length > 1 ? 'people' : 'person'}</p>
              <p>${new Date()}</p>`);
});

app.listen(3001);
