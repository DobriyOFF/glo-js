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

const showTypeOf = (variable) => {
    console.log(variable, typeof variable);
}

function getTitle(str) {
    str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
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

title = getTitle(title);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrice(fullPrice, rollback);

console.log("Тип title - " + showTypeOf(title));
console.log("Тип screenPrice - " + showTypeOf(screenPrice));
console.log("Тип adaptive - " + showTypeOf(adaptive));

console.log(getRollbackMessage(fullPrice));
console.log("Стоимость верстки экранов " + screenPrice + " юани и Стоимость разработки сайта " + fullPrice + " юани");