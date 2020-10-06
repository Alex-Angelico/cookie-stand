'use strict';

// function changeStoreData () {
//   var min = Number(prompt('Enter minimum hourly customers.'));
//   var max = Number(prompt('Enter maximum hourly customers.'));
//   var avg = Number(prompt('Enter average cookie number purchased per customer.'));

//   return min, max, avg;
// }


// openHour =[6, 'am'],
// closeHour =[7, 'pm'],
// operatingHours = totalHoursCalc(openHour, closeHour),

// function totalHoursCalc(open, close) {
//   var firstHour = open[0];
//   var lastHour = close[0];
//   var operating = Number();
//   if ((open[1] === 'am' && close[1] === 'pm') || (open[1] === 'pm' && close[1] === 'am')) {
//     operating = (12 - firstHour) + (12 - (12 - lastHour));
//   } else if (((open[1] === 'pm' && close[1] === 'pm') || (open[1] === 'am' && close[1] === 'am')) && firstHour < lastHour) {
//     operating = (12 - (12 - lastHour)) - (12 - (12 - firstHour));
//   } else if (((open[1] === 'pm' && close[1] === 'pm') || (open[1] === 'am' && close[1] === 'am')) && firstHour > lastHour) {
//     operating = 24 - (((12 - (12 - firstHour)) - (12 - (12 - lastHour))));
//   }
//   return operating;
// }

function hourConversion(hour, count) {
  if ((hour + count) <= 11) {
    hour = `${hour + count}am`;
  } else {
    if ((hour + count) === 12) {
      hour = `${hour + count}pm`;
    } else if ((hour + count) > 12 && (hour + count) <= 23) {
      hour = `${(hour + count) - 12}pm`;
    } else if ((hour + count) > 23) {
      if ((hour + count) === 24) {
        hour = `${(hour + count) / 2}am`;
      } else {
        hour = `${(hour + count) - 24}am`;
      }
    }
  }
  return hour;
}

