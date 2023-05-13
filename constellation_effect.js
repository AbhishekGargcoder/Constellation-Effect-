const canvas = document.getElementById("canvas1");
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log(ctx);
addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(getComputedStyle(canvas).getPropertyValue("height"));
console.log(getComputedStyle(canvas).getPropertyValue("width"));
let mouse = {
    x: 100,
    y: 100
};
let hue = 0;
canvas.addEventListener('click', (e) => {       // for click event listener on canvas
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 10; i++) {
        particleArray.push(new particle());
    }
})
canvas.addEventListener('mousemove', (e) => {        // for mouseclick listener on canvas
    mouse.x = e.x;
    mouse.y = e.y;
    for (let i = 0; i < 5; i++) {
        particleArray.push(new particle());
    }
})
const drawCircle = () => {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
    ctx.fill();
}
class particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 12 + 1;
        this.speedX = Math.random() * 3 - 1.5;    //  -1.5 to 1.5
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue},100%,50%)`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;       // decrease size for every frame of aniamtion
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);  // all are random values for all circle particles
        ctx.fill();
    }
};
const particleArray = [];
function handleParticles() {    // traverse through each cicle particle and draw it on the canvas
    for (let i = 0; i < particleArray.length; i++) {    //  O(n*(n-1)/2)
        particleArray[i].draw();
        particleArray[i].update();
        for (let j = i; j < particleArray.length; j++) {   // dont connect to previous particles as they are connected when their time has came
            const dx = particleArray[i].x - particleArray[j].x;
            const dy = particleArray[i].y - particleArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);   // with reference to pythagoras theorem 
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);  //  (from)start from current point axis 
                ctx.lineTo(particleArray[j].x, particleArray[j].y)    //(to) ends at destination coordinate axis
                ctx.stroke();
                ctx.closePath();  // recommend to practice
            }
        }
        if (particleArray[i].size <= 1) {   // toremove the element as soonas it loses its visible size
            particleArray.splice(i, 1);
            i--;
            console.log(particleArray);
        }
    }
}
//constellation effect where each particle is connecting to other particles within certain distance
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //  clear oldpaint from and to starting and ending coordinates resp.
    handleParticles();
    hue += 5;   // this is the speed at which it cycles through whole color spectrum for creating fading effect on particle starting from red.
    requestAnimationFrame(animate);   // goes infinite number of times
}
animate();