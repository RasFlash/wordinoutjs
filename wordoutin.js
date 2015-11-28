function WordsOutIn(where, words, delay, inWait, stop){
    //options start
    this.words=words || ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']; //words what will write
    this.delay=delay || 200; //how many milliseconds waiting two words write or delete between
    this.inWait=Math.round(inWait/delay) || 0; //if writed then how many milliseconds waititing
    this.where=where; //where will write
    this.stop=stop || false; //if true then timer will stop after write last word but if false then timer won't stop
    //options stop

    var base=new inTimer(this.where, this.words, this.inWait, this.stop);

    var timer=setInterval(function(){
        where.innerHTML=base.doing(timer);
    }, this.delay);
}

function inTimer(where, words, inWait, stop){
    this.wordCounter=0;
    this.db=0;
    this.wait=0;
    this.is=false;
    this.element=where.innerHTML;
    this.words=words;
    this.inWait=inWait;
    this.stop=stop;

    this.doing=function(timer){
        var wordCounter=this.wordCounter,
            db=this.db,
            wait=this.wait,
            is=this.is,
            element=this.element,
            words=this.words,
            inWait=this.inWait;

        if(db == words.length && !is && wait == 0){
            db = 0;
        }
        else if(element.length < words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
        }
        else if(element.length == words[db].length - 1 && !is && wait == 0){
            element += words[db][element.length];
            is = true;

            if(inWait==0) wait++;
            else if(this.stop){
                if(wordCounter<words.length) wordCounter++;
                else clearInterval(timer);
            }
        }
        else if(wait > 0){
            wait++;
            if(wait >= inWait){
                wait = 0;

                if(this.stop){
                    if(wordCounter < words.length - 1) wordCounter++;
                    else clearInterval(timer)
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
