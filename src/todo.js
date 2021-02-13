'use strict';

const todoForm=document.querySelector('.js-todoForm');
const todoInput=document.querySelector('.js-todo');
const pending=document.querySelector('.js-pending');
const finished=document.querySelector('.js-finished');

const PENDING_LS='pending';
const FINISHED_LS='finished';

let todos=[];
let done=[];

function toPending(event){
  deleteFinished(event);
  const btnClicked=event.target.parentNode.lastChild.innerHTML;
  console.log(btnClicked);
  showPending(btnClicked);
}

function deleteFinished(event){
  const btnClicked=event.target;
  const li=btnClicked.parentNode;
  finished.removeChild(li);
  const cleanFinished=done.filter(function(done){
    return done.id!==parseInt(li.id);
  });
  done=cleanFinished;
  saveFinished();
}

function saveFinished(){
  localStorage.setItem(FINISHED_LS, JSON.stringify(done));
}

function showFinished(text){
  const li=document.createElement('li');
  const btnDel=document.createElement('button');
  const btnPending=document.createElement('button');
  const span=document.createElement('span');
  const newId=done.length+1;

  btnDel.innerHTML='Delete';
  btnDel.classList.add('btn');
  btnDel.classList.add('btn-sm');
  btnDel.classList.add('btn-danger');
  btnDel.addEventListener("click", deleteFinished);
  btnPending.innerHTML='Back'
  btnPending.classList.add('btn');
  btnPending.classList.add('btn-sm');
  btnPending.classList.add('btn-secondary');
  btnPending.style.marginRight = "10px";
  btnPending.addEventListener('click', toPending);
  span.innerHTML = text;

  li.id=newId;
  li.appendChild(btnDel);
  li.appendChild(btnPending);
  li.appendChild(span);
  finished.appendChild(li);
  

  const doneObj={
    text: text,
    id: newId
  }
  done.push(doneObj);
  saveFinished();
}

function toFinished(event){
  const btnClicked=event.target.parentNode.lastChild.innerHTML;
  deletePending(event);
  showFinished(btnClicked);
}

function deletePending(event){
  const btnClicked=event.target;
  const li=btnClicked.parentNode;
  pending.removeChild(li);
  const cleanTodos=todos.filter(function(todo){
    return todo.id!==parseInt(li.id);
  });
  todos=cleanTodos;
  savePending();
}

function savePending(){
  localStorage.setItem(PENDING_LS, JSON.stringify(todos));
}

function showPending(text){
  const li=document.createElement('li');
  const btnDel=document.createElement('button');
  const btnFinished=document.createElement('button');
  const span=document.createElement('span');
  const newId=todos.length+1; //li에 추가할 id값 자동으로 1씩 증가

  btnDel.innerHTML='Delete';
  btnDel.classList.add('btn');
  btnDel.classList.add('btn-sm');
  btnDel.classList.add('btn-danger');
  btnDel.addEventListener("click", deletePending);
  btnFinished.innerHTML='Done';
  btnFinished.classList.add('btn');
  btnFinished.classList.add('btn-sm');
  btnFinished.classList.add('btn-primary');
  btnFinished.style.marginRight = "10px";
  btnFinished.addEventListener("click", toFinished);
  span.innerHTML=text;

  li.id=newId;
  li.appendChild(btnDel);
  li.appendChild(btnFinished);
  li.appendChild(span);
  pending.appendChild(li);
  
  const todoObj={
    text:text,
    id: newId
  }
  
  todos.push(todoObj);
  savePending();
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue=todoInput.value;
  showPending(currentValue);
  todoInput.value="";
}

function loadTodos(){
  const loadedTodos=localStorage.getItem(PENDING_LS);
  const loadedFinished=localStorage.getItem(FINISHED_LS);
  if(loadedTodos!==null){
    const parsedTodos=JSON.parse(loadedTodos);
    parsedTodos.forEach(function(todo){
      showPending(todo.text);
    });
  }
  if(loadedFinished!==null){
    const parsedFinished=JSON.parse(loadedFinished);
    parsedFinished.forEach(function(done){
      showFinished(done.text);
    });
  }
}

function init(){
  loadTodos();
  todoForm.addEventListener("submit",handleSubmit);
}

init();
