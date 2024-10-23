let currentQuestionIndex = 0
let timeLeft
let clock
const totalDuration = 10 // Durata del timer per ogni domanda

// Funzione per avviare il timer
function startTimer(duration) {
  timeLeft = duration
  document.getElementById('time-left').innerHTML = timeLeft

  clock = setInterval(function () {
    if (timeLeft > 0) {
      timeLeft--
      document.getElementById('time-left').innerHTML = timeLeft
    } else {
      clearInterval(clock)
      nextQuestion() // Vai automaticamente alla prossima domanda
    }
  }, 1000) // 1000 millisecondi = 1 secondo
}

// Funzione per resettare e passare alla prossima domanda
function nextQuestion() {
  clearInterval(clock) // Ferma il timer attuale
  currentQuestionIndex++ // Incrementa l'indice della domanda
  document.getElementById('question').innerHTML = `Domanda ${
    currentQuestionIndex + 1
  }` // Mostra la nuova domanda

  startTimer(totalDuration) // Resetta il timer per la nuova domanda
}

// Inizializzazione del quiz
function startQuiz() {
  currentQuestionIndex = 0 // Resetta l'indice delle domande
  document.getElementById('question').innerHTML = `Domanda 1` // Prima domanda
  startTimer(totalDuration) // Avvia il timer
}

// Avvia il quiz quando la pagina è pronta
window.onload = function () {
  startQuiz() // Avvia il quiz all'apertura della pagina
}

startTimer(45)
nextQuestion()
startQuiz()
window.onload()
