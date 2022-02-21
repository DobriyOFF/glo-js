const titleName = document.getElementsByTagName('h1')[0];

const btnHandler = document.getElementsByClassName('handler_btn');
const btnStart = btnHandler.start;
const btnReset = btnHandler.reset;

const btnPlus = document.querySelector('.screen-btn');

const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const rollbackInput = document.querySelector('.rollback input[type=range]')
const rollbackSpan = document.querySelector('.rollback span.range-value')

const total = document.getElementById('total')
const totalInput = document.getElementsByClassName('total-input')
const totalCount = document.getElementById("total-count");
const totalCountOther = document.getElementById("total-count-other");
const totalFullCount = document.getElementById("total-full-count");
const totalCountRollback = document.getElementById("total-count-rollback");
let screensInput = document.querySelectorAll('.screen');

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
    init: function () {
        this.addTitle();
        btnStart.addEventListener("click", () => this.start());
        btnReset.addEventListener("click", () => this.reset());
        btnPlus.addEventListener("click", () => this.addScreenBlock());
    
        screensInput.forEach((screen) => {
            this.addScreenEvents(screen);
        });

        this.updateRollback(this.rollback, true);
        rollbackInput.addEventListener("input", () => {
            this.updateRollback(rollbackInput.value);
            if (this.hasResult) {
                this.getServicePercentPrice();
                this.showResult();
            }
        });
    },
    addTitle: function () {
        document.title = titleName.textContent;
    },
    showResult: function () {
        totalInput.value = this.screenPrice;
        totalCount.value = this.count;
        totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
        totalFullCount.value = this.fullPrice;
        totalCountRollback.value = this.servicePercentPrice;
    },
    addScreens: function () {
        let isValid = true;
        screensInput.forEach((screen, index) => {
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
    
            this.screens.push({
                id: index,
                name: nameSelected,
                price: +select.value * +input.value,
            });
            this.count += +input.value;
        });
    
        if (!isValid) {
            this.screens = [];
            this.count = 0;
        }
        return isValid;
    },
    addServicesPercent: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
    
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            } else {
                delete this.servicesPercent[label.textContent];
            }
        });
      },
    addServicesNumber: function () {
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector("input[type=checkbox]");
            const label = item.querySelector("label");
            const input = item.querySelector("input[type=text]");
    
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            } else {
                delete this.servicesNumber[label.textContent];
            }
        });
      },
    addScreenBlock: function () {
        const lastIndex = screensInput.length - 1;
        const cloneScreen = screensInput[lastIndex].cloneNode(true);
    
        this.addScreenEvents(cloneScreen);
        screensInput[lastIndex].after(cloneScreen);
        screensInput = document.querySelectorAll(".screen");
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
        return str && str.trim().length > 0 && !this.isNoStrongNumber(str);
    },
    getFullPrice: function () {
        const screenPrice = this.screens.reduce(
            (screenPrice, screen) => screenPrice + screen.price, 0);
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = screenPrice + this.servicePricesNumber + this.servicePricesPercent; 
        this.getServicePercentPrice();
        this.hasResult = true;
    },
    getRollbackPrice: function () {
        this.rollbackPrice = (this.fullPrice * this.rollback) / 100;
    },
    getServicePercentPrice: function () {
        this.getRollbackPrice();
        this.servicePercentPrice = Math.ceil(this.fullPrice - this.rollbackPrice);
    },
    updateRollback: function (sizeRollback, needInit = false) {
        if (needInit) {
            rollbackInput.value = sizeRollback;
        }
        this.rollback = +sizeRollback;
        rollbackSpan.innerText = sizeRollback + "%";
    },
    start: function () {
        if (!this.addScreens()) {
            return false;
        }
        this.addServicesPercent();
        this.addServicesNumber();
        this.getFullPrice();
        if (this.hasResult) {
            this.disableControls();
            btnReset.style.display = "";
            btnStart.style.display = "none";
        }
        this.showResult();
    },
    reset: function () {
        this.screens = [];
        screensInput.forEach((item, index) => {
            if (index > 0) {
                item.remove();
            } else {
                item.querySelector("select").selectedIndex = 0;
                item.querySelector("input").value = "";
            }
        });
        screensInput = document.querySelectorAll(".screen");
        this.disableControls(false);
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.rollback = 50;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        otherItemsPercent.forEach((item) => {
            item.querySelector("input[type=checkbox]").checked = false;
        });
        otherItemsNumber.forEach((item) => {
            item.querySelector("input[type=checkbox]").checked = false;
        });
        this.updateRollback(this.rollback, true);
        this.fullPrice = 0;
        this.rollbackPrice = 0;
        this.servicePercentPrice = 0;
        this.count = 0;
        this.hasResult = false;

        [total, totalCount, totalCountOther, totalFullCount, totalCountRollback].forEach((item) => {
            item.value = "0";
        });

        btnReset.style.display = "none";
        btnStart.style.display = "";
    },
    disableControls: function (temp = true) {    
        screensInput.forEach((screen) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");
            select.disabled = temp;
            input.disabled = temp;
        });
    },
}

appData.init();