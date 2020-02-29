let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let button = document.getElementById("button");
let buttonStop = document.getElementById("button-stop");

let buttonRules = document.getElementById("button-rules");
let animationRules = document.getElementById("animation-rules");
let heightAnimationRules = animationRules.offsetHeight; //высота div'а с правилами игры
let widthAnimationRules = animationRules.offsetWidth; //ширина div'а с правилами игры
let buttonCloseRules = document.getElementById("close-rules");
let distanceLabel = document.getElementById("distance");
let distance = 0;
let fieldGameOver = document.getElementById("game-over");
let buttonNewGame = document.getElementById("button-new-game");
let distancePlayer = document.getElementById("distance-player");
let buttonSave = document.getElementById("button-save");
let buttonRecords = document.getElementById("button-records");
let tableRecords = document.getElementById("field-records");
let buttonCloseRecords = document.getElementById("close-records");
let writeTableRecords = document.getElementById("write-table-Records");
let buttonIpad = document.getElementById("wrapper-for-button-ipad");
let arrowLeftIpad = document.getElementById("arrow-left");
let arrowUpIpad = document.getElementById("arrow-up");
let arrowRightIpad = document.getElementById("arrow-right");
let arrowdownIpad = document.getElementById("arrow-down");

//кнопки для изображения правил
buttonCloseRules.style.left = widthAnimationRules/2 - buttonCloseRules.offsetWidth/2 + "px";
buttonCloseRules.style.top = heightAnimationRules - buttonCloseRules.offsetHeight +"px";

//изображения првил
animationRules.style.top = - heightAnimationRules*2 +"px";

//поле Game Over
fieldGameOver.style.height = canvas.offsetHeight/2 +"px";
fieldGameOver.style.top = - canvas.offsetHeight/2*3 +"px";
fieldGameOver.style.width = canvas.offsetWidth/2 + "px";
fieldGameOver.style.left = canvas.offsetWidth/4 + "px";
fieldGameOver.style.marginTop = canvas.offsetHeight/10 + "px"; 

//таблица рекордов
tableRecords.style.top = - canvas.offsetHeight*2 +"px";


Resize(); // при загрузке страницы задаётся размер холста
 
window.addEventListener("resize", Resize); //при изменении размеров окна будут меняться размеры холста
window.addEventListener("keydown", keyDown); //получение нажатий с клавиатуры
window.addEventListener("keyup", keyUp); //получение нажатий с клавиатуры
button.addEventListener("click", pushButton);
buttonStop.addEventListener("click", pauseGame);
buttonRules.addEventListener("click", showRules);
buttonCloseRules.addEventListener("click", closeRules);
buttonRecords.addEventListener("click", showRecords);
buttonCloseRecords.addEventListener("click", closeRecords);
buttonSave.addEventListener("click",  GameClose);
buttonNewGame.addEventListener("click",GameClose);
arrowLeftIpad.addEventListener("touchstart", touchStarLeft); //получение нажатий с клавиатуры
arrowUpIpad.addEventListener("touchstart", touchStarUp);
arrowRightIpad.addEventListener("touchstart", touchStarRight);
arrowdownIpad.addEventListener("touchstart", touchStarDown);
arrowLeftIpad.addEventListener("touchend", toushEnd);
arrowUpIpad.addEventListener("touchend", toushEnd);
arrowRightIpad.addEventListener("touchend", toushEnd);
arrowdownIpad.addEventListener("touchend", toushEnd);


function GameClose(){
    funcGameOverClose();
    storeInfo(); 
}

function closeRules (){
    animationRules.style.transform ='translateY(' + - 10 + 'px)';
}

function showRules (){
   animationRules.style.transform ='translateY(' + heightAnimationRules*2 + 'px)';
}

function funcGameOver (){
    distancePlayer.textContent = "Ваше расстояние: " + parseInt(distance);
    fieldGameOver.style.transform ='translateY(' + canvas.offsetHeight/2*3 + 'px)';
}

function funcGameOverClose(){
    fieldGameOver.style.transform ='translateY(' + - 10 + 'px)';
}

function showRecords(){
    tableRecords.style.transform ='translateY(' + canvas.offsetHeight*2 + 'px)';
}

function closeRecords (){
    tableRecords.style.transform ='translateY(' + - 10 + 'px)';
}

function pushButton(){
    start();
}

function pauseGame (){
    stop();
    soundBackground.stop();
}

function Resize() //задаю размер холста через JS -  равен размеру окна браузера
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;  
}

let speed = 5;
let scale =0.3;
let drift = 1;

function start(){
    soundBackground.clickSoundInit(); // важно "запустить" звук по событию, т.е. нажатию кнопки
    timer = setInterval(update,1000/50);
    
}

function stop (){
    clearInterval(timer); //останавлиавем обновление
}

