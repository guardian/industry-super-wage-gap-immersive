var jsSelect = document.querySelector('.s-interactive .js-select');
var jsCalculator = document.querySelector('.s-interactive .js-calculator');
var jsInput = document.querySelector('.s-interactive .js-input');


function select() {
  jsSelect.onchange = function(event) {
    this.parentNode.setAttribute('data-value', event.target.value);
  }

  jsSelect.onfocus = function() {
    this.parentNode.classList.add('is-focused');
  }

  jsSelect.onblur = function() {
    this.parentNode.classList.remove('is-focused');
  }

  var change = new Event('change');
  jsSelect.dispatchEvent(change);
}


function scrollToTop() {
  window.scrollTo(0, 0);
}


function swapPanels() {
  var jsResults = document.querySelector('.s-interactive .js-results');

  jsCalculator.classList.add('u-hidden');
  jsResults.classList.remove('u-hidden');
}


function getAverageBalance(object) {
  var keys = Object.keys(object).map(Number);
  var value = jsInput.value;

  for (var i = 0; i < keys.length; i++) {
    if (value >= keys[i] && value < keys[i + 1]) {
      return balance = object[keys[i]][jsSelect.selectedIndex];
    } else if (value >= keys[keys.length - 1]) {
      return balance = object[keys[keys.length - 1]][jsSelect.selectedIndex];
    }
  }
}


function counter(target, value) {
  var options = {
    prefix: '$'
  }

  var counter = new CountUp(target, 0, value, 0, 1, options);
  counter.start();
}


function separator(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function calculateBalances() {
  var jsMaleBalance = document.querySelector('.s-interactive .js-male-balance');
  var jsFemaleBalance = document.querySelector('.s-interactive .js-female-balance');
  var jsDollarDifference = document.querySelector('.s-interactive .js-dollar-difference');
  var jsPercentageDifference = document.querySelector('.s-interactive .js-percentage-difference');
  var jsChartBar = document.querySelector('.s-interactive .js-chart-bar');

  var maleBalances = [5924, 23712, 43583, 64590, 99959, 145076, 172126, 237022, 270710, 246915];
  var femaleBalances = [5022, 19107, 33748, 48874, 61922, 87543, 99520, 123642, 157049, 171227];

  var maleBalance = maleBalances[jsSelect.selectedIndex];
  var femaleBalance = femaleBalances[jsSelect.selectedIndex];

  if (jsInput.value) {
    maleBalances = {
      0: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      10: [200, 201, 202, 203, 204, 205, 206, 207, 208, 209],
      100: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
      1000: [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009]
    };

    femaleBalances = {
      0: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      10: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
      100: [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009],
      1000: [10000, 10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008, 10009]
    };

    maleBalance = getAverageBalance(maleBalances);
    femaleBalance = getAverageBalance(femaleBalances);
  }

  var dollarDifference = maleBalance - femaleBalance;
  var percentageDifference = dollarDifference / ((maleBalance + femaleBalance) / 2) * 100;

  counter(jsMaleBalance, maleBalance);
  counter(jsFemaleBalance, femaleBalance);
  jsDollarDifference.textContent = '$' + separator(dollarDifference);
  jsPercentageDifference.textContent = percentageDifference.toFixed() + '%';
  jsChartBar.setAttribute('style', 'transform: translatey(' + percentageDifference + '%);');
}


function analytics() {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Form',
    eventAction: 'Submit',
    eventLabel: jsSelect.value + ', ' + (jsInput.value ? jsInput.value : 'not specified')
  });
}


function calculator() {
  jsCalculator.onsubmit = function(event) {
    event.preventDefault();
    scrollToTop();
    swapPanels();
    calculateBalances();
    analytics();
  }
}


function toggleResults() {
  var jsToggleDifference = document.querySelector('.s-interactive .js-toggle-difference');
  var jsPeople = document.querySelectorAll('.s-interactive .js-people');

  jsToggleDifference.onclick = function() {
    for (var i = 0; i < jsPeople.length; i++) {
      jsPeople[i].classList.toggle('is-retired');
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
  select();
  calculator();
  toggleResults();
});
