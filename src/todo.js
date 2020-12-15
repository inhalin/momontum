// 일단은 기능은 된다.
// 그런데 local storage에 저장한 값을 콘솔에 찍을때 보면 
// 불필요한 공백이 자꾸 생기는데 어떻게 고치는지 모르겠네

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

  btnDel.innerHTML='❌';
  btnDel.addEventListener("click", deleteFinished);
  btnPending.innerHTML='🔙'
  btnPending.addEventListener('click', toPending);
  span.innerHTML=' '+text;

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

  btnDel.innerHTML='❌';
  btnDel.addEventListener("click", deletePending);
  btnFinished.innerHTML='✅';
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
