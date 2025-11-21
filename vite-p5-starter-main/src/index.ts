import p5 from "p5";

const p = new p5((sketch) => {
    sketch.setup = setup;
});

function setup() {
    p.createCanvas(400, 400);
    p.background("red");
}
