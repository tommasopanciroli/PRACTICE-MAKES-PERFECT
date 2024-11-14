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
