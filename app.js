'use strict';

var storeList = ['seattle', 'tokyo', 'dubai', 'paris', 'lima'];



// function changeStoreData() {
//   var min = Number(prompt('Enter minimum hourly customers.'));
//   var max = Number(prompt('Enter maximum hourly customers.'));
//   var avg = Number(prompt('Enter average cookie number purchased per customer.'));

//   return min, max, avg;
// }

var seattle = {
  //properties
  storeName: 'Seattle',
  minHourlyCustomers: 15,
  maxHourlyCustomers: 120,
  avgCustomerCookies: 7.8,
  dailyCookieSalesHourly: [],
  storeHours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

  getCookieSalesHourly: function () {
    for (var i = 0; i < this.storeHours.length; i++) {
      var hourCookies = Math.round(this.randomHourlyCustomers() * this.avgCustomerCookies);
      this.dailyCookieSalesHourly.push(hourCookies);
    }
    return this.dailyCookieSalesHourly;
  },

  //methods
  randomHourlyCustomers: function () {
    var min = Math.ceil(this.minHourlyCustomers);
    var max = Math.floor(this.maxHourlyCustomers);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  displayCookieSales: function (dayCookies) {
    var totalCookieSales = document.createElement('li');
    var dailySalesStoreName = document.createElement('h2');
    dailySalesStoreName.textContent = this.storeName;

    for (var i = 0; i < dayCookies.length; i++) {
      var dailySalesTable = document.getElementById('salesTable');
      var dailySalesItem = document.createElement('li');
      dailySalesItem.textContent = dayCookies[i];
      dailySalesTable.appendChild(dailySalesItem);
      totalCookieSales = totalCookieSales + dayCookies[i];

    }
    totalCookieSales.textContent = totalCookieSales;
    dailySalesTable.appendChild(totalCookieSales);
  },
};



function createTable(store) {
  var c = 0;
  // seattle.displayCookieSales(seattle.getCookieSalesHourly());
  while (c < storeList.length) {
    console.log(storeList.length);
    console.log(store);
    console.log(storeList[c]);
    if (store === storeList[c]) {
      console.log('confirm');
      // storeList[c].displayCookieSales(storeList[c].getCookieSalesHourly());
    } else {
      continue;
    }
    c++;
  }
}

function populateTables() {
  for (var s = 0; s < storeList.length; s++) {
    // createTable(storeList[s]);
    console.log(storeList[s]);
  }
}

// populateTables();

// var arrayTest = seattle.getCookieSalesHourly()

// seattle.displayCookieSales(seattle.getCookieSalesHourly());

// console.log(arrayTest);

// var numtest;

// console.log(numtest = Seattle.randomHourlyCustomers());
