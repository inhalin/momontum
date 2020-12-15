const quotes=document.querySelector('.js-text');
const by=document.querySelector('.js-author')

function getQuotes(){
  fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    const rn=Math.floor(Math.random()*1643);
    const text=json[rn].text;
    let author=json[rn].author;
    console.log(author);
    if(author===null){
      author='unknown';
    }
    console.log(rn, json[rn]);
    quotes.innerHTML=text;
    by.innerHTML=`― ${author}`;
  })
}

function init(){
  getQuotes();
}

init();