let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;
let rollback = 50;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isNumber = (num) => {
    return (!isNaN(parseFloat(num)) && isFinite(num) && !(/\s/.test(num)))
}

const asking = () => {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки").trim();
    screens = prompt(
        "Какие типы экранов нужно разработать?",
        "Простые, Сложные, Интерактивные"
    );
    do {
        screenPrice = prompt("Сколько будет стоить данная работа?");
    }
    while (!isNumber(screenPrice));
    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const showTypeOf = (variable) => {
    console.log(variable, typeof variable);
}

function getTitle(str) {
    return str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
}

const getAllServicePrices = function () {
    let sum = 0;
    let price;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1){
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        }
        do {
            price = +prompt("Сколько это будет стоить?");
            sum += price;
        } while (!isNumber(price));
    }
    return +sum;
}

function getFullPrice(price1, price2) {
    return parseFloat(price1) + parseFloat(price2);
}

const getServicePercentPrice = function (sum, roll) {
    sum = sum;
    roll = roll;
    return (sum - (sum * (roll / 100)));
}

const getRollbackMessage = (price) => {
    showTypeOf(price);
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
}
asking();
title = getTitle(title);
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrice(fullPrice, rollback);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMessage(fullPrice));
console.log("Стоимость верстки экранов " + screenPrice + " юани и Стоимость разработки сайта " + fullPrice + " юани");