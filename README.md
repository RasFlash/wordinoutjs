This write any words from array to screen and you need just one single line on JavaScript code. 
Inspireted me: [npmjs website](https://www.npmjs.org/) that my friend showed to me.

[Check it, try it](http://molnarland.github.io/)

###Tested in:
- Firefox
- Chrome
- Opera
- Edge
- Safari (in Windows)
- Windows Phone 8.1 Explorer
- Chrome in Android, Android Browser

How to use
=========
**Add to HTML's head:**
```html
<script type="text/javascript" src='/wordsoutin.min.js'></script>
```

**Create an element to body:**
```html
<h1 id='element'></h1>
```

**Create script tag to body's end and write this code:**
```javascript
var element=document.getElementById('element');
var words=['JavaScript', 'PHP', 'MySQL'];
var delay=100; //how many milliseconds waiting two words write or delete between
var inWait=3; //you can add that how many step wait after a word writed (delay*inWait=how many milliseconds wait, so 100*3=300 ms wait)
var color="green"; //you can add that what's colors type out
var stop=true; //if true then timer will stop after write last word but if false then timer won't stop

var WOI = new WordsOutIn(element, words, delay, inWait, stop); //call this object and running :)
```
