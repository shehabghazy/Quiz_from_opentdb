"use strict"

let choosedCategory = document.getElementById('choosedCategory')
let questionsDifficulty = document.getElementsByName('questionsDifficulty')
let numOfQuestions = document.getElementById('numOfQuestions')
let startBtn = document.getElementById('startBtn')
let mainSection = document.getElementById('mainSection')
let questionsSection = document.getElementById('questionsSection')
let resultSection = document.getElementById('resultSection')
let quizContainer = document.getElementById('quizContainer')
let numOfChoosedQuestions = document.getElementById('numOfChoosedQuestions')
let submitBtn = document.getElementById('submitBtn')

let category;
let difficulty;
let amount ;


function generateQuestions(){
    let checkedDifficulty;
    for (const question of questionsDifficulty) {
        if (question.checked) {
            checkedDifficulty =  question.value
        }
    }

    category = choosedCategory.value;
    difficulty = checkedDifficulty;
    amount = numOfQuestions.value;
    // console.log(category , difficulty , amount)
    getQuestions();
}
startBtn.addEventListener('click' , generateQuestions)


let questionsList = [];
let theQuestion;
let answers =[];
let correctanswer;
let putQuestion ="";
let putAnswers ="";
let idIndex = 0
let questionNumber = 0;

async function getQuestions(){

    let apiUrl = await fetch (`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
    let result = await apiUrl.json();
    questionsList = result.results
    console.log(questionsList)

    displayQuestionsSection();
    displayQuestions(questionNumber);

}


let answersDec = [] ;

function displayQuestions (getIndex) {
        // console.log(answers.length)

        // collcetScore(getIndex);

    putQuestion  = "";
    putAnswers = "";
    theQuestion = questionsList[getIndex].question
    answers = questionsList[getIndex].incorrect_answers
    // correctanswer = questionsList[getIndex].correct_answer
    answers.push(questionsList[getIndex].correct_answer)
    // console.log(questionsList[getIndex].correct_answer)
    shuffle(answers);
    // console.log(questionsList[getIndex].correct_answer)

    numOfChoosedQuestions.innerHTML = `${questionNumber+1} Of ${questionsList.length} Question`

    putQuestion = `<h5 class="main-color">Q: ${questionsList[getIndex].question}</h5>`
    idIndex++
    let answerIndex = 0;
    for (const answer of answers) {
        answerIndex++
        putAnswers += `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="question${idIndex}" value="${answer}" id="q${idIndex}Answer${answerIndex}">
            <label class="form-check-label" for="q${idIndex}Answer${answerIndex}">${answer}</label>
        </div> `
    }
    quizContainer.innerHTML = putQuestion + putAnswers

    // console.log(questionsList[getIndex].correct_answer)

    for (let i = 0; i < answers.length; i++) {

        answersDec[i] = document.getElementById(`q${idIndex}Answer${i+1}`) ;
        // console.log(answersDec[i])
    
    }
}

submitBtn.addEventListener('click' , function(){

    if (questionNumber != (questionsList.length-1)) {
        questionNumber += 1;
        numOfChoosedQuestions.innerHTML = `${questionNumber+1} Of ${questionsList.length} Question`
        collcetScore(questionNumber)

        displayQuestions(questionNumber);

    }
    else {
        questionNumber += 1;
        collcetScore(questionNumber)
        displayResultSection();
    }
})

let totalScore = 0
let userScore = 0
let displayTotalScore = document.getElementById('displayTotalScore')
let displayUserScore = document.getElementById('displayUserScore')

function collcetScore(getIndex){
    let answerChek = false;
    for (let i = 0; i < answers.length; i++) {

        if (questionNumber <= (questionsList.length)) {    

            if (answersDec[i].checked) {
                answerChek = true
                if (answersDec[i].value == questionsList[getIndex-1].correct_answer) {
                    userScore += 10;
                    console.log('yes' , userScore)
                }
                else {
                    console.log('no' , userScore)

                }
                   
            }
        }

    }
    if (answerChek == false) {
        console.log('choose')

    }


    totalScore = questionsList.length * 10
    displayTotalScore.innerHTML = totalScore
    displayUserScore.innerHTML = userScore

}



function displayResultSection(){
    resultSection.classList.remove('d-none')
    questionsSection.classList.add('d-none')

}

function displayQuestionsSection(){
    mainSection.classList.add('d-none')
    questionsSection.classList.remove('d-none')

}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  

