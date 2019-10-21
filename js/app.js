'use strict';

function Things(title, src) {
  this.title = title;
  this.src = src;
  this.clickCtr = 0;
  this.shownCtr = 0;
  Things.all.push(this);
}

Things.roundCtr = 0;
Things.roundLimit = 25;

Things.all = [];

Things.container = document.getElementById('thing-container');

Things.leftImage = document.getElementById('left-thing-image');
Things.centerImage = document.getElementById('center-thing-image')
Things.rightImage = document.getElementById('right-thing-image');

Things.leftTitle = document.getElementById('left-thing-title');
Things.centerTitle = document.getElementById('center-thing-title')
Things.rightTitle = document.getElementById('right-thing-title');

// set when rendering things
Things.leftObject = null;
Things.rightObject = null;

new Things('Bag', 'images/bag.jpg');
new Things('Banana', 'images/banana.jpg');
new Things('Bathroom', 'images/bathroom.jpg');
new Things('Boots', 'images/boots.jpg');
new Things('breakfast', 'images/breakfast.jpg');
new Things('bubblegum', 'images/bubblegum.jpg');
new Things('chair', 'images/chair.jpg');
new Things('cthulhu', 'images/cthulhu.jpg');
new Things('dog-duck', 'images/dog-duck.jpg');
new Things('dragon', 'images/dragon.jpg');
new Things('pen', 'images/pen.jpg');
new Things('pet-sweep', 'images/pet-sweep.jpg');
new Things('scissors', 'images/scissors.jpg');
new Things('shark', 'images/shark.jpg');
new Things('sweep', 'images/sweep.png');
new Things('tauntaun', 'images/tauntaun.jpg');
new Things('unicorn', 'images/unicorn.jpg');
new Things('usb', 'images/usb.gif');
new Things('water-can', 'images/water-can.jpg');
new Things('wine-glass', 'images/wine-glass.jpg');

function renderNewThings() {

  // ensure that previous Things not shown on next round
  var forbidden = [Things.leftObject, Things.centerObject, Things.rightObject];

  do {

    Things.leftObject = getRandomThings();

  } while (forbidden.includes(Things.leftObject))

  forbidden.push(Things.leftObject);

  do{

    Things.centerObject = getRandomThings();

  } while (forbidden.includes(Things.centerObject))

  forbidden.push(Things.centerObject);

  do {

    Things.rightObject = getRandomThings();

  } while(forbidden.includes(Things.rightObject));
  
  Things.leftObject.shownCtr++;
  Things.centerObject.shownCtr++;
  Things.rightObject.shownCtr++;

  var leftThingImageElement = Things.leftImage;
  var centerThingImageElement = Things.centerImage;
  var rightThingImageElement = Things.rightImage;

  leftThingImageElement.setAttribute('src', Things.leftObject.src);
  leftThingImageElement.setAttribute('alt', Things.leftObject.title);

  centerThingImageElement.setAttribute('src', Things.centerObject.src);
  centerThingImageElement.setAttribute('alt', Things.centerObject.title);

  rightThingImageElement.setAttribute('src', Things.rightObject.src);
  rightThingImageElement.setAttribute('alt', Things.rightObject.title);

  Things.leftTitle.textContent = Things.leftObject.title;
  Things.centerTitle.textContent = Things.centerObject.title;
  Things.rightTitle.textContent = Things.rightObject.title;
}

function getRandomThings() {
  var index = Math.floor(Math.random() * Things.all.length);
  return Things.all[index];
}

function randomInRange(min, max) {
  var range = max - min + 1; 
  var rand = Math.floor(Math.random() * range) + min
  return rand;
}

function updateTotals() {

  var tableBody = document.getElementById('news');

  tableBody.innerHTML = '';

  for (var i = 0; i < Things.all.length; i++) {
    var thing = Things.all[i];
    var row = addElement('tr', tableBody);
    addElement('td', row, thing.title);
    addElement('td', row, '' + thing.clickCtr);
    addElement('td', row, '' + thing.shownCtr);
  }
}
function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if(text) {
    element.textContent = text;
  }
  return element;
}

function clickHandler(event) {

  var clickedId = event.target.id;
  var ThingClicked;

  if(clickedId === 'left-thing-image') {
    ThingClicked = Things.leftObject;
  } else if(clickedId === 'center-thing-image') {
    ThingClicked = Things.centerObject;
  } else if (clickedId === 'right-thing-image') {
    ThingClicked = Things.rightObject;
  } else {
    alert('Please chose one of the THREE things that show at the screen')
  }

  if(ThingClicked) {
    ThingClicked.clickCtr++;
    Things.roundCtr++;

    updateTotals();

    if(Things.roundCtr === Things.roundLimit) {

      alert('No more clicking for you!');
      showChart();
      Things.container.removeEventListener('click', clickHandler);

    } else {

      renderNewThings();
    }
  }
}

function showChart() {
  var thingsArr = [];
  var clickArr = [];
  var showArr = [];
  for (let i = 0; i < Things.all.length; i++) {
    var inst = Things.all[i];
    thingsArr.push(inst.title + 'Vote');
    thingsArr.push(inst.title + 'Shown');
    clickArr.push(inst.clickCtr);
    showArr.push(inst.shownCtr);
    
  }


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Bag ', 'Banana ', 'Bathroom ', 'Boots ', 'Breakfast ', 'Bubblegum ', 'Chair ','Cthulhu ','Dog-Duck ','Dragon ','Pen ','Pet-Sweep ','Scissors ','Shark ','Sweep ','Tauntaun ','Unicorn ','USB ','Water-Can ','Wine-Glass '],
        datasets: [
          {
            label: 'indecates the voted ones',
            backgroundColor: ['red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red','red',],
            borderColor: ['yellow'],
            data: clickArr,
          },
          {
            label: 'indicates the shown ones',
            backgroundColor: ['green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green','green',],
            borderColor: ['yellow'] ,
            data: showArr,
          }
      ]
    },
    // Configuration options go here
    options: {}
});
}

Things.container.addEventListener('click', clickHandler);

updateTotals();

renderNewThings();

showChart();