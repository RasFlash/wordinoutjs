/*
*
* Created by Molnár Roland
* From Hungary
* Inspireted: npmjs's webpage :)
*
* Github: https://github.com/molnarland
* Twitter: @molnarland
*
*/
function WordsOutIn(where, words, delay, inWait, color, stop)
{
    //options start
    this.where=where; //where will write
    this.words=words || ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']; //words what will write
    this.delay=delay=inTimer.createDelayOrWaitArray(delay, this.words.length, 'number') || inTimer.createDelayOrWaitArray(200, this.words.length, 'number'); //how many milliseconds waiting two words write or delete between
    this.inWait=inWait=inTimer.createDelayOrWaitArray(inWait, this.words.length, 'number') || inTimer.createDelayOrWaitArray(0, this.words.length, 'number'); //if writed then how many milliseconds waiting
    this.colors=color=inTimer.createDelayOrWaitArray(color, this.words.length, 'string') || inTimer.createDelayOrWaitArray(false, this.words.length, 'string');
    this.stop=stop || false; //if true then timer will stop after write last word but if false then timer won't stop
    //options stop

    inTimer.changeFontColor(this.where, this.colors[0][0]);

    var base = new inTimer(this.where, this.words, this.inWait, this.colors, this.stop);

    var timer = setInterval(function()
    {
        where.innerHTML=base.doing(timer, delay);
    }, this.delay[0][0]);

    this.stopping=function() {
        base.stopping(timer);
    }
}

function inTimer(where, words, inWait, colors, stop)
{
    this.wordCounter=0;
    this.db=0;
    this.wait=0;
    this.is=false;
    this.where=where;
    this.element=where.innerHTML;
    this.words=words;
    this.inWait=inWait;
    this.colors=colors;
    this.stop=stop;

    this.stopping=function(timer)
    {
        clearInterval(timer);
    };

    this.doing=function(timer, delay){
        var wordCounter=this.wordCounter,
            db=this.db,
            wait=this.wait,
            is=this.is,
            element=this.element,
            words=this.words,
            inWait=this.inWait,
            colors=this.colors;


        if(db == words.length && !is && wait == 0){
            db=0;
        }
        else if (element.length == 0 && is==null && wait == 0) {
            timer=inTimer.stopAndStartTimer(where, timer, delay, inWait[db][0], this);
            inTimer.changeFontColor(this.where, colors[db][0]);
            wait++;
        }
        else if (element.length == 0 && is==null && wait > 0) {
            if(wait >= 1){
                wait=0;
                is=false;
                timer=inTimer.stopAndStartTimer(where, timer, delay, delay[db][0], this);
            }
            else wait++;
        }
        else if(element.length < words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
        }
        else if(element.length == words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
            is = true;

            if(inWait[db][1]!=0){ 
                timer=inTimer.stopAndStartTimer(where, timer, delay, inWait[db][1], this);
                inTimer.changeFontColor(this.where, colors[db][1]);
                wait++;
            }
            else if(this.stop){
                if(wordCounter < words.length-1) wordCounter++;
                else this.stopping(timer);
            }
        }
        else if(wait > 0){
            if(wait >= 1){
                wait=0;
                timer=inTimer.stopAndStartTimer(where, timer, delay, delay[db][1], this);
            }
            else wait++;
        }
        else if(element.length == words[db].length && is && wait == 0){
            element = element.substr(0, element.length - 1);
        }
        else if(element.length < words[db].length && is && wait == 0){
            element = element.substr(0, element.length - 1);
            if(element.length == 0){
                is = null;
                db++;
            }
        }

        this.wordCounter=wordCounter;
        this.db=db;
        this.wait=wait;
        this.is=is;
        this.element=element;
        this.words=words;
        this.inWait=inWait;

        return element;
    };
}


inTimer.stopAndStartTimer = function (where, timer, delay, time, object) 
{
    object.stopping(timer);
    
    timer = setInterval(function()
    {
        where.innerHTML=object.doing(timer, delay);
    }, time);
};

inTimer.addElementToArray = function (array, element1, element2, start, stop)
{
    for (var cv = start; cv < stop; cv++) {
        array[cv] = [element1, element2];
    }

    return array;
};

inTimer.whichThrow = function (number)
{
    switch(number){
        case 1: throw "Delay Type Error: 1st element"; break;
        case 2: throw "Delay Type Error: 2nd element"; break;
        case 3: throw "Delay Type Error: 3rd element"; break;
        default: throw "Delay Type Error: "+number+"th element"; break;
    }
};

inTimer.changeElementInArray = function (array, arrayCount, type)
{
    for (var cv = 0; cv < arrayCount; cv++) {
        if (typeof array[cv] === type) {
            array[cv] = [array[cv], array[cv]];
        }
        else if (Array.isArray(array[cv])) {
            var length=array[cv].length;
            if (length === 1 && typeof array[cv][0] === type) {
                array[cv] = [array[cv][0], array[cv][0]];
            }
            else if(length === 2 && typeof array[cv][0] === type && typeof array[cv][1] === type){
                //code...
            }
            else {
                array = 200;
                inTimer.whichThrow(cv);
            }
        }
    }

    return array;
};

inTimer.createDelayOrWaitArray = function (array, wordsLength, type)
{
    if (typeof array === type) {
        var helper = array;
        array = [];
        array = inTimer.addElementToArray(array, helper, helper, 0, wordsLength);
    }
    else if (Array.isArray(array)) {
        var arrayCount = array.length;

        inTimer.changeElementInArray(array, arrayCount, type);

        var helper = [array[array.length-1][0], array[array.length-1][1]];
        array = inTimer.addElementToArray(array, helper[0], helper[1], arrayCount, wordsLength);
    }
    else throw "Error in WOIHelpers.createDelayOrWaitArray()";

    return array;
};

inTimer.changeFontColor = function (where, color) {
    if (color !== false) where.style.color=color;
};