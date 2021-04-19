//question arrays
var answers = []
var score = 10
var test_over = false;

var question_one = {
    question : "What is the correct syntax for linking Javascript?",
    answers : [ {text: '<script href="..."', correct: false}, 
                {text: '<script src="..."', correct: true}, 
                {text: '<link rel="javascript" href="...">', correct: false}, 
                {text: '<a="..."', correct: false}
                ],
}

var question_two = {
    question : "Which method creates a prompt?",
    answers : [ {text: 'alert()', correct: false},
                {text: 'createPrompt()', correct: false},
                {text: 'popUp()', correct: false},
                {text: 'prompt()', correct: true}
                ],
   
}

var question_three = {
    question : "What is the proper syntax for declaring a globally scoped variable?",
    answers : [ {text: 'var x', correct: true},
                {text: 'var int x', correct: false},
                {text: 'let x', correct: false},
                {text: 'const x', correct: false}
                ],
}

var question_four = {
    question : "How do you declare a function in Javascript?",
    answers : [ {text: 'private thisFunction()', correct: false},
                {text: 'function = thisFunction()', correct: false},
                {text: 'def thisFunction()', correct: false},
                {text: 'function thisFunction()', correct: true}
                ],
}

var question_five = {
    question : "Which variable has a block scope?",
    answers : [ {text: 'var x', correct: false},
                {text: 'let x', correct: true},
                {text: 'const x', correct: false},
                {text: 'int x', correct: false}
                ],
}

var questions = [question_one, question_two, question_three, question_four, question_five]
var q_num = 0




//setting html elements
var title = document.getElementById("quiz-question")
var instructions = document.getElementById("prompt-title")
var scorePage = document.getElementById('score-page')
var AnswerBtn_one = document.getElementById("btn_one")
var AnswerBtn_two = document.getElementById("btn_two")
var AnswerBtn_three = document.getElementById('btn_three')
var AnswerBtn_four = document.getElementById('btn_four')
var submit = document.getElementById('submit')
var isCorrect = false
var warning = document.getElementById('wrong_answer')

var start = document.getElementById('start')

var scoreForm = document.getElementById('score-submit-form')
var restart = document.getElementById('restart')
var resetScores = document.getElementById('reset-scores')
var scoreBoard = document.getElementById('score-board')
var submit = document.getElementById('submit')




//functions
function populateQuestion(){
title.textContent = questions[q_num].question
AnswerBtn_one.textContent = questions[q_num].answers[0].text
AnswerBtn_two.textContent = questions[q_num].answers[1].text
AnswerBtn_three.textContent = questions[q_num].answers[2].text
AnswerBtn_four.textContent = questions[q_num].answers[3].text
console.log(q_num)
}

//after remaking to more closely match the example, throws error but does not break
function checkAnswer(){
    q_num++
    console.log(q_num)
    
    if(q_num + 1 > questions.length){
        displayEndScreen()
        return;
    }
    else{
        populateQuestion()
    }

    if(isCorrect){
        warning.textContent = "Correct!"
        setTimeout(function(){
            warning.textContent = ""
        }, 1000)
    }
    else{
        score = score - 10
        warning.textContent = "Wrong answer"
        setTimeout(function(){
            warning.textContent = ""
        }, 1000)
    }
}





function startQuiz(){
    test_over = false;
    populateQuestion()
    start.setAttribute('hidden', true)
    instructions.setAttribute('hidden', true)
    
    AnswerBtn_one.removeAttribute('hidden')
    AnswerBtn_two.removeAttribute('hidden')
    AnswerBtn_three.removeAttribute('hidden')
    AnswerBtn_four.removeAttribute('hidden')
    
    scoreBoard.setAttribute('hidden', true)
}


function displayEndScreen(){
    test_over = true;
    q_num = 0
    //stop timer

    AnswerBtn_one.setAttribute('hidden', true)
    AnswerBtn_two.setAttribute('hidden', true)
    AnswerBtn_three.setAttribute('hidden', true)
    AnswerBtn_four.setAttribute('hidden', true)
    warning.setAttribute('hidden', true)

    title.textContent = "Your score was"
    
    scoreForm.removeAttribute('hidden')
    
    
    populateTable()
}

function setTime() {
    score = 60
    // Sets interval in variable
    var timer = setInterval(function() {
      
      score--;
      scoreEl.textContent = score;

      if(score <= 0){
          displayEndScreen()
          scoreEl.textContent = 0
          scoreForm.setAttribute('hidden', true)
          restart.removeAttribute('hidden')
      }
      if(test_over) {
        // Stops execution of action at set interval
        clearInterval(timer);
        // Calls function to create and append image
        // sendMessage();
      }
  
    }, 1000);
  }


function populateTable(){
    console.log('table')
    inputs = JSON.parse(localStorage.getItem('entries'))
    newEntry = document.createElement('li')
    newEntry.textContent = inputs.initials + " - " + inputs.score
    scoreBoard.appendChild(newEntry)
    title.textContent = "Highscores"
    
}


//event listners
start.addEventListener('click', function(){
    console.log(instructions)
    startQuiz()
    setTime()
})

restart.addEventListener('click', function(){
    scoreForm.setAttribute('hidden', true)
    restart.setAttribute('hidden', true)
    resetScores.setAttribute('hidden', true)
    startQuiz()
    setTime()
})


resetScores.addEventListener('click', function(){
    localStorage.clear()
    while(scoreBoard.firstChild){
        scoreBoard.removeChild(scoreBoard.lastChild)
    }
})
//-----------------------------------------------------------------------------------
submit.addEventListener('click', function(event){
    event.preventDefault()
    var newScore = {
        initials: document.getElementById('initials').value,
        score: score,
    }
    localStorage.setItem('entries', JSON.stringify(newScore))
    console.log('firing')
    populateTable()
    scoreForm.setAttribute('hidden', true)
    scoreBoard.removeAttribute('hidden')
    resetScores.removeAttribute('hidden')
    restart.removeAttribute('hidden')    
})

scorePage.addEventListener('click', function(){
    displayEndScreen()
    populateTable()
    start.setAttribute('hidden', true)
    instructions.setAttribute('hidden', true)
    scoreForm.setAttribute('hidden', true)
    scoreBoard.removeAttribute('hidden')
    resetScores.removeAttribute('hidden')
    restart.removeAttribute('hidden')   
})


AnswerBtn_one.addEventListener('click', function(){
    isCorrect = questions[q_num].answers[0].correct
    console.log(isCorrect)
    checkAnswer()
})
AnswerBtn_two.addEventListener('click', function(){
    isCorrect = questions[q_num].answers[1].correct
    console.log(isCorrect)
    checkAnswer()
})
AnswerBtn_three.addEventListener('click', function(){
    isCorrect = questions[q_num].answers[2].correct
    console.log(isCorrect)
    checkAnswer()
})
AnswerBtn_four.addEventListener('click', function(){
    isCorrect = questions[q_num].answers[3].correct
    console.log(isCorrect)
    checkAnswer()
})
