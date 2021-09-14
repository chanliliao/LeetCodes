// Array
let arr = Array(amount).fill(0);
const dp = Array(amount1)
  .fill(0)
  .map(() => Array(amount2).fill(0));
arr.sort((a, b) => a - b);
arr.sort((a, b) => b - a);
arr.splice(start, deleteCount, item1);
arr.toString();
arr.reverse();
arr.join();

//String
const str = 'a';
str.replace(string, stringWith);
str.slice(beginIndex, endIndex);
str.split();
Number('100');
String(1);

// Map
let map = new Map();
map.set(key, value);
map.get(key);
map.delete(key);
map.size();
map.has(key);
map.keys();
map.values();
for (const [key, value] of map) {}
for (const key of map.keys()) {}
for (const value of map.values()) {}

// Set
let set = new Set();
set.add(value);
set.delete(value);
set.size();
set.has(value);
set.values();
for (const items of set) {
}

// Object	                            Map
// Not directly iterable	            Directly iterable
// Do not have a size property	      Have a size property
// Keys must be Strings (or Symbols)	Keys can be any datatype
// Keys are not well ordered	        Keys r ordered by insertion
// Have default keys	                Do not have default keys

// DOM
document.getElementById('someid');
document.getElementsByClassName('someclass');
document.getElementsByTagName('LI');
document.querySelector('.someclass');
document.querySelectorAll('div.note, div.alert');
var stored = document.getElementById('someid');
var children = stored.childNodes;
var parental = children.parentNode;
var newHeading = document.createElement('h1');
var newParagraph = document.createElement('p');
newHeading.appendChild(h1Text);
newParagraph.appendChild(pText);
firstHeading.classList.remove('foo');
firstHeading.classList.add('anotherclass');
newElement.addEventListener('click', logEventType);
newElement.removeEventListener('focus', logEventType);
// injecting css into html head
let styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
let styles = ``;
// create the event to click
let evt = new MouseEvent('click', {
  view: window,
  bubbles: true,
  cancelable: true,
});
// activate the click
cartButton.dispatchEvent(evt);
