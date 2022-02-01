let title = "First project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 100;
let rollback = getRandomArbitrary(1, 100);
let fullPrice = 100000;
let adaptive = true;

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


function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}