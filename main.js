let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback = 50;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

let fullPrice = servicePrice1 + servicePrice2 + screenPrice;
console.log("Итоговая стоимость работ: " + fullPrice);

let servicePercentPrice = Math.ceil(fullPrice - rollback);
console.log("Итоговая стоимость за вычетом отката посреднику: " + servicePercentPrice);

if (fullPrice >= 30000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log("Даем скидку в 5%");
} else if (fullPrice < 15000 && fullPrice >= 0) {
    console.log("Скидка не предусмотрена");
} else if (fullPrice < 0) {
    console.log("Что то пошло не так");
}

console.log("тип title - " + typeof title);
console.log("тип fullPrice - " + typeof fullPrice);
console.log("тип adaptive - " + typeof adaptive);
console.log("длина строки screens - " + screens.length);
console.log("Стоимость верстки экранов " + (screenPrice) + " рублей/ долларов/гривен/юани");
console.log("Стоимость разработки сайта " + (fullPrice) + " рублей/ долларов/гривен/юани");
screens = screens.toLowerCase();
console.log(screens);

console.log(screens.split(", "));
console.log("rollback = " + rollback);
console.log("Процент отката посреднику за работу - "+ fullPrice * (rollback/100));


// function getRandomArbitrary(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }