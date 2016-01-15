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
function WordsOutIn(where, words, delay, inWait, stop)
{
    var helpers = new WOIHelpers();

    //options start
    this.where=where; //where will write
    this.words=words || ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']; //words what will write
    this.delay=delay=helpers.createDelayOrWaitArray(delay, this.words.length) || helpers.createDelayOrWaitArray(200, this.words.length); //how many milliseconds waiting two words write or delete between
    this.inWait=inWait=helpers.createDelayOrWaitArray(inWait, this.words.length) || helpers.createDelayOrWaitArray(0, this.words.length); //if writed then how many milliseconds waiting
    this.stop=stop || false; //if true then timer will stop after write last word but if false then timer won't stop
    //options stop

    var base = new inTimer(this.where, this.words, this.inWait, this.stop);

    var timer = setInterval(function()
    {
        where.innerHTML=base.doing(timer, delay);
    }, this.delay[0][0]);


    var timer=setInterval(function(){
        where.innerHTML=base.doing(timer);
    }, this.delay);

    this.stopping=function() {
        base.stopping(timer);
    }
}

function inTimer(where, words, inWait, stop)
{
    this.wordCounter=0;
    this.db=0;
    this.wait=0;
    this.is=false;
    this.element=where.innerHTML;
    this.words=words;
    this.inWait=inWait;
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
            inWait=this.inWait;

        var helpers = new WOIHelpers();

        if(db == words.length && !is && wait == 0){
            db = 0;
        }
        else if(element.length < words[db].length - 1 && !is && wait == 0){
            helpers.stopAndStartTimer(where, timer, delay, db, 0, this); 
            element += words[db][element.length];
        }
        else if(element.length == words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
            is = true;

            if(inWait!=0) wait++;
            else if(this.stop){
                if(wordCounter<words.length-1) wordCounter++;
                else this.stopping(timer);
            }
        }
        else if(wait > 0){
            wait++;
            if(wait >= inWait){
                wait = 0;

                helpers.stopAndStartTimer(where, timer, delay, db, 1, this); 

                if(this.stop){
                    if(wordCounter < words.length - 1) wordCounter++;
                    else this.stopping(timer)
                }
            }
        }
        else if(element.length == words[db].length && is && wait == 0){
            element = element.substr(0, element.length - 1);
        }
        else if(element.length < words[db].length && is && wait == 0){
            element = element.substr(0, element.length - 1);
            if(element.length == 0){
                is = false;
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

function WOIHelpers ()
{
    this.stopAndStartTimer = function (where, timer, delay, db, zeroOrOne, object) 
    {
        object.stopping(timer);
        
        timer = setInterval(function()
        {
            where.innerHTML=object.doing(timer, delay);
        }, delay[db][zeroOrOne]);
    };

    this.addNumbersToArray = function (array, number1, number2, start, stop)
    {
        for (var cv = start; cv < stop; cv++) {
            array[cv] = [number1, number2];
        }

        return array;
    };

    this.whichThrow = function (number)
    {
        switch(number){
            case 1: throw "Delay Type Error: 1st element"; break;
            case 2: throw "Delay Type Error: 2nd element"; break;
            case 3: throw "Delay Type Error: 3rd element"; break;
            default: throw "Delay Type Error: "+number+"th element"; break;
        }
    };

    this.changeNumbersInArray = function (array, arrayCount)
    {
        for (var cv = 0; cv < arrayCount; cv++) {
            if (typeof array[cv] === 'number') {
                array[cv] = [array[cv], array[cv]];
            }
            else if (Array.isArray(array[cv])) {
                var length=array[cv].length;

                if (length === 1 && typeof array[cv][0] === 'number') {
                    array[cv] = [array[cv][0], array[cv][0]];
                }
                else if(length === 2 && typeof array[cv][0] === 'number' && typeof array[cv][1] === 'number'){
                    //code...
                }
                else {
                    array = 200;
                    this.whichThrow(cv);
                }
            }
        }

        return array;
    };

    this.createDelayOrWaitArray = function (array, wordsLength)
    {
        if (typeof array === 'number') {
            var helper = array;
            array = [];
            array = this.addNumbersToArray(array, helper, helper, 0, wordsLength);
        }
        else if (Array.isArray(array)) {
            var arrayCount = array.length;
            this.changeNumbersInArray(array, arrayCount);

            var helper = [array[array.length-1][0], array[array.length-1][1]];
            array = this.addNumbersToArray(array, helper[0], helper[1], arrayCount, wordsLength);
        }
        else throw "Delay Type Error (not array or integer)";

        return array;
    };
}