function randomDiap(n, m){ //функция нужна для рандомной генерации машин
    return Math.floor(Math.random()*(m-n+1))+n;
}


let carViews = ["img/carBlue.png", "img/carOrange.png", "img/carYellow.png"];
let player = 0; //объект машинка, кот управляет игрок

let points = [canvas.width*0.17, canvas.width*0.28, canvas.width*0.36, canvas.width*0.5, canvas.width*0.75];
let times = [0, 0, 0, 0, 0];

function spawn (){ //функция необходима, чтобы машинки при появлении не наслаивались
    let index = randomDiap(0, points.length-1);
    let timeNow = new Date().getTime();
    let carKey = randomDiap(0, carViews.length - 1);
    let carView = carViews[carKey];
    if (timeNow - times[index] > 16000){
        times[index] = timeNow;
        return  objects.push(new Car(carView, points[index], randomDiap(200, 700) * -1, 30, 10));
       
    }
    return null;
    }

    

function update(){ //обновление игры
    roads[0].update(roads[1]);
    roads[1].update(roads[0]);
 
    spawn();

    objects[player].move(v, drift);

    soundBackground.playSound();

    let hasDead = false; //для удаления машинок

    for (let i = 0; i < objects.length; i++){ //проверка на выход за низ экрана
        if(i != player){
            objects[i].update();
            if (objects[i].dead){
                hasDead = true;
            }
        }
    }

    if (hasDead){
        objects.splice(1,1); // удаляю одну машинку с первой позиции (player = 0 позиция)
    }
    let hit = false;
    
    for (let i = 0; i < objects.length; i++){ //проверяем на столкновкние машинок
        if(i != player){
            hit = objects[player].collide(objects[i]);
            if (hit){
                vibro(false);
                soundBackground.stop();
                accident.playSound();
                funcGameOver(); 
                stop();
                break;
            }
        }
    }  

    draw();  

    distance += 0.2;
    distanceLabel.innerText = "distance: " + parseInt(distance);
}
class Sound{

    constructor(sound){
        this.sound = new Audio();
        this.sound.src = sound;
    }
    
    playSound(){
      this.sound.play();
    }

    stop(){
      this.sound.pause();
    }
    clickSoundInit() {
        this.sound.play(); // запускаем звук
        this.sound.pause(); // и сразу останавливаем
    }
  }

  let soundBackground = new Sound("sounds/background1.m4a");
  let accident = new Sound("sounds/accident.wav");

function draw(){//рисуем кадры с изображениями

    context.clearRect(0, 0, canvas.width, canvas.height); //очищаем кадр

    for (let i = 0; i< roads.length; i++){ //рисуем дорогу
        context.drawImage(
            roads[i].image, //Изображение для отрисовки
            0, //Начальное положение по оси X на изображении
            0, //Начальное положение по оси Y на изображении
            roads[i].image.width, //Ширина изображения
            roads[i].image.height, //Высота изображения
            roads[i].x, //Положение по оси X на холсте
            roads[i].y, //Положение по оси Y на холсте
            canvas.width, //Ширина изображения на холсте
            canvas.height
        );
    }

    for (let i = 0; i <objects.length; i++){ //рисую машинки
        context.drawImage (
            objects[i].image,
            0,
            0,
            objects[i].image.width,
            objects[i].image.height,
            objects[i].x,
            objects[i].y,
            objects[i].image.width*scale, //ширина машинки умноженная на масштаб
            objects[i].image.height*scale
        )
    }
}

let v;
function keyDown (e){

    switch(e.keyCode){
        case 37: //влево
        drift = -1;
        v = "x";
            break;
        case 38: //вверх
       v = "y";
        drift = -1;
            break;
        case 39: //вправо
        drift = 1;
        v = "x";
            break;
        case 40: //вниз
        v = "y";
        drift = 1;
       // objects[player].move("y", drift);
            break;
        case 27: //Esc
        if(timer == null){
            Start();
        }
        else{
            Stop();
        }
            break;
    }
} 

function keyUp (e){

    switch(e.keyCode){
        case 37: //влево
            drift = 0;
            break;
        case 38: //вверх
            drift = 0;
            break;
        case 39: //вправо
            drift = 0;
            break;
        case 40: //вниз
            drift = 0;
            break;
    }
} 

function touchStarLeft(e){ //влево
   e.preventDefault();
    drift = -1;
    v = "x";
}

function touchStarUp(e){ //вверх
    e.preventDefault();
    v = "y";
    drift = -1;
}

function touchStarRight(e){ //вправо
    e.preventDefault();
    drift = 1;
    v = "x";
}
function touchStarDown(e){ //вниз
    e.preventDefault();
    v = "y";
    drift = 1;
}

function toushEnd(e){
    e.preventDefault();
    drift = 0;
}


