const mongoose = require('mongoose')

if (process.argv.length != 3 && process.argv.length != 5) {
    console.log(
`To add a new entry to the database: node mongo.js <password> <name> <number>
To display all of the entries from the database: node mongo.js <password>`)
    process.exit(-1)
}

const passwd = process.argv[2]
const url = `mongodb+srv://mayloshh:${passwd}@cluster.dpime.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.connect(url)


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
}
else {
    const newName = process.argv[3]
    const newNumber = process.argv[4]
    const person = new Person({
        name: newName,
        number: newNumber
    })
    
    person.save().then(result => {
        console.log(`Added ${result.name}, number ${result.number} to phonebook`)
        mongoose.connection.close()
    })    
}
