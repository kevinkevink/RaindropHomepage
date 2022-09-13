const form = document.getElementById('form');
const query = document.getElementById('query');
const settings = document.getElementById('settings');
const close = document.getElementById('close');

const google = 'https://www.google.com/search?q=';

function submitted(event) {
  event.preventDefault();
  const url = google + q.value;
  const win = window.open(url, '_self');
  win.focus();
}

form.addEventListener('submit', submitted);

document.addEventListener('keyup', (e) => {
    if (e.code === 'Enter' && query === document.activeElement){
        const url = google + query.value;
        window.location.replace(url);
    }
  });
settings.addEventListener('click', function() {
  document.getElementById("settingsPage").style.transform = "scaleY(1)";
});

close.addEventListener('click', function() {
  document.getElementById("settingsPage").style.transform = "scaleY(0)";
});

//BUTTONS

document.getElementById('bcc1').addEventListener('click', function() {
  document.getElementById('bccText').value = "#87ceeb";
});

document.getElementById('bcc2').addEventListener('click', function() {
  document.getElementById('bccText').value = "#DC143C";
});

document.getElementById('bcc3').addEventListener('click', function() {
  document.getElementById('bccText').value = "#ffd700";
});

document.getElementById('bcc4').addEventListener('click', function() {
  document.getElementById('bccText').value = "#6960db";
});

document.getElementById('bcc5').addEventListener('click', function() {
  document.getElementById('bccText').value = "#90ee90";
});


document.getElementById('rcc1').addEventListener('click', function() {
  document.getElementById('rccText').value = "#87ceeb";
});

document.getElementById('rcc2').addEventListener('click', function() {
  document.getElementById('rccText').value = "#DC143C";
});

document.getElementById('rcc3').addEventListener('click', function() {
  document.getElementById('rccText').value = "#ffd700";
});

document.getElementById('rcc4').addEventListener('click', function() {
  document.getElementById('rccText').value = "#6960db";
});

document.getElementById('rcc5').addEventListener('click', function() {
  document.getElementById('rccText').value = "#90ee90";
});


document.getElementById('sbcc1').addEventListener('click', function() {
  document.getElementById('sbccText').value = "#87ceeb";
});

document.getElementById('sbcc2').addEventListener('click', function() {
  document.getElementById('sbccText').value = "#DC143C";
});

document.getElementById('sbcc3').addEventListener('click', function() {
  document.getElementById('sbccText').value = "#ffd700";
});

document.getElementById('sbcc4').addEventListener('click', function() {
  document.getElementById('sbccText').value = "#6960db";
});

document.getElementById('sbcc5').addEventListener('click', function() {
  document.getElementById('sbccText').value = "#90ee90";
});


//SAVE DEFAULTS
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    items = {'searchBar': "#6960db",
   'rainColor': "#FF7F50",
    'backgroundColor':"#5F9EA0",
  'rainAmount':10};
  chrome.storage.sync.set(items, function(){
    console.log("saving defaults");
  });
  }
});

document.getElementById('Save').addEventListener('click', function() {

  if(isLegit(document.getElementById('sbccText').value)){
    chrome.storage.sync.set({'searchBar':document.getElementById('sbccText').value}, function(){});
  }

  if(isLegit(document.getElementById('rccText').value)){
    chrome.storage.sync.set({'rainColor':document.getElementById('rccText').value}, function(){});
  }

  if(isLegit(document.getElementById('bccText').value)){
    chrome.storage.sync.set({'backgroundColor':document.getElementById('bccText').value}, function(){});
  }

  chrome.storage.sync.set({'rainAmount':document.getElementById('rainAmount').value}, function(){});
});

chrome.storage.sync.get(['rainColor', 'searchBar', 'backgroundColor', 'rainAmount'], (result) => {
  document.getElementById('rccText').value = result['rainColor'];
  document.getElementById('bccText').value = result['backgroundColor'];
  document.getElementById('sbccText').value = result['searchBar'];
  document.getElementById('rainAmount').value = result['rainAmount'];
  if(typeof(result['rainColor']) === "undefined"){
    document.getElementById('rccText').value = "#FF7F50";
    chrome.storage.sync.set({'rainColor':document.getElementById('rccText').value}, function(){});
  }
  if(typeof(result['backgroundColor']) === "undefined"){
    document.getElementById('bccText').value = "#5F9EA0";
    chrome.storage.sync.set({'backgroundColor':document.getElementById('bccText').value}, function(){});
  }
  if(typeof(result['searchBar']) === "undefined"){
    document.getElementById('sbccText').value = "#6960db";
    chrome.storage.sync.set({'searchBar':document.getElementById('sbccText').value}, function(){});
  }
  if(typeof(result['rainAmount']) === "undefined"){
    document.getElementById('rainAmount').value = 10;
    chrome.storage.sync.set({'rainAmount':document.getElementById('rainAmount').value}, function(){});
  }
});

function isLegit(color){
  if(color.substring(0,1) != "#"){
    return false;
  }
  return color.length == 7;
}