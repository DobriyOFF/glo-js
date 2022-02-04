const isNumber = (num) => {
    return (!isNaN(parseFloat(num)) && isFinite(num) && !(/\s/.test(num)))
}

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    rollback: 50,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    asking: () => {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки").trim();
        appData.screens = prompt(
            "Какие типы экранов нужно разработать?",
            "Простые, Сложные, Интерактивные"
        );
        do {
            appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
        }
        while (!isNumber(appData.screenPrice));
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    getTitle: (str) => {
        return str.trim()[0].toUpperCase() + str.trim().substr(1).toLowerCase();
    },
    getAllServicePrices: () => {
        let sum = 0;
        let price;
        for (let i = 0; i < 2; i++) {
            if (i === 0) {
                appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            } else if (i === 1){
                appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
            }
            do {
                price = +prompt("Сколько это будет стоить?");
                
            } while (!isNumber(price)) {
                sum += price;
            }
        }   
        return +sum;
    },
    getFullPrice: (price1, price2) => {
        return parseFloat(price1) + parseFloat(price2);
    },
    getServicePercentPrice: (sum, roll) => {
        sum = sum;
        roll = roll;
        return (sum - (sum * (roll / 100)));
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
        for (let key in appData) {
          console.log(key, typeof appData[key] === "function" ? "" : appData[key]);
        }
      },
    start: () => {
        appData.asking();
        appData.title = appData.getTitle(appData.title),
        appData.allServicePrices = appData.getAllServicePrices(),
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices),
        appData.servicePercentPrice = appData.getServicePercentPrice(appData.fullPrice, appData.rollback),
        console.log(appData.getRollbackMessage(appData.fullPrice)),
        console.log("Стоимость верстки экранов " + appData.screenPrice + " юани и Стоимость разработки сайта " + appData.fullPrice + " юани")
        appData.logger();
      },
}

appData.start();