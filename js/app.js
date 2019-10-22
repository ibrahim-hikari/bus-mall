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

  do {

    Things.centerObject = getRandomThings();

  } while (forbidden.includes(Things.centerObject))

  forbidden.push(Things.centerObject);

  do {

    Things.rightObject = getRandomThings();

  } while (forbidden.includes(Things.rightObject));

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
function finalList() {
  var uList = document.getElementById("news");
  uList.innerHTML = '';
  for (var i = 0; i < Things.all.length; i++) {
    var pro = Things.all[i]
    var text = pro.title + " had " + pro.clickCtr + " votes and was shown " + pro.shownCtr + " times.";
    addElement('li', uList, text)
  }
}

function addElement(tag, container, text) {
  var element = document.createElement(tag);
  container.appendChild(element);
  if (text) {
    element.textContent = text;
  }
  return element;
}

function clickHandler(event) {

  var clickedId = event.target.id;
  var ThingClicked;
  setThings();

  if (clickedId === 'left-thing-image') {
    ThingClicked = Things.leftObject;
  } else if (clickedId === 'center-thing-image') {
    ThingClicked = Things.centerObject;
  } else if (clickedId === 'right-thing-image') {
    ThingClicked = Things.rightObject;
  } else {
    alert('Please chose one of the THREE things that show at the screen')
  }

  if (ThingClicked) {
    ThingClicked.clickCtr++;
    Things.roundCtr++;

    // updateTotals();

    finalList();

    if (Things.roundCtr === Things.roundLimit) {

      alert('No more clicking for you!');
      showChart();
      Things.container.removeEventListener('click', clickHandler);

    } else {

      renderNewThings();
    }
  }
}

function showChart() {

  // Modified from https://jsfiddle.net/nagix/bL8hpk6n/

  var titleArr = [];
  var clickArr = [];
  var showArr = [];

  for (var i = 0; i < Things.all.length; i++) {
    var currentProduct = Things.all[i];
    titleArr.push(currentProduct.title);
    clickArr.push(currentProduct.clickCtr);
    showArr.push(currentProduct.shownCtr);

  }

  var data = {
    labels: titleArr,
    datasets: [{
      label: "Clicked",
      backgroundColor: 'rgba(21, 231, 39, 0.411)',
      borderWidth: 1,
      data: clickArr,
      xAxisID: "bar-x-axis1",
    }, {
      label: "Shown",
      backgroundColor: 'rgba(211, 51, 51, 0.424)',
      borderWidth: 1,
      data: showArr,
      xAxisID: "bar-x-axis2",
    }]
  };

  var options = {
    legend: {
      labels: {
        fontColor: "yellow",
        fontSize: 18
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'Yellow'
        },
        stacked: true,
        id: "bar-x-axis1",
        barThickness: 20,
      }, {
        display: false,
        stacked: true,
        id: "bar-x-axis2",
        barThickness: 40,
        // these are needed because the bar controller defaults set only the first x axis properties
        type: 'category',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        gridLines: {
          offsetGridLines: true
        },
        offset: true
      }],
      yAxes: [{
        stacked: false,
        ticks: {
          beginAtZero: true
        },
      }]

    }
  };

  var ctx = document.getElementById("myChart").getContext("2d");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });

}
function getThings() {
  var BusData = JSON.parse(localStorage.getItem('thing'))
  if (BusData) {
    Things.all = BusData;
  }

  finalList();
}

function setThings() {
  var BusString = JSON.stringify(Things.all)
  localStorage.setItem('thing', JSON.stringify(Things.all))
}


Things.container.addEventListener('click', clickHandler);

// updateTotals();


finalList();

renderNewThings();

showChart();

getThings();