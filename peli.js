let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let pisteet = 0;
let elamat = 3;

canvas.width = 400;
canvas.height = 400;

const pallero = {
    x: 200,
    y: 100,
    dx: 2,
    dy: 2,
    säde: 20,
    väri: "red"
};

const maila = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    width: 100,
    height: 10,
    väri: "blue",
    nopeus: 5
};

let keys = {};

document.addEventListener(
    "keydown",
    function(event) {
        keys[event.key] = true;
    }
);

document.addEventListener(
    "keyup",
    function(event) {
        delete keys[event.key];
    }
);

function piirräPisteet() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Pisteet: " + pisteet, 8, 20);
}

function piirräElamat() {
    context.font = "16px Arial";
    context.fillStyle = "#0095DD";
    context.fillText("Elämät: " + elamat, canvas.width - 75, 20);
}

function gameOver() {
    clearInterval(interval);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "24px Arial";
    context.fillStyle = "red";
    context.fillText("Game Over", 130, 180);
    context.font = "18px Arial";
    context.fillText("Pisteet: " + pisteet, 150, 220);
}

function piirrä() {
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    
    piirräPisteet();
    piirräElamat();

    context.beginPath();
    context.arc(
        pallero.x,
        pallero.y,
        pallero.säde,
        0,
        Math.PI * 2
    );
    context.fillStyle = pallero.väri;
    context.fill();
    context.closePath();

    context.beginPath();
    context.rect(
        maila.x,
        maila.y,
        maila.width,
        maila.height
    );
    context.fillStyle = maila.väri;
    context.fill();
    context.closePath();

    if (keys["ArrowLeft"]) {
        maila.x -= maila.nopeus;
    }
    if (keys["ArrowRight"]) {
        maila.x += maila.nopeus;
    }
    if (maila.x < 0) {
        maila.x = 0;
    }
    if (maila.x + maila.width > canvas.width) {
        maila.x = canvas.width - maila.width;
    }

    if (pallero.x + pallero.säde > canvas.width || pallero.x - pallero.säde < 0) {
        pallero.dx = -pallero.dx;
    }
    if (pallero.y - pallero.säde < 0) {
        pallero.dy = -pallero.dy;
    }

    if (pallero.y + pallero.säde > maila.y && pallero.x > maila.x && pallero.x < maila.x + maila.width) {
        pallero.dy = -pallero.dy;
        pallero.dx *= 1.05;
        pallero.dy *= 1.05;
        pisteet += 1;
    }
    
    if (pallero.y > canvas.height) {
        elamat--;
        if (elamat === 0) {
            gameOver();
        } else {
            pallero.x = Math.random() * 360 + 20;
            pallero.y = Math.random() * 150 + 50;
            pallero.dx = Math.random() < 0.5 ? -2 : 2;
            pallero.dy = 2;
        }
    }

    pallero.x += pallero.dx;
    pallero.y += pallero.dy;
}

let interval = setInterval(piirrä, 20);