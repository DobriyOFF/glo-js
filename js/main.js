const titleName = document.getElementsByTagName('h1')[0];

const btnHandler = document.getElementsByClassName('handler_btn');
const btnStarts = btnHandler.start;
const btnReset = btnHandler.reset;

const btnPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rollbackInput = document.querySelector('.rollback input[type=range]')
const rollbackSpan = document.querySelector('.rollback span.range-value')

const totalInput = document.getElementsByClassName('total-input')
const totalCount = document.getElementById("total-count");
const totalCountOther = document.getElementById("total-count-other");
const totalFullCount = document.getElementById("total-full-count");
const totalCountRollback = document.getElementById("total-count-rollback");
let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    rollback: 50,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    rollbackPrice: 0,
    servicePercentPrice: 0,
    count: 0,
    hasResult: false,
    init: function() {
        appData.addTitle();
        btnStart.addEventListener("click", appData.start);
        btnReset.addEventListener("click", appData.reset);
        btnPlus.addEventListener("click", appData.addScreenBlock);
    
        screens.forEach((screen) => {
            appData.addScreenEvents(screen);
        });

        appData.updateRollback(appData.rollback, true);
        rollbackInput.addEventListener("input", () => {
            appData.updateRollback(rollbackInput.value);
            if (appData.hasResult) {
                appData.getServicePercentPrice();
                appData.showResult();
            }
        });
    },
    addTitle: function() {
        document.title = titleName.textContent;
    },
    showResult: function() {
        totalInput.value = appData.screenPrice;
        totalCount.value = appData.count;
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalFullCount.value = appData.fullPrice;
        totalCountRollback.value = appData.servicePercentPrice;
    },
    addScreens: function() {
        let isValid = true;
        screens.forEach((screen, index) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            const nameSelected = select.options[select.selectedIndex].textContent;
    
            if (select.selectedIndex === 0) {
                select.style.borderColor = "red";
                select.style.color = "red";
                isValid = false;
            }
            if (input.value === "") {
                input.style.borderColor = "red";
                input.style.color = "red";
                isValid = false;
            }
    
            appData.screens.push({
                id: index,
                name: nameSelected,
                price: +select.value * +input.value,
            });
            appData.count += +input.value;
        });
    
        if (!isValid) {
            appData.screens = [];
            appData.count = 0;
        }
        return isValid;
    },
    addServicesPercent: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
    
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            } else {
                delete appData.servicesPercent[label.textContent];
          }
        });
      },
    addServicesNumber: function () {
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
    
          if (check.checked) {
            appData.servicesNumber[label.textContent] = +input.value;
          } else {
            delete appData.servicesNumber[label.textContent];
          }
        });
      },
    addScreenBlock: function() {
        const lastIndex = screens.length - 1;
        const cloneScreen = screens[lastIndex].cloneNode(true);
    
        appData.addScreenEvents(cloneScreen);
        screens[lastIndex].after(cloneScreen);
        screens = document.querySelectorAll(".screen");
    },
    addScreenEvents: function (screen) {
        const select = screen.querySelector("select");
        const input = screen.querySelector("input");
    
        select.addEventListener("change", () => {
          select.style.borderColor = "";
          select.style.color = "";
        });
    
        input.addEventListener("input", () => {
          input.style.borderColor = "";
          input.style.color = "";
        });
    },
    isNoStrongNumber: (num) => {
        num += "";
        return !isNaN(parseFloat(num)) && isFinite(num);
    },
    isText: function (str) {
        str += "";
        return str && str.trim().length > 0 && !appData.isNoStrongNumber(str);
    },
    getFullPrice: () => {
        const screenPrice = appData.screens.reduce(
            (screenPrice, screen) => screenPrice + screen.price, 0);
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }
        appData.fullPrice = screenPrice + appData.servicePricesNumber + appData.servicePricesPercent; 
        appData.getServicePercentPrice();
        appData.hasResult = true;
    },
    getRollbackPrice: () => {
        appData.rollbackPrice = (appData.fullPrice * appData.rollback) / 100;
    },
    getServicePercentPrice: () => {
        appData.getRollbackPrice();
        appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.rollbackPrice);
    },
    updateRollback: function (sizeRollback, needInit = false) {
        if (needInit) {
          rollbackInput.value = sizeRollback;
        }
        appData.rollback = +sizeRollback;
        rollbackSpan.innerText = sizeRollback + "%";
    },
    start: () => {
        if (!appData.addScreens()) {
            return false;
        }
        appData.addServicesPercent();
        appData.addServicesNumber();
        appData.getFullPrice();
        if (appData.hasResult) {
            btnReset.style.display = "";
            btnStart.style.display = "none";
        }
        appData.showResult();
    },
    reset: function () {
        document.location.reload();
    },
}

appData.init();