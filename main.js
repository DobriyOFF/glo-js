<<<<<<< HEAD
let title = prompt("Как называется ваш проект?");
let screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 50;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
=======
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    rollback: 50,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    isNoStrongNumber: (num) => {
        num += "";
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    isNumber: function (num) {
        num += "";
        return appData.isNoStrongNumber(num) && num.trim().length == num.length;
    },    
    isText: function (str) {
        str += "";
        return str && str.trim().length > 0 && !appData.isNoStrongNumber(str);
    },
    getNumber: function (num) {
        return parseFloat(num);
    },
    asking: () => {
        do {
            appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки").trim();
        }
        while (!appData.isText(appData.title));
        
        for (let i = 0; i < 1; i++) {
            let name, price;
>>>>>>> lesson8

            do {
                name = prompt("Какой тип экрана нужно разработать?", "Сложные, Простые");
            } while (!appData.isText(name));
            name = name.trim();

<<<<<<< HEAD
function getTitle(str) {
    return (str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase());
}

const getAllServicePrices = function (price1, price2) {
    return price1 + price2;
    
}

function getFullPrice(price1, price2) {
    return price1 + price2;
}

const getServicePercentPrice = function (sum, roll) {
    return (sum - (sum * (roll / 100)));
}
=======
            do {
                price = +prompt("Сколько будет стоить данная работа?");
            }
            while (!appData.isNumber(price));
            price = appData.getNumber(price);

            appData.screens.push({id: i, name: name, price: price});
        }

        for (let i = 0; i < 2; i++) {
            let name, price;

            do {
                name = prompt("Какой дополнительный тип услуги нужен?");
              } while (!appData.isText(name));
            name = name.trim();

            do {
                price = +prompt("Сколько это будет стоить?");
                
            } while (!appData.isNumber(price));
            price = appData.getNumber(price);

            appData.services[name + "" + i] = +price;
        }   
>>>>>>> lesson8

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    getTitle: (str) => {
        appData.title = str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
    },
    getFullPrice: () => {
        const screenPrice = appData.screens.reduce(
            (sum, screen) => sum + screen.price, 0);
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
        appData.fullPrice = screenPrice + appData.allServicePrices;  
    },
    getServicePercentPrice: (sum, roll) => {
        sum = sum;
        roll = roll;
        appData.servicePercentPrice = (sum - (sum * (roll / 100)));
    },
    getRollbackMessage: (price) => {
        price = parseFloat(price);
        if (price >= 30000) {
            return "Даем скидку в 10%";
        } else if (price >= 15000 && price < 30000) {
            return "Даем скидку в 5%";
        } else if (price < 15000 && price >= 0) {
            return "Скидка не предусмотрена";
        } else if (price < 0) {
            return "Что то пошло не так";
        }
    },
    logger: () => {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
        // for (let key in appData) {
        //   console.log(key, typeof appData[key] === "function" ? "" : appData[key]);
        // }
    },
    start: () => {
        appData.asking(),
        appData.getTitle(appData.title),
        appData.getFullPrice(),
        appData.getServicePercentPrice(appData.fullPrice, appData.rollback),
        appData.logger();
    },
}

<<<<<<< HEAD
title = getTitle(title);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrice(fullPrice, rollback);

console.log("Тип title - " + showTypeOf(title));
console.log("Тип screenPrice - " + showTypeOf(screenPrice));
console.log("Тип adaptive - " + showTypeOf(adaptive));

console.log(getRollbackMessage(fullPrice));
console.log("Стоимость верстки экранов " + screenPrice + " юани и Стоимость разработки сайта " + fullPrice + " юани");
=======
appData.start();
>>>>>>> lesson8
