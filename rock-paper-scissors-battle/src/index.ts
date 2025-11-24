import p5 from 'p5';

const p = new p5((sketch) => {
  sketch.setup = setup;
  sketch.draw = draw;
  sketch.keyPressed = keyPressed;
});
const width = 600;
const height = 600;
let paused = false;
let gameOver = false;
const scissors: Circle[] = [];
const rocks: Circle[] = [];
const papers:Circle[] = [];
type Circle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
};
function setup() {
  p.createCanvas(width, height);
  p.background(0);
  createCircles(10,"rock");
  createCircles(10,"paper");
  createCircles(10,"scissors")
}
function draw() {
  drawGame();
  updateCircles();
  spliceCircles();
  if(!gameOver){

      checkWin();
  }
}
function keyPressed(){
    if(p.key ===" "){
        paused = !paused;
    }
}

function circleInCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < r1 + r2) {
    return true;
  }
  return false;
}
function drawGame() {
  p.background(255);
  p.noStroke();
  p.fill(167)
  p.textAlign("center","center");
  p.textSize(20)
  for (const circle of papers) {
    p.circle(circle.x, circle.y, circle.r * 2);
    p.text("📜",circle.x,circle.y)
  }

  for (const circle of rocks) {
    p.circle(circle.x, circle.y, circle.r * 2);
    p.text("🪨",circle.x,circle.y)
  }
  for(const circle of scissors){
    p.circle(circle.x, circle.y, circle.r * 2);

    p.text("✂️",circle.x,circle.y)
  }
  p.fill("black");
  p.noStroke();
  p.textSize(15);
  p.textAlign("left");
  p.text(`🪨: ${rocks.length}`,10,height-60)
  p.text(`📜: ${papers.length}`,10,height-40)
  p.text(`✂️: ${scissors.length}`,10,height-20)

}
function updateCircles() {
  if (!paused) {
    //rocks
    for (const circle of rocks) {
      circle.x += circle.vx;
      circle.y += circle.vy;

      if (circle.x - circle.r < 0 || circle.x + circle.r > width) {
        circle.vx *= -1;
      }
      if (circle.y - circle.r < 0 || circle.y + circle.r > height) {
        circle.vy *= -1;
      }}
      //papers
      for (const circle of papers) {
        circle.x += circle.vx;
        circle.y += circle.vy;

        if (circle.x - circle.r < 0 || circle.x + circle.r > width) {
          circle.vx *= -1;

        }
        if (circle.y - circle.r < 0 || circle.y + circle.r > height) {
          circle.vy *= -1;

        }
      }
      //scissors
         for (const circle of scissors) {
        circle.x += circle.vx;
        circle.y += circle.vy;

        if (circle.x - circle.r < 0 || circle.x + circle.r > width) {
          circle.vx *= -1;

        }
        if (circle.y - circle.r < 0 || circle.y + circle.r > height) {
          circle.vy *= -1;

        }
      }
    }
  }

function spliceCircles() {
  //compare papers and scissors
  for (let i = papers.length-1; i>=0; i--) {
    const paper = papers[i];
    for (let j = scissors.length-1;j>=0; j--) {
      const scissor = scissors[j];
      if (circleInCircle(paper.x, paper.y, paper.r, scissor.x, scissor.y, scissor.r)) {
  
        scissors.push({
          x:paper.x,
          y:paper.y,
          r:paper.r,
          vx:paper.vx,
          vy:paper.vy,
        })
        papers.splice(i,1);
      }
    }
  }
  //compare paper and rocks
    for (let i = rocks.length-1; i>=0; i--) {
    const rock = rocks[i];
    for (let j = papers.length-1;j>=0; j--) {
      const paper = papers[j];
      if (circleInCircle(rock.x, rock.y, rock.r, paper.x, paper.y, paper.r)) {
        papers.push({
          x:rock.x,
          y:rock.y,
          r:rock.r,
          vx:rock.vx,
          vy:rock.vy,
        })
        rocks.splice(i,1);
      }
    }
  }
  // compare scissors and rocks
      for (let i = rocks.length-1; i>=0; i--) {
    const rock = rocks[i];
    for (let j = scissors.length-1;j>=0; j--) {
      const scissor = scissors[j];
      if (circleInCircle(rock.x, rock.y, rock.r, scissor.x, scissor.y, scissor.r)) {
        rocks.push({
          x:scissor.x,
          y:scissor.y,
          r:scissor.r,
          vx:scissor.vx,
          vy:scissor.vy,
        })
        scissors.splice(j,1);
      }
    }
  }
}
function createCircles(amountOfCircles: number, color: string) {
  for (let i = 0; i < amountOfCircles; i++) {
    const r = 20
    if (color === 'scissors') {
      scissors.push({
        x: p.random(r, width - r),
        y: p.random(r, height - r),
        vx: p.random(-2, 2),
        vy: p.random(-2, 2),
        r: r,
      });
    }else if(color ==="rock"){
              rocks.push({
        x: p.random(r, width - r),
        y: p.random(r, height - r),
        vx: p.random(-2, 2),
        vy: p.random(-2, 2),
        r: r,
    });

      }
      else{
        papers.push({
        x: p.random(r, width -r),
        y: p.random(r, height - r),
        vx: p.random(-2, 2),
        vy: p.random(-2, 2),
        r: r,
        })
      }
    }
  }


function checkWin(){
    if((papers.length === 0&& rocks.length ===0)||(papers.length ===0 && scissors.length ===0)||(rocks.length ===0&&scissors.length ===0)){
        paused = true;
        gameOver  = true;
    }
}