class Road{
    constructor(image, y){
        this.y = y;
        this.x = 0;
        this.image = new Image();
        this.image.src = image;
    }

    update(road){
        this.y += speed; //изображение смещается вниз при обновлении

        if (this.y > canvas.height){ //если изображение ушло вниз, то
            this.y = road.y - canvas.height + speed; //новое положение указывается с учётом второго фона
       }
    }
}

let roads = [ //массив с двумя изображениями фона
    new Road("img/road.jpg", 0),
    new Road("img/road.jpg", canvas.height)
    
];

class Car {

    constructor(image, x, y, colliderCoeffX, colliderCoeffY){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = image;
        this.dead = false; // чтобы удалять машинки, кот спустились вниз
        this.colliderCoeffX = colliderCoeffX; //что делать напуск при ударении по оси x
        this.colliderCoeffY = colliderCoeffY; //что делать напуск при ударении по оси y
        this.distance = 0;
        this.isPlayer = false;
    }


    update(){
        let faster = 0.1; //ускорение машин - препятсвий
        this.y += speed*faster; //машинка смещается вниз при обновлении
        if (this.y*faster > canvas.height){
            this.dead = true;
        }
    }

    move(v ,d){ // управление автомобилем
        if(v == "x"){ // перемещение по оси X
            this.x += d; //смещение
            
            if(this.x + this.image.width * scale > canvas.width){ //если при смещении объект выходит за края холста, то изменения откатываются 
                this.x -= d; 
            }
            if(this.x < 0){ //за край холста слева
                this.x = 0;
            }
        }
        else {
            this.y += d; //смещение по оси у
            if (this.y + this.image.height*scale > canvas.height){
               this.y -= d;
            }
            if (this.y < 0 ){
                this.y = 0;
            }
        }
    }

    collide(car){ //если машинки столкнулись
        let hit = false;

        if(this.y + this.colliderCoeffY*scale < car.y + car.image.height * scale - car.colliderCoeffY*scale && this.y + this.image.height*scale  - this.colliderCoeffY* scale > car.y + car.colliderCoeffY*scale){ //если машинки находятся на одной линии по горизонтали
    
            if(this.x + this.image.width * scale - this.colliderCoeffX *scale > car.x + car.colliderCoeffX *scale&& this.x  + this.colliderCoeffX*scale < car.x + car.image.width * scale - car.colliderCoeffX*scale){ //если машинки находятся на одной линии по вертикали
                hit = true;
            }
        }
        return hit;
    }
}

let objects = [ new Car("img/carplayer.jpg", canvas.width/2, canvas.height/2, 30, 15)]; //Массив машинок (машинка игрока)
objects[0].isPlayer = true;

function drawbg (){ //отрисовка поля игры до старта
    let imgbg = new Image();
    imgbg.onload = drawCVJ;
    imgbg.src = "img/road.jpg";

    function drawCVJ(){
        context.drawImage(imgbg,0, 0, canvas.width, canvas.height);
    } 
}
drawbg();

//использую вибрацию при ударении
function vibro(longFlag) {
    if ( navigator.vibrate ) { // есть поддержка Vibration API?
        if ( !longFlag )
            window.navigator.vibrate(100); // вибрация 100мс
        else
            window.navigator.vibrate([100,50,100,50,100]); // вибрация 3 раза по 100мс с паузами 50мс
    }
}

//испльзуем AJAX

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName = 'CHORBA_RACE_TABL_RECORDS';

function storeInfo (){
    updatePassword = Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        let result = JSON.parse(callresult.result);
        let info={
            name : document.getElementById("name-player").value,
            distanceP :  parseInt(distance),
        };
        result.push(info);
        
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(result), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }
}

function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);

    document.location.reload();
}

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        let result=JSON.parse(callresult.result); 

        writeTable(writeTableRecords, result);

    }
}

function compareDistance(a, b){
    return b.distanceP - a.distanceP;
}

function writeTable (elem, arr){
   arr.sort(compareDistance);
    let table = document.createElement('table');
    table.setAttribute('border', '1');

    let captionT = document.createElement('caption');
    captionT.textContent = 'ТАБЛИЦА РЕКОРДОВ';
    table.appendChild(captionT);
    let tbody = document.createElement('tbody');

    let tr = document.createElement('tr');
    tr.innerHTML = '<td>№</td><td>Имя</td><td>Расстояние</td>';
    tbody.appendChild(tr);
   
  
    for(let i = 1; i <= 10; i++){
        let tr = document.createElement('tr');
        tr.innerHTML ='<td>' + (i) + '</td>' + '<td>' + arr[i].name + '</td>' + '<td>' + arr[i].distanceP + '</td>';
            tbody.appendChild(tr);
         }
    table.appendChild(tbody);
    elem.appendChild(table);
    
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}

restoreInfo();