var seattle = {
  //properties
  storeName: 'Seattle',
  minHourlyCustomers: 23,
  maxHourlyCustomers: 65,
  avgCustomerCookies: 6.3,
  dailyCookieSalesHourly: [],
  storeHours: [14, 6], // [total hours open, opening hour]

  //methods
  randomHourlyCustomers: function () {
    var min = Math.ceil(this.minHourlyCustomers);
    var max = Math.floor(this.maxHourlyCustomers);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getCookieSalesHourly: function () {
    for (var i = 0; i < this.storeHours[0]; i++) {
      var hourCookies = Math.round(this.randomHourlyCustomers() * this.avgCustomerCookies);
      this.dailyCookieSalesHourly.push(hourCookies);
    }
    return this.dailyCookieSalesHourly;
  },

  displayCookieSales: function (dayCookies) {
    var dailySalesStoreName = document.createElement('h2');
    var dailySalesTable = document.getElementById('seattle');
    var totalCookies = Number();

    dailySalesStoreName.textContent = this.storeName;
    dailySalesTable.appendChild(dailySalesStoreName);

    for (var i = 0; i < dayCookies.length; i++) {
      var startHour = this.storeHours[1];
      var dailySalesItem = document.createElement('li');
      startHour = hourConversion(startHour, i);
      dailySalesItem.textContent = `${startHour}: ${dayCookies[i]} cookies`;
      dailySalesTable.appendChild(dailySalesItem);
      totalCookies = totalCookies + dayCookies[i];
    }
    totalCookies = `Total: ${totalCookies} cookies`;
    var totalDailySales = document.createElement('li');
    totalDailySales.textContent = totalCookies;
    dailySalesTable.appendChild(totalDailySales);
  }
};

var tokyo = {
  //properties
  storeName: 'Tokyo',
  minHourlyCustomers: 3,
  maxHourlyCustomers: 24,
  avgCustomerCookies: 1.2,
  dailyCookieSalesHourly: [],
  storeHours: [14, 6], // [total hours open, opening hour]

  //methods
  randomHourlyCustomers: function () {
    var min = Math.ceil(this.minHourlyCustomers);
    var max = Math.floor(this.maxHourlyCustomers);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getCookieSalesHourly: function () {
    for (var i = 0; i < this.storeHours[0]; i++) {
      var hourCookies = Math.round(this.randomHourlyCustomers() * this.avgCustomerCookies);
      this.dailyCookieSalesHourly.push(hourCookies);
    }
    return this.dailyCookieSalesHourly;
  },

  displayCookieSales: function (dayCookies) {
    var dailySalesStoreName = document.createElement('h2');
    var dailySalesTable = document.getElementById('tokyo');
    var totalCookies = Number();

    dailySalesStoreName.textContent = this.storeName;
    dailySalesTable.appendChild(dailySalesStoreName);

    for (var i = 0; i < dayCookies.length; i++) {
      var startHour = this.storeHours[1];
      var dailySalesItem = document.createElement('li');
      startHour = hourConversion(startHour, i);
      dailySalesItem.textContent = `${startHour}: ${dayCookies[i]} cookies`;
      dailySalesTable.appendChild(dailySalesItem);
      totalCookies = totalCookies + dayCookies[i];
    }
    totalCookies = `Total: ${totalCookies} cookies`;
    var totalDailySales = document.createElement('li');
    totalDailySales.textContent = totalCookies;
    dailySalesTable.appendChild(totalDailySales);

  }
};

var dubai = {
  //properties
  storeName: 'Dubai',
  minHourlyCustomers: 11,
  maxHourlyCustomers: 38,
  avgCustomerCookies: 3.7,
  dailyCookieSalesHourly: [],
  storeHours: [14, 6], // [total hours open, opening hour]

  //methods
  randomHourlyCustomers: function () {
    var min = Math.ceil(this.minHourlyCustomers);
    var max = Math.floor(this.maxHourlyCustomers);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getCookieSalesHourly: function () {
    for (var i = 0; i < this.storeHours[0]; i++) {
      var hourCookies = Math.round(this.randomHourlyCustomers() * this.avgCustomerCookies);
      this.dailyCookieSalesHourly.push(hourCookies);
    }
    return this.dailyCookieSalesHourly;
  },

  displayCookieSales: function (dayCookies) {
    var dailySalesStoreName = document.createElement('h2');
    var dailySalesTable = document.getElementById('dubai');
    var totalCookies = Number();

    dailySalesStoreName.textContent = this.storeName;
    dailySalesTable.appendChild(dailySalesStoreName);

    for (var i = 0; i < dayCookies.length; i++) {
      var startHour = this.storeHours[1];
      var dailySalesItem = document.createElement('li');
      startHour = hourConversion(startHour, i);
      dailySalesItem.textContent = `${startHour}: ${dayCookies[i]} cookies`;
      dailySalesTable.appendChild(dailySalesItem);
      totalCookies = totalCookies + dayCookies[i];
    }
    totalCookies = `Total: ${totalCookies} cookies`;
    var totalDailySales = document.createElement('li');
    totalDailySales.textContent = totalCookies;
    dailySalesTable.appendChild(totalDailySales);

  }
};

var paris = {
  //properties
  storeName: 'Paris',
  minHourlyCustomers: 20,
  maxHourlyCustomers: 38,
  avgCustomerCookies: 2.3,
  dailyCookieSalesHourly: [],
  storeHours: [14, 6], // [total hours open, opening hour]

  //methods
  randomHourlyCustomers: function () {
    var min = Math.ceil(this.minHourlyCustomers);
    var max = Math.floor(this.maxHourlyCustomers);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getCookieSalesHourly: function () {
    for (var i = 0; i < this.storeHours[0]; i++) {
      var hourCookies = Math.round(this.randomHourlyCustomers() * this.avgCustomerCookies);
      this.dailyCookieSalesHourly.push(hourCookies);
    }
    return this.dailyCookieSalesHourly;
  },

  displayCookieSales: function (dayCookies) {
    var dailySalesStoreName = document.createElement('h2');
    var dailySalesTable = document.getElementById('paris');
    var totalCookies = Number();

    dailySalesStoreName.textContent = this.storeName;
    dailySalesTable.appendChild(dailySalesStoreName);

    for (var i = 0; i < dayCookies.length; i++) {
      var startHour = this.storeHours[1];
      var dailySalesItem = document.createElement('li');
      startHour = hourConversion(startHour, i);
      dailySalesItem.textContent = `${startHour}: ${dayCookies[i]} cookies`;
      dailySalesTable.appendChild(dailySalesItem);
      totalCookies = totalCookies + dayCookies[i];
    }
    totalCookies = `Total: ${totalCookies} cookies`;
    var totalDailySales = document.createElement('li');
    totalDailySales.textContent = totalCookies;
    dailySalesTable.appendChild(totalDailySales);

  }
};

var lima = {
  //properties
  storeName: 'Lima',
  minHourlyCustomers: 2,
  maxHourlyCustomers: 16,
  avgCustomerCookies: 4.6,
  dailyCookieSalesHourly: [],
  storeHours: [14, 6], // [total hours open, opening hour]

  //methods
  randomHourlyCustomers: function () {
    var min = Math.ceil(this.minHourlyCustomers);
    var max = Math.floor(this.maxHourlyCustomers);
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  getCookieSalesHourly: function () {
    for (var i = 0; i < this.storeHours[0]; i++) {
      var hourCookies = Math.round(this.randomHourlyCustomers() * this.avgCustomerCookies);
      this.dailyCookieSalesHourly.push(hourCookies);
    }
    return this.dailyCookieSalesHourly;
  },

  displayCookieSales: function (dayCookies) {
    var dailySalesStoreName = document.createElement('h2');
    var dailySalesTable = document.getElementById('lima');
    var totalCookies = Number();

    dailySalesStoreName.textContent = this.storeName;
    dailySalesTable.appendChild(dailySalesStoreName);

    for (var i = 0; i < dayCookies.length; i++) {
      var startHour = this.storeHours[1];
      var dailySalesItem = document.createElement('li');
      startHour = hourConversion(startHour, i);
      dailySalesItem.textContent = `${startHour}: ${dayCookies[i]} cookies`;
      dailySalesTable.appendChild(dailySalesItem);
      totalCookies = totalCookies + dayCookies[i];
    }
    totalCookies = `Total: ${totalCookies} cookies`;
    var totalDailySales = document.createElement('li');
    totalDailySales.textContent = totalCookies;
    dailySalesTable.appendChild(totalDailySales);
  }
};

var storeList = [seattle, tokyo, dubai, paris, lima];

// function populateTables() {
//   var tableSection = document.getElementById('salesTables');

//   for (var s = 0; s < storeList.length; s++) {
//     var dailySalesStoreName = document.createElement('h2');
//     var dailySalesTable = document.createElement('ul')
//     dailySalesStoreName.textContent = storeList[s].storeName;
//     tableSection.appendChild(dailySalesStoreName);
//     dailySalesTable.textContent = storeList[s].displayCookieSales(storeList[s].getCookieSalesHourly());
//     tableSection.appendChild(dailySalesTable);
//   }
// }

function populateTables() {
  for (var s = 0; s < storeList.length; s++) {
    storeList[s].displayCookieSales(storeList[s].getCookieSalesHourly());
  }
}

populateTables();
