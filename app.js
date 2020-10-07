'use strict';

var salesTable = document.getElementById('salesTable');
var storeHours = ['5am', '8pm'];
var operatingHours = getHours(storeHours);

function getHours(hours) {
  var openDayHalf = hours[0].substring(1);
  var closeDayHalf = hours[1].substring(1);
  var firstHour = Number(hours[0].charAt(0));
  var lastHour = Number(hours[1].charAt(0));
  var operatingHoursTotal = Number();
  var hourList = [];
  if ((openDayHalf === 'am' && closeDayHalf === 'pm') || (openDayHalf === 'pm' && closeDayHalf === 'am')) {
    operatingHoursTotal = (12 - firstHour) + (12 - (12 - lastHour)) + 1;
  } else if (((openDayHalf === 'pm' && closeDayHalf === 'pm') || (openDayHalf === 'am' && closeDayHalf === 'am')) && firstHour < lastHour) {
    operatingHoursTotal = (12 - (12 - lastHour)) - (12 - (12 - firstHour)) + 1;
  } else if (((openDayHalf === 'pm' && closeDayHalf === 'pm') || (openDayHalf === 'am' && closeDayHalf === 'am')) && firstHour > lastHour) {
    operatingHoursTotal = 24 - (((12 - (12 - firstHour)) - (12 - (12 - lastHour)))) + 1;
  }
  var operatingHour;
  for (var i = 0; i < operatingHoursTotal; i++) {
    if (openDayHalf === 'am') {
      if ((firstHour + i) <= 11) {
        operatingHour = `${firstHour + i}:00am`;
      } else {
        if ((firstHour + i) === 12) {
          operatingHour = `${firstHour + i}:00pm`;
        } else if ((firstHour + i) > 12 && (firstHour + i) <= 23) {
          operatingHour = `${(firstHour + i) - 12}:00pm`;
        } else if ((firstHour + i) > 23) {
          if ((firstHour + i) === 24) {
            operatingHour = `${(firstHour + i) / 2}:00am`;
          } else {
            operatingHour = `${(firstHour + i) - 24}:00am`;
          }
        }
      }
    } else if (openDayHalf === 'pm') {
      if ((firstHour + i) === 12) {
        operatingHour = `${firstHour + i}:00pm`;
      } else if ((firstHour + i) > 12 && (firstHour + i) <= 23) {
        operatingHour = `${(firstHour + i) - 12}:00pm`;
      } else if ((firstHour + i) > 23) {
        if ((firstHour + i) === 24) {
          operatingHour = `${(firstHour + i) / 2}:00am`;
        } else {
          operatingHour = `${(firstHour + i) - 24}:00am`;
        }
      }
    }
    hourList.push(operatingHour);
  }
  return hourList;
}

function getCustomersHourly(store) {
  return Math.floor(Math.random() * (store.maxHourlyCustomers - store.minHourlyCustomers + 1) + store.minHourlyCustomers);
}

function getCookieSalesHourly(store) {
  for (var i = 0; i < operatingHours.length; i++) {
    var hourCookieSales = Math.round(getCustomersHourly(store) * store.avgCustomerCookies);
    store.hourlyCookieSales.push(hourCookieSales);
    store.totalCookieSales += hourCookieSales;
  }
}

function Store(name = '', minHourlyCustomers = 0, maxHourlyCustomers = 0, avgCustomerCookies = 0, hourlyCookieSales = [], totalCookieSales = 0) {
  this.name = name;
  this.minHourlyCustomers = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.avgCustomerCookies = avgCustomerCookies;
  this.hourlyCookieSales = hourlyCookieSales;
  this.totalCookieSales = totalCookieSales;
  // storeList.push(this);
}

Store.prototype.dataRender = function (store) {
  getCookieSalesHourly(store);
  var salesRow = document.createElement('tr');
  var storeName = document.createElement('th');
  storeName.textContent = this.name;
  salesRow.appendChild(storeName);
  for (var j = 0; j < this.hourlyCookieSales.length; j++) {
    var hourlySales = document.createElement('td');
    hourlySales.textContent = this.hourlyCookieSales[j];
    salesRow.appendChild(hourlySales);
  }
  var dailyTotalSales = document.createElement('td');
  dailyTotalSales.textContent = this.totalCookieSales;
  salesRow.appendChild(dailyTotalSales);
  salesTable.appendChild(salesRow);
};

function hourlyTabulationRender() {
  var hoursRow = document.createElement('tr');
  var storeNameColumn = document.createElement('th');
  var dailyTotalSalesColumn = document.createElement('th');
  storeNameColumn.textContent = '';
  hoursRow.appendChild(storeNameColumn);

  for (var i = 0; i < operatingHours.length; i++) {
    var hourlyHeader = document.createElement('th');
    hourlyHeader.textContent = operatingHours[i];
    hoursRow.appendChild(hourlyHeader);
  }
  dailyTotalSalesColumn.textContent = 'Daily Location Total';
  hoursRow.appendChild(dailyTotalSalesColumn);
  salesTable.appendChild(hoursRow);
}

function hourlyTotalsRender() {
  var salesTotalsRow = document.createElement('tr');
  var storesTotal = document.createElement('th');
  storesTotal.textContent = 'Total';
  salesTotalsRow.appendChild(storesTotal);
  for (var i = 0; i < operatingHours.length; i++) {
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
  for (var k = 0; k < storeList.length; k++) {
    grandTotal += storeList[k].totalCookieSales;
  }
  grandSalesTotal.textContent = grandTotal;
  salesTable.lastChild.appendChild(grandSalesTotal);
  salesTable.appendChild(salesTable.lastChild);
}

var seattle = new Store('Seattle', 23, 65, 6.3);
var tokyo = new Store('Tokyo', 3, 24, 1.2);
var dubai = new Store('Dubai', 11, 38, 3.7);
var paris = new Store('Paris', 20, 38, 2.3);
var lima = new Store('Lima', 2, 16, 4.6);

// var storeList = [];
var storeList = [seattle, tokyo, dubai, paris, lima];

function populateTable() {
  hourlyTabulationRender();
  for (var s = 0; s < storeList.length; s++) {
    storeList[s].dataRender(storeList[s]);
  }
  hourlyTotalsRender();
  grandTotalRender();
}

populateTable();
