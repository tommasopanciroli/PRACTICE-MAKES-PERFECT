// OGGETTI E CLASSI

const Cat = function (_name, _age, _furColor) {
  this.name = _name
  this.age = _age
  this.furColor = _furColor
}

const gatto = new Cat('Silvestro', '50', 'black/white')
console.log(gatto)

gatto.cartoon = 'Looney Tunes'

console.log(gatto)

class CatClass {
  constructor(_name, _age, _furColor) {
    this.name = _name
    this.age = _age
    this.furColor = _furColor
  }
  paws = 4
}

const lastCat = new CatClass('Teo', 5, 'white')

class Stadium {
  // capienza
  // settori
  // posizione
  // sport
  constructor(_position, _sport, _sectors, _capacity) {
    this.position = _position
    this.sport = _sport
    this.sectors = _sectors
    this.capacity = _capacity
  }
}

const SanSiro = new Stadium('Milano', 'Calcio', 4, 80000)
console.log(SanSiro)

class User {
  constructor(_firstName, _lastName, _age, _location) {
    this.firstName = _firstName
    this.lastName = _lastName
    this.age = _age
    this.location = _location
  }
  compareAge(otherUser) {
    if (this.age === otherUser.age) {
      return `${this.firstName} e ${otherUser.firstName} hanno la stessa età`
    } else {
      return `${this.firstName} e ${otherUser.firstName} hanno la età diverse`
    }
  }
}

const user1 = new User('Tommaso', 'Panciroli', '21', 'Reggio Emilia')
const user2 = new User('Francois', 'Lampasona', '24', 'Trapani')
const user3 = new User('Valentina', 'Gargiulo', '24', 'Roma')

console.log(user1)
console.log(user2)
console.log(user1.compareAge(user2))
console.log(user2.compareAge(user3))

// ES 2

class Pet {
  constructor(_petName, _ownerName, _species, _breed) {
    this.petName = _petName
    this.ownerName = _ownerName
    this.species = _species
    this.breed = _breed
  }
  compareOwner(otherPet) {
    if (this.ownerName === otherPet.ownerName) {
      return `${this.petName} e ${otherPet.petName} hanno lo stesso padrone`
    } else {
      return `${this.petName} e ${otherPet.petName} hanno padroni diversi`
    }
  }
}

const pet1 = new Pet('Biscotto', 'Tommaso', 'Gatto', 'Soriano')
const pet2 = new Pet('Frida', 'Alessia', 'Gatto', 'Soriano')
const pet3 = new Pet('Matì', 'Tommaso', 'Gatto', 'Soriano')
console.log(pet1.compareOwner(pet2))
console.log(pet1.compareOwner(pet3))

//LOCAL STORAGE E SESSION STORAGE
// setItem(key, value) salva una dato
// getITem(key) recuperare
// removeItem(key) eliminare un dato
// clear() azzera i dati

localStorage.setItem('myName', 'Stefano')
localStorage.getItem('myName')
localStorage.removeItem('myName')
localStorage.clear()

localStorage.setItem('newItem', JSON.stringify({ Epicode: true }))
console.log(JSON.parse(localStorage.getItem('newItem')))

const nameInput = document.getElementById('inputText')
const saveBtn = document.getElementById('save')
const removeBtn = document.getElementById('delete')
const savedNameDisplay = document.getElementById('savedNameDisplay')

function displaySavedName() {
  const savedName = localStorage.getItem('userName')
  if (savedName) {
    savedNameDisplay.textContent = `Nome salvato: ${savedName}`
  } else {
    savedNameDisplay.textContent = 'Nessun nome salvato'
  }
}

saveBtn.addEventListener('click', function () {
  const name = nameInput.value.trim()
  if (name) {
    localStorage.setItem('NOME INSERITO CON SUCCESSO', name)
    displaySavedName()
  } else {
    alert('ERRORE')
  }
})

// FETCH
// GET POST PUT DELETE
// READ CREATE UPDATE DELETE
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    console.log('response', response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nella call')
    }
  })
  .then((users) => {
    console.log('users', users)
    const ul = document.getElementById('users-list')
    users.forEach((u) => {
      const newLi = document.createElement('li')
      newLi.innerText = u.name + ' | ' + u.email + ' | ' + u.company.name
      ul.appendChild(newLi)
    })
  })
  .catch((error) => {
    console.log('error', error)
  })
