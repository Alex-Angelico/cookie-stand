'use strict';

var submitStore = document.getElementById('entryform');
var hoursChange = document.getElementById('hoursinput');
var salesTable = document.getElementById('salesTable');
var storeList = [];
var storeHours = ['06am', '07pm']; // all single-digit hours must be preceded by '0' (e.g. '08am', '01pm')

function Store(name = '', minHourlyCustomers = 0, maxHourlyCustomers = 0, avgCustomerCookies = 0) {
  this.name = name;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCustomerCookies = avgCustomerCookies;
  this.hourlyCookieSales = [];
  this.totalCookieSales = 0;
  storeList.push(this);
}

Store.prototype.salesDataRender = function (store, hours) {
  getCookieSalesHourly(store, hours);
  var salesRow = document.createElement('tr');
  var storeName = document.createElement('th');
  storeName.textContent = this.name;
  salesRow.appendChild(storeName);
  for (var i = 0; i < this.hourlyCookieSales.length; i++) {
    var hourlySales = document.createElement('td');
    hourlySales.textContent = this.hourlyCookieSales[i];
    salesRow.appendChild(hourlySales);
  }
  var dailyTotalSales = document.createElement('td');
  dailyTotalSales.textContent = this.totalCookieSales;
  salesRow.appendChild(dailyTotalSales);
  salesTable.appendChild(salesRow);
};

new Store('Seattle', 23, 65, 6.3);
new Store('Tokyo', 3, 24, 1.2);
new Store('Dubai', 11, 38, 3.7);
new Store('Paris', 20, 38, 2.3);
new Store('Lima', 2, 16, 4.6);

function getHours(hours) {
  var openDayHalf = hours[0].substring(2);
  var closeDayHalf = hours[1].substring(2);
  var firstHour = Number(hours[0].substring(0, 2));
  var lastHour = Number(hours[1].substring(0, 2));
  var totalHours = Number();
  var hoursList = [];
  if ((openDayHalf === 'am' && closeDayHalf === 'pm') || (openDayHalf === 'pm' && closeDayHalf === 'am')) {
    totalHours = (12 - firstHour) + (12 - (12 - lastHour)) + 1;
  } else if (((openDayHalf === 'pm' && closeDayHalf === 'pm') || (openDayHalf === 'am' && closeDayHalf === 'am')) && firstHour < lastHour) {
    totalHours = (12 - (12 - lastHour)) - (12 - (12 - firstHour)) + 1;
  } else if (((openDayHalf === 'pm' && closeDayHalf === 'pm') || (openDayHalf === 'am' && closeDayHalf === 'am')) && firstHour > lastHour) {
    totalHours = 24 - (((12 - (12 - firstHour)) - (12 - (12 - lastHour)))) + 1;
  }
  var timeHour;
  for (var i = 0; i < totalHours; i++) {
    if (openDayHalf === 'am' || String(firstHour + openDayHalf) === '12pm') {
      if ((firstHour + i) <= 11) {
        timeHour = `${firstHour + i}:00am`;
      } else if ((firstHour + i) === 12) {
        timeHour = `${firstHour + i}:00pm`;
      } else if ((firstHour + i) > 12 && (firstHour + i) <= 23) {
        timeHour = `${(firstHour + i) - 12}:00pm`;
      } else if ((firstHour + i) === 24) {
        timeHour = `${(firstHour + i) / 2}:00am`;
      } else if ((firstHour + i) > 23) {
        timeHour = `${(firstHour + i) - 24}:00am`;
      }
    } else if (openDayHalf === 'pm' || String(firstHour + openDayHalf) === '12am') {
      if ((firstHour + i) <= 11) {
        timeHour = `${firstHour + i}:00pm`;
      } else if ((firstHour + i) === 12) {
        timeHour = `${firstHour + i}:00am`;
      } else if ((firstHour + i) > 12 && (firstHour + i) <= 23) {
        timeHour = `${(firstHour + i) - 12}:00am`;
      } else if ((firstHour + i) === 24) {
        timeHour = `${(firstHour + i) / 2}:00pm`;
      } else if ((firstHour + i) > 24) {
        timeHour = `${(firstHour + i) - 24}:00pm`;
      }
    }
    hoursList.push(timeHour);
  }
  return hoursList;
}

