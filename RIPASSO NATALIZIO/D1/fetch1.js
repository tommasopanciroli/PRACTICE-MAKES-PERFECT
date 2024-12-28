fetch('https://striveschool-api.herokuapp.com/books')
  .then((response) => {
    console.log('response', response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nella chiamata dei libri')
    }
  })
  .then((books) => {
    console.log('Books', books)
    const cardBook = document.getElementById('card-book')
    books.forEach((b) => {
      const newBook = document.createElement('div')
      newBook.innerHTML = `<div class="card mb-3 mx-2" style="width: 18rem;">
       <img src=${b.img} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${b.title}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-danger remove-btn">Remove</a>
        </div>
     </div>`
      cardBook.appendChild(newBook)

      const removeButton = newBook.querySelector('.remove-btn')
      removeButton.onclick = () => {
        newBook.remove()
      }
    })
    //     .innerHTML = `<div class="card" style="width: 18rem;">
    //   <img src=${books.img} class="card-img-top" alt="...">
    //   <div class="card-body">
    //     <h5 class="card-title">${books.title}</h5>
    //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     <a href="#" class="btn btn-primary">Go somewhere</a>
    //   </div>
    // </div>
    //     `
  })
  .catch((error) => {
    console.log('error', error)
  })
