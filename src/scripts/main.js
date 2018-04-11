var interactiveForm = document.querySelector('.s-interactive form');
var interactiveSelect = document.querySelector('.s-interactive select');
var interactiveInput = document.querySelector('.s-interactive input');


function scrollToTop() {
  window.scrollTo(0, 0);
}


function swapPanels() {
  var calculatorNode = document.querySelector('.s-interactive .c-calculator');
  var resultsNode = document.querySelector('.s-interactive .c-results');

  calculatorNode.classList.add('u-hidden');
  resultsNode.classList.remove('u-hidden');
}


function getAverageBalance(object) {
  var keys = Object.keys(object).map(Number);
  var value = interactiveInput.value;

  for (var i = 0; i < keys.length; i++) {
    if (value >= keys[i] && value < keys[i + 1]) {
      return balance = object[keys[i]][interactiveSelect.selectedIndex];
    } else if (value >= keys[keys.length - 1]) {
      return balance = object[keys[keys.length - 1]][interactiveSelect.selectedIndex];
    }
  }
}


function delimiter(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function calculateBalances() {
  var maleBalanceNode = document.querySelector('.s-interactive .js-male-balance');
  var femaleBalanceNode = document.querySelector('.s-interactive .js-female-balance');
  var balanceDifferenceNode = document.querySelector('.s-interactive .js-balance-difference');
  var percentageDifferenceNode = document.querySelector('.s-interactive .js-percentage-difference');
  var chartBarNode = document.querySelector('.s-interactive .js-chart-bar');

  var maleBalances = [5924, 23712, 43583, 64590, 99959, 145076, 172126, 237022, 270710, 246915];
  var femaleBalances = [5022, 19107, 33748, 48874, 61922, 87543, 99520, 123642, 157049, 171227];

  var maleBalance = maleBalances[interactiveSelect.selectedIndex];
  var femaleBalance = femaleBalances[interactiveSelect.selectedIndex];

  if (interactiveInput.value) {
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

  var balanceDifference = maleBalance - femaleBalance;
  var percentageDifference = balanceDifference / ((maleBalance + femaleBalance) / 2) * 100;

  maleBalanceNode.textContent = '$' + delimiter(maleBalance);
  femaleBalanceNode.textContent = '$' + delimiter(femaleBalance);
  balanceDifferenceNode.textContent = '$' + delimiter(balanceDifference);
  percentageDifferenceNode.textContent = percentageDifference.toFixed() + '%';
  chartBarNode.setAttribute('style', 'transform: translatey(' + percentageDifference + '%);');
}


function form() {
  interactiveForm.onsubmit = function(event) {
    event.preventDefault();
    scrollToTop();
    swapPanels();
    calculateBalances();
  };
}


function select() {
  interactiveSelect.onchange = function(event) {
    this.parentNode.setAttribute('data-value', event.target.value);
  };

  interactiveSelect.onfocus = function() {
    this.parentNode.classList.add('is-focused');
  };

  interactiveSelect.onblur = function() {
    this.parentNode.classList.remove('is-focused');
  };

  var change = new Event('change');
  interactiveSelect.dispatchEvent(change);
}


document.addEventListener('DOMContentLoaded', function() {
  form();
  select();
});
