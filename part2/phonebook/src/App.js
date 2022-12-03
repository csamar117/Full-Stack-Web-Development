import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addOrUpdatePerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === personObject.name)) {
      if(window.confirm(
        `${newName} is already added to phonebook, ` +
        `replace the old number with a new one?`
      )) {
        updatePerson(personObject)
      } else {
        return null
      }
    } else {
      addPerson(personObject)
    }
  }

  const updatePerson = (personObject) => {
    personService
      .update(persons.findIndex(person => 
        person.name === personObject.name) + 1, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => 
          person.id !== returnedPerson.id ? person : returnedPerson))
      })
      .then(() => {
        setSuccessMessage(`Changed ${personObject.name}'s number`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${personObject.name} has already ` +
        `been removed from server`)
        setPersons(persons.filter(p => p.name !== personObject.name))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      })
  }

  const addPerson = (personObject) => {
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
      .then(() => {
        setSuccessMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterString(event.target.value)
  }

  const personsToShow = filterString ? persons.filter(person => 
    person.name.toLowerCase().match(filterString.toLowerCase())
  ) : persons

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.erase(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <Filter filterString={filterString} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm addOrUpdatePerson={addOrUpdatePerson} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
        newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
