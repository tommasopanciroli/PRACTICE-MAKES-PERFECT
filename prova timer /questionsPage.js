// ***********************************************************************
//
// FUNCTIONS DEFINITIONS
//
// ***********************************************************************
//

// Creo questa funzione perché scrivere tutte le volte 'console.log()' è una palla!
// uso la lettera 'w', che sta anche per 'write', perché è poco usata negli esercizi
const w = (param, param1) => {
  param1 ? console.log(`${param}`, param1) : console.log(param)
}

// Funzione che ripulisce l'innerHTML da eventuali caratteri speciali che possono far casino
function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Funzione che selezione casualmente un numero di domande dall'array di domande
const selectQuestions = (
  questionsArray,
  numberOfQuestions,
  topic,
  difficulty
) => {
  // Inizializza l'array delle domande che verranno ritornate
  const questionsSelected = []

  // Crea un array di domande che hanno l'argomento e il livello di difficoltà richiesti
  const preSelectionArray = questionsArray.filter(
    (question) => question.topic === topic && question.difficulty === difficulty
  )

  // Esegue un'estrazione randomica delle domande dall'array preSelectionArray
  // estrae un numero di domanda pera a quelle richieste o, se inferiore, pari al numero delle domande
  // nell'array delle domande preselzezionate
  for (
    let i = 0;
    i < Math.min(numberOfQuestions, preSelectionArray.length);
    i++
  ) {
    // Ricalcola la lunghezza dell'array perché ad ogni cliclo viene eliminato un elemento
    // per evitare che venga riselezionato casualmente
    const randomIndex = Math.floor(Math.random() * preSelectionArray.length)
    // Aggiunge la domanda selezionata all'array delle domande selezionate
    questionsSelected.push(preSelectionArray[randomIndex])
    // Elimina la domanda selezionata dall'array delle domande preselezionate
    preSelectionArray.splice(randomIndex, 1)
  }
  w(questionsSelected)
  return questionsSelected
}
// selectQuestions(questionsWithImage, 5)

// Funzione che mostra la domanda corrente popolando i DV della pagina
const showQuestion = (selectedQuestionsArray, questionNumber) => {
  const question = selectedQuestionsArray[questionNumber]
  w('showQuestion() currentQuestion is:', question)

  // leva eventuali caratteri speciali dal testo della risposta per evitare problemi nell'html della label
  const questionTextEscaped = escapeHTML(question.questionText)
  // Aggiunge lo <span> per evidenziare la parte più importante della domanda
  const questionTexEscapedAndSpanned = questionTextEscaped.replace(
    /\*\*(.*?)\*\*/g,
    '<span>$1</span>'
  )
  // w('questionTexEscapedAndSpanned: ', questionTexEscapedAndSpanned)

  const h1QuestionTitle = document.getElementsByTagName('h1')[0]
  h1QuestionTitle.innerHTML = questionTexEscapedAndSpanned

  // Se la domanda ha un'immagine la mostra dopo avere comunque svuotato il contenitore
  const questionImage = document.getElementById('questionImage')
  questionImage.innerHTML = ''
  if (question.imageUrl !== '') {
    currentImage = document.createElement('img')
    currentImage.src = question.imageUrl
    currentImage.alt = `Immagine domanda: ${question.questionText}`
    questionImage.appendChild(currentImage)
  }

  // popola le domande testuali verificando se la risposta ha una o più risposte corrette
  // selezionando quindi un radio o un checkbox
  const textualAnswer = document.getElementById('textualAnswer')

  // Verifica se la domanda ha una o più risposte corrette e setta il tipo di elemento da usare
  const correctAnswers = question.answers.filter((answer) => answer.isCorrect)
  const inputType = correctAnswers.length > 1 ? 'checkbox' : 'radio'

  // crea i vari elementi per ciascuna domanda facendo un loop sul ramo 'answer' della domanda corrente
  let answerHTML = ''
  question.answers.forEach((answer, index) => {
    // leva eventuali caratteri speciali dal testo della risposta per evitare problemi nell'html della label
    const escapedLabel = escapeHTML(answer.text)
    answerHTML += `
    <!-- aperto divAnswer-${questionNumber}-${index} -->
    <div class="questionAnswers" id="divAnswer-${questionNumber}-${index}">
        <input type="${inputType}" id="inputAnswer-${questionNumber}-${index}" name="answer-${questionNumber}" value="1"
         />
        <label for="inputAnswer-${questionNumber}-${index}">${escapedLabel}</label>
    </div>
    <!-- chiuso divAnswer-${questionNumber}-${index} -->`
  })

  // Inserisce il codice HTML delle risposte nel div 'textualAnswer'
  textualAnswer.innerHTML = answerHTML

  sectionLastSection.innerHTML = `DOMANDA ${
    questionNumber + 1
  } <span class="fucsiaColor">/ ${numberOfQuestions}</span>`

  //
}

