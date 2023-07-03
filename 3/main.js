const wsUrl = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.input-text');
const btnSend = document.querySelector('.btn-send');
const btnGeo = document.querySelector('.btn-geo');
const chatWindow = document.querySelector('.chat-window');
const infoConnect = document.querySelector('.info');

let socket = new WebSocket(wsUrl);

socket.onopen = () => {
    infoConnect.innerText = "Соединение установлено";
  }

socket.onerror = () => {
    infoConnect.innerText = "При передаче данных произошла ошибка";
  }

btnSend.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved-massage" : "sent-massage"}">${message}</div>`;
    chatWindow.innerHTML += messageHTML;
  }

  const errorGeo = () => {
    chatWindow.innerHTML = `<div class="recieved-massage">Невозможно получить ваше местоположение</div>`
  }
  
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    chatWindow.innerHTML = 
      `<div class="recieved-massage">Широта: ${latitude} Долгота: ${longitude} 
      <a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">
      Вы тут</a> 
      </div>`
  }
  
  btnGeo.addEventListener("click", () => {
    if(!navigator.geolocation) {
      chatWindow.innerHTML = `<div class="recieved-massage">Функция Геолокация не поддерживается вашим браузером</div>`;
    } else {
      navigator.geolocation.getCurrentPosition(success, errorGeo);
    }
  })