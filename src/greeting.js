'use strict';

const title=document.querySelector('.js-title');
const form=document.querySelector('.js-form');
const input=document.querySelector('.js-input');

const USER_LOCAL_STORAGE='currentUser';
const SHOW_CLASSNAME="show";

function whatTime(){
  const date=new Date();
  const hours=date.getHours();
  return hours;
}

function greetings(user){
  form.classList.remove(SHOW_CLASSNAME);
  title.classList.add(SHOW_CLASSNAME);
  if(whatTime<11){
    title.innerHTML=`Good Morning, ${user}.`;
  }else if(whatTime<16){
    title.innerHTML=`Good afternoon, ${user}.`;
  }else{
    title.innerHTML=`Good evening, ${user}.`;
  }
}

function saveName(text){
  localStorage.setItem(USER_LOCAL_STORAGE,text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue=input.value;
  greetings(currentValue);
  saveName(currentValue);
}

function askForName(){
  title.classList.add(SHOW_CLASSNAME);
  form.classList.add(SHOW_CLASSNAME);
  form.addEventListener('submit', handleSubmit);
}

function loadName(text){
  const currentUser=localStorage.getItem(USER_LOCAL_STORAGE);
  if(currentUser=== null){
    askForName();
  }else{
    greetings(currentUser);
  }
}


function init(){
  loadName();
}

init();