//
// Legge le risposte dell'utente eseguento un loop sugli input presenti nella pagina
// e restituendo un array di array con le risposte date dall'utente
// Prende come parametro l'array delle domande selezionate e l'indice che indica a che domanda si trova ora il test.
// passare questi parametri non sarebbe strattamente necessario perché si potrebbero leggere direttamente
// ma preferisco passarli per avere una funzione più generica e una funzione che accetta gli stessi parametri
// di showQuestion()
const readUserAnswers = (questionsArray, currentQuestionIndex) => {
  w('readUserAnswers() currentQuestionIndex:', currentQuestionIndex)

  const question = questionsArray[currentQuestionIndex]
  // w('question', question)

  // Inizializza l'array delle risposte date dall'utente
  const givenAnswerArray = []

  // Estrae dall'array delle domande le risposte alla domanda corrente date dall'utente
  const answers = question.answers

  // Esegue un loop sugli input delle risposte per vedere quali sono state selezionate
  answers.forEach((answer, index) => {
    const currentAnswer = document.getElementById(
      `inputAnswer-${currentQuestionIndex}-${index}`
    )
    // Se l'input è selezionato lo aggiunge all'array delle risposte date dall'utente
    // esempio: data risposta 1 e 2, l'array sarà [0: true, 1: true]
    if (currentAnswer.checked) {
      w(`inputAnswer-${currentQuestionIndex}-${index}`, currentAnswer.checked)
      selectedQuestionsArray[currentQuestionIndex].userAnswers[index] = true

      // Popola l'array delle risposte date dall'utente
      // che verrà confrontato che verrà confrontato con l'array delle risposte corrette
      givenAnswerArray.push(index)
      w('readUserAnswers() givenAnswerArray: ', givenAnswerArray)
    } else {
      // comunque popolo la posizione dell'array corrispondente alla risposta non data
      // servirà nella schermata dei risultati per costruire la tabella delle risposte
      selectedQuestionsArray[currentQuestionIndex].userAnswers[index] = false
    }
  })
  w('readUserAnswers() selectedQuestionsArray', selectedQuestionsArray)

  // Crea l'array delle risposte corrette (indici delle risposte corrette) che verrà confrontato
  // con l'array degli indici delle risposte date
  let correctAnswerArray = []
  question.answers.forEach((answer, index) => {
    if (answer.isCorrect === true) {
      correctAnswerArray.push(index)
    }
  })
  w('eadUserAnswers() correctAnswerArray: ', correctAnswerArray)

  // Confronta l'array delle risposte date dall'utente con l'array delle risposte corrette
  // e assegna uno score alla domanda.
  // per il confronto dell'array uso JSON.stringify() per poter confrontare delle stringhe senza fare un loop
  // su tutti i valori di un attay perché non ho trovato un metodo di confronto diretto
  if (JSON.stringify(correctAnswerArray) === JSON.stringify(givenAnswerArray)) {
    w('Risposta corretta')
    selectedQuestionsArray[currentQuestionIndex].questionScore = 1
  } else {
    w('Risposta sbagliata')
    selectedQuestionsArray[currentQuestionIndex].questionScore = 0
  }

  // Visualizza l'arrray delle domande e delle risposte date dall'utente con relativo score
  w('readUserAnswers() selectedQuestionsArray: ', selectedQuestionsArray)

  w('readUserAnswers() givenAnswerArray: ', givenAnswerArray)
  return givenAnswerArray
}

// ***********************************************************************
//
// Funzione associata alla proessione del bottone per passare alla domanda successiva
// che verifica se l'utente ha selezionato almeno una risposta.
// Se non ha selezionato nessuna risposta visualizza un messaggio di errore a meno che
// il parametro checkAnswerBeforeGoAhead sia impostato su false e in tal caso non fa
// il controllo e passa alla domanda successiva.
//
// Questo servirà quando la funzione verrà chiamata allo scadere del timer
//
// ***********************************************************************
const buttonListener = (checkAnswerBeforeGoAhead) => {
  w('buttonListener() checkAnswerBeforeGoAhead:', checkAnswerBeforeGoAhead)

  w('buttonListener() currentQuestionIndex: ', currentQuestionIndex)
  // La prima domanda viene generata fuori dal ciclo e quindi legge
  const userAnswers = readUserAnswers(
    selectedQuestionsArray,
    currentQuestionIndex
  )
  w('userAnswers: ', userAnswers)

  if (userAnswers.length === 0 && checkAnswerBeforeGoAhead === true) {
    divMessage.innerHTML = "Seleziona almeno un'opzione"
    return
  } else {
    divMessage.innerHTML = ''
  }

  // Verifica se la domanda corrente è l'ultima in base alle domande richieste o in base alla grandezza dell'array
  // delle domande selezionate dal pool
  if (
    currentQuestionIndex === selectedQuestionsArray.lenght - 1 ||
    currentQuestionIndex === numberOfQuestions - 1
  ) {
    // se è l'ultima domanda salva le risposte date dall'utente
    // e reindirizza alla pagina dei risultati
    w('ultima domanda')
    // Inizializza il localStorage che conterrà le domande e le risposte date dall'utente
    localStorage.setItem('questionsAndAnswers', '')
    // localStorage.setItem("questionsAdnAnswers", JSON.stringify(questionsAdnAnswers));
    // questionsAndAnswers = JSON.parse(localStorage.getItem("questionsAndAnswers"));

    localStorage.setItem(
      'questionsAndAnswers',
      JSON.stringify(selectedQuestionsArray)
    )
    window.location.href = 'resultsPage.html'
  } else {
    // se non è l'ultima domanda mostra la domanda successiva
    currentQuestionIndex++
    w(`questionIndex ${currentQuestionIndex} / ${numberOfQuestions - 1}`)
    showQuestion(selectedQuestionsArray, currentQuestionIndex)
  }
}

