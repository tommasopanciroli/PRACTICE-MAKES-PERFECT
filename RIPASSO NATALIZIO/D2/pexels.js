const API_KEY = 'iW11971AkHi4hkdV8Lp28OPObpWtyzNTQUjiBryuRtI4qyDWO4uvCvId'
const loadImagesButton = document.getElementById('loadButton')
const container = document.querySelector('.album .card')

loadImagesButton.addEventListener('click', () => {
  fetch('https://api.pexels.com/v1/search?query=cats', {
    headers: { Authorization: API_KEY },
  })
    .then((response) => {
      console.log('response', response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella chiamata')
      }
    })
    .then((data) => {
      console.log('data', data)
      cards.forEach((card, index) => {
        if (index < data.photos.length) {
          const photo = data.photos[index] // Foto corrispondente dall'API
          const imgElement = card.querySelector('img') // Immagine nella card

          // Aggiorna l'immagine con quella dell'API
          imgElement.src = photo.src.medium
          imgElement.alt = photo.alt || 'Image' // Testo alternativo
        }
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
})
