import p5 from "p5";
const p = new p5((sketch) => {
    sketch.setup = setup;
    sketch.keyPressed = keyPressed;
    sketch.draw = draw;
});



const BARS = 50;
let bars:number[] = [];
const width = 400;
const height = 400;
const barWidth = width/BARS;
const pixelPerNum = 400/50;
let sorted = false;
let sorting = false;
function setup() {
   p.createCanvas(400, 400);

    p.background("red");
    randomizeBars();
}
function randomizeBars(){
    bars = [];
    for(let i = 0; i<BARS;i++){
        let number = Math.floor(p.random(1,51));
        while(isAlreadyUsed(number,bars)){
            number = Math.floor(p.random(1,51));
        }
        bars.push(number);
    }
    sorted = false;
}
function isAlreadyUsed(number:number,bars:number[]):boolean{
    for(let i = 0; i<bars.length;i++){
        if(bars[i]===number){
            return true;
        }
    }
    return false;
}
function draw(){
    p.background("white");
    for(let i = 0; i<bars.length;i++){
        p.fill("black");
        p.rect(i*barWidth,height,barWidth,-height+bars[i]*pixelPerNum);
    }
      
}
function keyPressed(){
    if(p.key===" "&&!sorting){
        if(sorted){
            randomizeBars();
        }else if(!sorted){
            bubbleSort(bars);
        }
    }


    
}
async function bubbleSort(arr:number[]){
    let swapped = true;
     sorting = true;
    while(swapped){
        swapped = false;
        for(let i = 0; i<arr.length;i++){
            const j = i+1
            if(arr[i]<arr[j]){
                await sleep(1);
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                swapped = true
            }
        }
    }
    sorting = false;
    sorted = true;
}
function sleep(time:number){
    return new Promise(resolve=> setTimeout(resolve,time));
}