const book = document.querySelectorAll('.book');
const adv = document.querySelectorAll('.adv');
const elem = book[4].getElementsByTagName('a');
const description = document.querySelectorAll("ul > li");
let newLiElem = document.createElement("li");

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
adv[0].remove();
book[0].before(book[1]);
book[2].before(book[5]);
book[0].after(book[4]);
book[4].after(book[3]);

elem[0].innerHTML = 'Книга 3. this и <strong>Прототипы</strong> Объектов'

description[3].after(description[6]);
description[6].after(description[8]);
description[48].before(description[55]);
description[55].after(description[49]);
description[49].after(description[50]);
description[53].after(description[51]);

newLiElem.textContent = "Глава 8: За пределами ES6";
description[25].after(newLiElem);

console.log(description);
console.log(book);