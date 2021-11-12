const showBtn = document.getElementById("show-btn");
const questionCard = document.querySelector(".question-card");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("question-form");
const feedback = document.querySelector(".feedback");
const questionInput = document.getElementById("question-input");
const answerInput = document.getElementById("answer-input");
const questionList = document.getElementById("questions-list");
const saveBtn = document.querySelector('.submitBtn');

class App {
    #questions = [];// [{'question':'Hello','answer':'val'},{'question':'Bye','answer':'val'}];
    constructor() {
        this._addQuestion();
        this._closeBtn();
        this._saveQuestion();
        this._loadQuestion();
        this._showhide();
    }

    _loadQuestion(){
        questionList.innerHTML = "";
        this.#questions.forEach(element => {
            questionList.insertAdjacentHTML('beforeend', `<div class="col-md-4"><div class="card card-body flashcard my-3">
            <h4 class="text-capitalize">${element.question}?</h4>
            <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
            <h5 class="answer mb-3">${element.answer}</h5>
            <div class="flashcard-btn d-flex justify-content-between">
             <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="">edit</a>
             <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
            </div></div>`);
        });
        this._deleteQuestion();
        this._editQuestion();
    }

    _addQuestion() {
        showBtn.addEventListener('click', function () {
            // console.log("Add question working");
            questionCard.style.display = "block";
        });
    }

    _saveQuestion() {
        saveBtn.addEventListener('click', this._saveBtn.bind(this));
    }

    _saveBtn(e) {
        e.preventDefault();
        if (!questionInput.value || !answerInput.value) {
            feedback.style.display = "block";
            feedback.classList.add('alert-danger');
            feedback.textContent = "Fill the form completely";
            setTimeout(() => this._dangerAlert(), 800);
            this._reset();
            return;
        }
        const question = `{"question":"${questionInput.value}","answer":"${answerInput.value}"}`;
        this._reset();
        this.#questions.push(JSON.parse(question));
        this._loadQuestion();
    }

    _dangerAlert() {
        feedback.style.display = "none";
        feedback.classList.remove('alert-danger');
        feedback.textContent = "customer feedback";
    }

    _closeBtn() {
        closeBtn.addEventListener('click', function () {
            // console.log("Close button working");
            questionCard.style.display = "none";
        });
    }

    _reset() {
        questionInput.value = "";
        answerInput.value = "";
    }

    _editQuestion(){
        const edit = [...document.querySelectorAll('.edit-flashcard')];
        edit.forEach((ele,idx)=>{
            ele.addEventListener('click',this._editBtn.bind(this,idx));
        });
    }

    _editBtn(idx){
        questionInput.value = this.#questions[idx].question;
        answerInput.value = this.#questions[idx].answer;
        this._deleteBtn(idx);
    }

    _deleteQuestion(){
        const del = [...document.querySelectorAll('.delete-flashcard')];
        del.forEach((ele,idx) => {
            ele.addEventListener('click',this._deleteBtn.bind(this,idx));
        });
    }
    
    _deleteBtn(idx){
        let value = this.#questions[idx];
        this.#questions = this.#questions.slice(0,idx).concat(this.#questions.slice(idx+1));
        this._loadQuestion();
        return value;
    }

    _showhide(){
        questionList.addEventListener('click',function(e){
            if(!e.target.classList.contains('show-answer'))return;
            const node = e.target.closest('div');
            node.querySelector('h5').classList.toggle('answer');
        });
    }
};

const app = new App();
