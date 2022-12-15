var x1 = 0;
var y1 =0;
function onAnswer(res) {
    $('.button-form').attr('disabled', false);
    var timer = JSON.stringify(res);
    var data = JSON.parse(timer);
    localStorage.setItem(localStorage.length, timer);
    createTableRow(timer)
}

function createTableRow(data) {
    data = JSON.parse(data);
    let cls = "<tr class='miss'>";
    let result;
    if (data.hit === "Hit"){
        cls = "<tr class='hit'>";
    }
    result = cls; //check if hit or not
    result += `<td class='historyElem'>${data.x}</td>`;
    result += `<td class='historyElem' width="15%">${data.y}</td>`;
    result += `<td class='historyElem' width="15%">${data.r}</td>`;
    result += `<td class='historyElem' width="20%">${data.currentTime}</td>`;
    result += `<td class='historyElem' width="20%">${(parseFloat(data.scriptTime))} ms</td>`;
    result += `<td class='historyElem' width="15%">${data.hit}</td>`;
    result += "</tr>"
    historyBrowser.innerHTML = historyBrowser.innerHTML + result;

    let ans = data.hit;
    if (x1 !== 0 && y1 !== 0 && ans=== "Miss") {
        let ctx = canvas.getContext("2d");
        ctx.fillStyle="red";
        ctx.fillRect(x1, y1, 5, 5);
        x1 = 0;
        y1 = 0
    }
    else if(x1 !== 0 && y1 !== 0 && ans === "Hit"){
        let ctx = canvas.getContext("2d");
        ctx.fillStyle="green";
        ctx.fillRect(x1, y1, 5, 5);
        x1 = 0;
        y1 = 0
    }

    // console.log(document.getElementById("historyBrowser").offsetWidth)
    // console.log(document.getElementById("historyRow").offsetWidth)

}

var activeR =document.getElementById("R1");
var R = null;
funk1 = () => {
    var e = document.getElementById("R1");
    activeR.style.border = '0px solid red';
    activeR = e;
    e.style.border = '1px solid red';
    R = (document.querySelector("#R1").value);
    drawMath(document.querySelector("#R1").value);

}
funk2 = () => {
    var e = document.getElementById("R2");
    activeR.style.border = '0px solid red';
    activeR = e;
    e.style.border = '1px solid red';
    R = (document.querySelector("#R2").value);
    drawMath(document.querySelector("#R2").value);
}
funk3 = () => {
    var e = document.getElementById("R3");
    activeR.style.border = '0px solid red';
    activeR = e;
    e.style.border = '1px solid red';
    R = (document.querySelector("#R3").value);
    drawMath(document.querySelector("#R3").value);
}
funk4 = () => {
    var e = document.getElementById("R4");
    activeR.style.border = '0px solid red';
    activeR = e;
    e.style.border = '1px solid red';
    R = (document.querySelector("#R4").value);
    drawMath(document.querySelector("#R4").value);
}
funk5 = () => {
    var e = document.getElementById("R5");
    activeR.style.border = '0px solid red';
    activeR = e;
    e.style.border = '1px solid red';
    R = (document.querySelector("#R5").value);
    drawMath(document.querySelector("#R5").value);
}

document.querySelector("#forsubmit").onclick = startPHP;
document.querySelector("#forreset").onclick = clearHistory;

window.addEventListener("load", ()=>{
    if(R===null){
        const canvas = document.querySelector("#canvasMath");
        const  ctx = canvas.getContext("2d");
        var img =document.getElementById("math");
        ctx.drawImage(img, 0,0);
    }

});

const canvas = document.getElementById('canvasMath');
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    x1 = event.clientX - rect.left;
    y1 = event.clientY - rect.top;
    var x = 0;
    x = Math.round((event.clientX - rect.left -120)/40);
    const y = Number(-(event.clientY - rect.top -120)/40).toFixed(5);
    if (x <= 4 && x>=-4 && y>=-3 && y<=5){
        console.log("x: " + x + " y: " + y);
        console.log("x1: " + x1 + " y1: " + y1);
        // PUSH data
        document.querySelector("#X").value = x;
        document.querySelector("#Y").value = y;
        startPHP()
    }

}

canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function clearHistory() {
    R=null;
    activeR.style.border = '0px solid red';
    localStorage.clear();
    historyBrowser.innerHTML = "";
    const canvas = document.querySelector("#canvasMath");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    const  ctx = canvas.getContext("2d");
    var img =document.getElementById("math");
    ctx.drawImage(img, 0,0);
    movePoint(0, 0, 5);
}

function startPHP() {
    var X = (document.querySelector("#X").value);
    var Y = Number(document.querySelector("#Y").value);
    if(document.querySelector("#Y").value.length>9){
        Y = 7;
    }
    if (R === null || document.querySelector("#Y").value === "" || isNaN(Y)) {
        alert("Введите корректные данные");}
    else if(Y>5 || Y<-3){
        alert("Не более 6 цифр после запятой у переменно Y!"+'\n'+"Y должен быть не больше 5 и не меньше -3!");
    }
    else {
        $.ajax({
            type: 'POST',
            url: 'index',
            data: {
                "X": X,
                "Y": Y,
                "R": R
            },
            beforeSend: function () {
                $('.button-form').attr('disabled', 'disabled');
            },
            success:
            onAnswer,
            dataType: "json"
        });
    }
};

function onlyDigits() {
    var separator = this.dataset.separator;
    var replaced = new RegExp('[^\\d\\' + separator + '\\-]', "g");
    var regex = new RegExp('\\' + separator, "g");
    this.value = this.value.replace(replaced, "");

    var minValue = parseFloat(this.dataset.min);
    var maxValue = parseFloat(this.dataset.max);
    var val = parseFloat(separator == "." ? this.value : this.value.replace(new RegExp(separator, "g"), "."));
    if (minValue <= maxValue) {
        if (this.value[0] == "-") {
            if (this.value.length >= 8)
                this.value = this.value.substr(0, 8);
        } else {
            if (this.value.length >= 8)
                this.value = this.value.substr(0, 8);
        }

        if (minValue < 0 && maxValue < 0) {
            if (this.value[0] != "-")
                this.value = "-" + this.value[0];
        } else if (minValue >= 0 && maxValue >= 0) {
            if (this.value[0] == "-")
                this.value = this.value.substr(0, 0);
        }

        if (val < minValue || val > maxValue)
            this.value = this.value.substr(0, 0);

        if (this.value.match(regex))
            if (this.value.match(regex).length > 1) {
                this.value = this.value.substr(0, 0);
            }

        if (this.value.match(/\-/g))
            if (this.value.match(/\-/g).length > 1) {
                this.value = this.value.substr(0, 0);
            }
    }
}

document.querySelector(".number").onkeyup = onlyDigits;
const node = document.getElementsByClassName("number")[0];
node.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
    }
});

function drawMath(R){
    console.log("real R = " + R);
    R = R*40
    R = Math.floor(R);
    console.log("r = " + R);
    const testCan = document.getElementById("canvasMath");
    var context = testCan.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Треугольник
    context.fillStyle = "blue";
    context.beginPath();
    context.moveTo(120,120-R);
    context.lineTo(120+R,120);
    context.lineTo(120,120);
    context.fill();
    context.stroke();

    //Круг
    context.moveTo(120,120)
    context.arc(120, 120, R/2, Math.PI*0.5, Math.PI);
    context.lineTo(120,120)
    context.fill();
    context.stroke();

    //Прямоугольник
    context.beginPath();
    context.rect(120, 120, R, R);
    context.closePath();
    context.fill();
    context.stroke();

    //OXY
    context.lineWidth = 2; // толщина линии
    context.moveTo(0, 120); //передвигаем перо
    context.lineTo(240, 120); //рисуем линию
    context.lineWidth = 2; // толщина линии
    context.moveTo(120, 0); //передвигаем перо
    context.lineTo(120, 240); //рисуем линию
    context.stroke();





    // context.beginPath();
    // context.rect(120-(R/2), 120+R, R/2, R);
    // context.closePath();
    // context.fillStyle = "#0000FF";
    // context.fill();
    // context.stroke();

}