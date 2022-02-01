let title = prompt("Как называется ваш проект?");
const screens = prompt(
    "Какие типы экранов нужно разработать?",
    "Простые, Сложные, Интерактивные"
);
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback = 50;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const showTypeOf = (variable) => {
    console.log(variable, typeof variable);
}

function getTitle(str) {
    str = str.toLowerCase();
    if (!str) return str;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            i++;
        } else {
            return str[i].toUpperCase() + str.slice(i + 1);
        } 
    }
}

const getAllServicePrices = function (price1, price2) {
    allServicePrices = price1 + price2;
    console.log(allServicePrices);
}

function getFullPrice(price1, price2) {
    fullPrice = price1 + price2;
    console.log(fullPrice);
}

const getServicePercentPrices = function (sum, roll) {
    servicePercentPrice = Math.ceil(sum - roll);
    console.log(servicePercentPrice);
}

const getRollbackMessage = (price) => {
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

getTitle(title);
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);
getAllServicePrices(servicePrice1, servicePrice2);
getFullPrice(screenPrice, allServicePrices);
getRollbackMessage(fullPrice);
getServicePercentPrices(fullPrice, rollback);