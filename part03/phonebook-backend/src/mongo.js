const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // supress deprecation warning

function die() {
    console.log('USAGE: node mongo.js <password> [<name> <number>]');
    process.exit(1);
}

if (process.argv.length >= 3) {
    const password = process.argv[2];
    const name = process.argv[3];
    const number = process.argv[4];

    if (!password) {
        die();
    }

    const MONGO_URL = `mongodb+srv://oalvaroc:${password}@fullstackopen.byjs86g.mongodb.net/phonebook?retryWrites=true&w=majority`;

    const Person = mongoose.model('Person', {
        name: String,
        number: String
    });

    const addPerson = () => {
        mongoose.connect(MONGO_URL)
            .then(() => {
                const person = new Person({ name, number });
                return person.save();
            })
            .then(() => {
                console.log(`Added ${name} number ${number} to phonebook`)
                mongoose.connection.close();
            })
            .catch((err) => console.log(err));
    };

    const listPersons = () => {
        mongoose.connect(MONGO_URL)
            .then(() => {
                Person.find({})
                    .then((res) => {
                        console.log('phonebook:');
                        res.forEach((p) => console.log(`${p.name} ${p.number}`));
                        mongoose.connection.close();
                    })
                    .catch((err) => console.log(err));
            });
    };

    if (name && number) {
        addPerson();
    }
    else if (!name && !number) {
        listPersons();
    }
    else {
        die();
    }
}
else {
    die();
}
