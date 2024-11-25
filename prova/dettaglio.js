const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NWFhYjc5YzQ1ZjAwMTU2OWI0YjYiLCJpYXQiOjE3Mjc0MjEwOTksImV4cCI6MTcyODYzMDY5OX0.mEdvI9JTziNEoKoJdqSizba4DCziPw1XWMVfNM0bpQI'

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

const productId = new URLSearchParams(window.location.search).get('id')

fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
  method: 'GET',
  headers: headers,
})
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('product-detail').innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.description}</p>
    <p><strong>Marca:</strong> ${data.brand}</p>
    <p><strong>Prezzo:</strong> ${data.price}€</p>
    <img src="${data.imageUrl}" alt="${data.name}" height="90%" width="90%">
  `
  })
  .catch((error) => alert('Errore, impossibile caricare il prodotto'))
