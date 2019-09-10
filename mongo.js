const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-rdje6.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3){
  Person
    .find({})
    .then(persons => {
      console.log('phonbook:')
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}else if(process.argv.length >= 5){
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    date: new Date(),
  })
  
  person
    .save()
    .then(response => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}else{
  mongoose.connection.close()
}



