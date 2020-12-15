const weather=document.querySelector('.js-weather');
const icon=document.querySelector('.js-icon');
const API_KEY='9ef06ea04033b91f135ad3ca41f1ce76';
const COORDS='coords';

function getWeather(lat, lon){
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json();
  }).then(function(json){
    console.log(json)
    const temp=json.main.temp;
    const place=json.name;
    const imgSrc=json.weather.find(element=>element.icon).icon;
    const imgAlt=json.weather.find(element=>element.icon).main;
    weather.innerHTML=`${temp}\xB0C in ${place}`;
    icon.src=`http://openweathermap.org/img/wn/${imgSrc}@2x.png`;
    icon.alt=imgAlt;
  });
}

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  const latitude=position.coords.latitude;
  const longitude=position.coords.longitude;
  const coordsObj={
    latitude,
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("Can't access geolocation!");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
  const loadedCoords=localStorage.getItem(COORDS);
  if(loadedCoords===null){
    askForCoords();
  }else{
    //get weather
    const parsedCoords=JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude,parsedCoords.longitude);
  }
}

function init(){
  loadCoords();
}

init();