// Funzione per controllare lo stato dei checkbox o radio
const checkActivation = () => {
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"], input[type="radio"]'
  )
  const button = document.getElementById('nextQuestionButton')

  w('checkActivation() checkboxes: ', checkboxes)

  // Controlla se almeno un checkbox o radio è selezionato
  const isAnyChecked = Array.from(checkboxes).some(
    (checkbox) => checkbox.checked
  )

  if (isAnyChecked) {
    button.classList.add('activatedButton') // Aggiunge la classe se almeno uno è selezionato
  } else {
    button.classList.remove('activatedButton') // Rimuove la classe se nessuno è selezionato
  }
}

//
// ***********************************************************************
//
// VARIABLE DEFINITIONS
//
// ***********************************************************************
//

// Indica il numero delle domande del survey
const numberOfQuestions = 5

// currentQuestionIndex è l'indice della domanda corrente
let currentQuestionIndex = 0

// topic è l'argomento delle domande deve essere espresso come stringa ed
// essere ASSOLUTAMENTE identico al 'topic' riportato nel file 'questions.js'
// const topic = 'HTML, CSS, JS'
const topic = 'Cucina'

// difficulty è il livello di difficoltà delle domande
// deve essere espresso con un intero tra 1 e 3
const difficulty = 1

// questionsArray è l'array di domande selezionate
const selectedQuestionsArray = selectQuestions(
  questionsWithImage,
  numberOfQuestions,
  topic,
  difficulty
)

// Setta il parametro per il controllo delle risposte prima di passare alla domanda successiva
const checkAnswerBeforeGoAhead = true

// definisce la variabile checonterrà tutti i checkbox e i radio e su cui verrà collegato un event listener
// sul cambio di stato per illuminare il bottone
let checkboxes

//
// ***********************************************************************
// Definizione degli elementi della pagina rilevanti
// ***********************************************************************
//

// definisce il div che contiene il testo delle domande
sectionTitle = document.getElementById('title')
sectionContent = document.getElementById('content')
sectionButton = document.getElementById('button')
sectionLastSection = document.getElementById('lastSection')

// assegna il div per poter inviare eventuali messaggi all'utente
divMessage = document.getElementById('divMessage')

// definisce il bottone
nextQuestionButton = document.getElementById('nextQuestionButton')

//

//
// ***********************************************************************
//
// MAIN ROUTINE
//
// ***********************************************************************
//

//
// Mostra la prima domanda prima di attivare il bottone
window.onload = () => {
  showQuestion(selectedQuestionsArray, currentQuestionIndex)

  // definisce i checkBox e i radio per verificare l'evento di attivazione del bottone
  checkboxes = document.querySelectorAll(
    'input[type="checkbox"], input[type="radio"]'
  )

  // Aggiunge l'evento 'change' a tutti i checkbox e radio per illuminare il bottone
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', checkActivation) // Ogni volta che cambia, controlla lo stato
  })
}

//
// Aggiunge un event listener al bottone per passare alla domanda successiva
// il parametro della funzione checkAnswerBeforeGoAhead() verifica se è impostato il controllo delle risposte
// prima di passare alla domanda successiva. se è impoststo su false non fa il controllo.
// Questo servirà quando la funzione verrà chiamata allo scadere del timer
nextQuestionButton.addEventListener('click', () => {
  buttonListener(checkAnswerBeforeGoAhead)

  // Ricerca tutti i checkbox e i radio per controllare se almeno uno è selezionato
  checkboxes = document.querySelectorAll(
    'input[type="checkbox"], input[type="radio"]'
  )

  // controlla se il bottone è attivo e lo spegne nel caso sia una nuova domanda
  checkActivation()

  // Aggiunge l'evento 'change' a tutti i checkbox e radio per illuminare il bottone
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', checkActivation) // Ogni volta che cambia, controlla lo stato
  })
})
