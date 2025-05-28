console.log("hello")

const quizData = [
    {
        question: 'How old is ShinJaehun?',
        a: '20',
        b: '30',
        c: '40',
        d: '50',
        correct: 'd'
    },
    {
        question: 'What is the most used programming language in 2035?',
        a: 'Java',
        b: 'C',
        c: 'Python',
        d: 'JavaScript',
        correct: 'b'
    },
    {
        question: 'Who is the President of US?',
        a: 'Shin Jaehun',
        b: 'Donald Trump',
        c: 'Kim Jeongun',
        d: 'Xi Jinping',
        correct: 'b'
    },
    {
        question: 'What does HTML stands for?',
        a: 'Hypertext Markup Language',
        b: 'Application Programming Interface',
        c: 'Jason Object Notation',
        d: 'Cascading Style Sheet',
        correct: 'a'
    },
    {
        question: 'What year was Javascript launched?',
        a: '1995',
        b: '2019',
        c: '2018',
        d: 'none of the above',
        correct: 'a'
    },
]

let currentQuiz = 0
let score=0
const questionEl = document.getElementById('question')
const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

loadQuiz()

function loadQuiz(){
    deselectAnswers()
    const currentQuizData = quizData[currentQuiz]
    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function getSelected(){
    let answer=undefined
    answerEls.forEach((answerEl) => {
        // console.log(answerEl.checked)
        if(answerEl.checked){
            answer=answerEl.id;
        }
    });
    return answer
}

function deselectAnswers(){
    answerEls.forEach((answerEl) => {
        answerEl.checked=false;
    });
}

submitBtn.addEventListener('click', ()=>{
    const answer=getSelected()
    // console.log(answer)
    if(answer){
        if(answer===quizData[currentQuiz].correct) {
            score++
        }
        currentQuiz++
        if(currentQuiz < quizData.length){
            loadQuiz()
        }else{
            // alert("You finished! Get youself an orange lemonade!")
            quiz.innerHTML=`
                <h2>You answered correctly at ${score}/${quizData.length} questions</h2>
                <button onClick="location.reload()">Reload</button>
            `;
        }
    }
    

})


