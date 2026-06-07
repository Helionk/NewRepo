//npx json-server --port 3001 db.json
import { useState, useEffect } from 'react'
import personList from './person'

const App = () => {
  const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
      console.log('button clicked', event.target)
      const exists = persons.some(
          person => person.name === newName
      )

      if (exists) {
          alert(`${newName} is already added to phonebook`)
          return
      }

      const contacts = {
          name: newName,
          number: newNumber,
      }

      personList
          .create(contacts)
          .then(response => {
              setPersons(persons.concat(response.data))
              setNewName('')
              setNewNumber('')
          })
      
      
      //setPersons(persons.concat(contacts))
      //setNewName('')
      //setNewNumber('')
  }

    const deletePerson = (id) => {
        if (window.confirm('Delete this contact?')) {
            personList
                .deletePerson(id)
                .then(() => {
                    setPersons(
                        persons.filter(person => person.id !== id)
                    )
                })
        }
    }

useEffect(() => {
    console.log('effect')
    personList
        .getAll()
        .then(response => {
            setPersons(response.data)
        })
  }, [])
  console.log('render', persons.length, 'persons')


  const handlePersonsChange = (event) => {
      setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
  }
  


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
                  name: <input value={newName} onChange={handlePersonsChange} />
        </div>
              <div>number: <input value={newNumber} onChange={handleNumberChange} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
          <h2>Numbers</h2>
              name: {persons.map(person => (
                  <div key={person.id}>
                      {person.name} {person.number}

                      <button onClick={() => deletePerson(person.id)}>
                          delete
                      </button>
                  </div>
              ))}
    </div>
  )
}

export default App