function getCookieSalesHourly(store, hours) {
  for (var i = 0; i < hours.length; i++) {
    var hourCookieSales = Math.round(getCustomersHourly(store) * store.avgCustomerCookies);
    store.hourlyCookieSales.push(hourCookieSales);
    store.totalCookieSales += hourCookieSales;
  }
}

function getCustomersHourly(store) {
  return Math.floor(Math.random() * (store.maxHourlyCustomers - store.minHourlyCustomers + 1) + store.minHourlyCustomers);
}

function hourlyTabulationRender(hours) {
  var hoursRow = document.createElement('tr');
  var storeNameColumn = document.createElement('th');
  var dailyTotalSalesColumn = document.createElement('th');
  storeNameColumn.textContent = '';
  hoursRow.appendChild(storeNameColumn);

  for (var i = 0; i < hours.length; i++) {
    var hourlyHeader = document.createElement('th');
    hourlyHeader.textContent = hours[i];
    hoursRow.appendChild(hourlyHeader);
  }
  dailyTotalSalesColumn.textContent = 'Daily Location Total';
  hoursRow.appendChild(dailyTotalSalesColumn);
  salesTable.appendChild(hoursRow);
}

function hourlyTotalsRender(hours) {
  var salesTotalsRow = document.createElement('tr');
  var storesTotal = document.createElement('th');
  storesTotal.textContent = 'Total';
  salesTotalsRow.appendChild(storesTotal);
  for (var i = 0; i < hours.length; i++) {
    var hourlyFooter = document.createElement('td');
    var hourlySalesTotal = Number();
    for (var j = 0; j < storeList.length; j++) {
      hourlySalesTotal += storeList[j].hourlyCookieSales[i];
    }
    hourlyFooter.textContent = hourlySalesTotal;
    salesTotalsRow.appendChild(hourlyFooter);
  }
  salesTable.appendChild(salesTotalsRow);
}

function grandTotalRender() {
  var grandSalesTotal = document.createElement('td');
  var grandTotal = Number();
  for (var i = 0; i < storeList.length; i++) {
    grandTotal += storeList[i].totalCookieSales;
  }
  grandSalesTotal.textContent = grandTotal;
  salesTable.lastChild.appendChild(grandSalesTotal);
  salesTable.appendChild(salesTable.lastChild);
}

function populateTable() {
  var operatingHours = getHours(storeHours);
  hourlyTabulationRender(operatingHours);
  for (var i = 0; i < storeList.length; i++) {
    storeList[i].salesDataRender(storeList[i], operatingHours);
  }
  hourlyTotalsRender(operatingHours);
  grandTotalRender();
}

var addStore = function (event) {
  event.preventDefault();
  var hourlyTotals = salesTable.lastChild;
  salesTable.removeChild(hourlyTotals);
  var operatingHours = getHours(storeHours);
  var newStore = new Store(event.target.storename.value, event.target.minhourcustomers.value, event.target.maxhourcustomers.value, event.target.avgcookiescustomer.value);
  newStore.salesDataRender(newStore, operatingHours);
  hourlyTotalsRender(operatingHours);
  grandTotalRender();
};

var hoursControl = function (event) {
  event.preventDefault();
  // storeHours = [event.target.openinghour.value, event.target.closinghour.value];
  while (salesTable.firstChild) {
    salesTable.removeChild(salesTable.firstChild);
  }
  storeHours = [event.target.openinghour.value, event.target.closinghour.value];
  populateTable();
};

populateTable();

submitStore.addEventListener('submit', addStore);
hoursChange.addEventListener('submit', hoursControl);
