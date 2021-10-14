window.onload = function(){
    console.log("Page Loaded")
    setRandomTileOrder(12);
    setTiles();
}



let i = 0;
let clicks;
let timeScore;


let startButton = document.getElementById("startGame")
startButton.addEventListener("click", startGame);

function startGame() {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
     console.log(randomOrderArray);
    startTimer();
}


document.getElementById('endGame').addEventListener("click", endGame);


function endGame() {
    function endTimer() {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    }
    randomOrderArray= [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
}


let randomOrderArray = [];
function setRandomTileOrder(numberOfTiles) {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random();
        randomNum = randomNum * (numberOfTiles -1);
        randomNum = Math.round(randomNum) + 1;

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    } 
}


const tiles = document.querySelectorAll(".gametile");

function setTiles(){
    for(tile of tiles){
        tile.innerHTML = randomOrderArray[i];
        i++;
    //replace numerical values with icon pairs

    if (tile.innerText < 3) {
        tile.innerHTML = rocket;
        tile.setAttribute("icon", "rocket")
    } else if (tile.innerHTML < 5) {
        tile.innerHTML = bacteria;
        tile.setAttribute("icon", "bacteria")
    } else if (tile.innerHTML < 7) {
        tile.innerHTML = cocktail;
        tile.setAttribute("icon", "cocktail")
    } else if (tile.innerHTML < 9) {
        tile.innerHTML = football;
        tile.setAttribute("icon", "football")
    } else if (tile.innerHTML < 11) {
        tile.innerHTML = pizza;
        tile.setAttribute("icon", "pizza")
    } else if (tile.innerHTML < 13) {
        tile.innerHTML = kiwi;
        tile.setAttribute("icon", "kiwi")
    } else {
        console.log("Error: too many tiles");
    }
}
}


let count;

function startTimer() {
    clearInterval(timer); 
    count = 60, timer = setInterval(function () {
        count = count--;
        document.getElementById("timer").firstChild.innerText = count--;

        
        if (count === 0) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
}


let football = `<i class="fas fa-football-ball"></i>`;
let mask = `<i class="fas fa-ufo"></i>`;
let pizza = `<i class="fas fa-pizza-slice"></i>`;
let lightning = `<i class="far fa-bolt"></i>`;
let bulb = `<i class="fal fa-lightbulb"></i>`;
let rocket = `<i class="fas fa-rocket"></i>`;
let bacteria = `<i class="fas fa-bacterium"></i>`;
let kiwi = `<i class="fas fa-kiwi-bird"></i>`;
let cocktail = `<i class="fas fa-cocktail"></i>`;


const selectedTile = ''
let tileIcon;
let tileIcons =[];
let tileIds =[];



tiles.forEach(tile => tile.addEventListener("click", displayTile));
let n = 0;

function displayTile(e) {
    
    
    this.classList.remove("hideTile");
    this.classList.add("displayTile");
        
    
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    let tileId = e.target.getAttribute("id");
    tileIds.push(tileId);
   
    

    countMoves()
    
    if(tileIcons.length % 2 == 0){
    checkMatch(tileIcons, tileIds,n)
    n = n+2;
    }
};

function checkMatch(tileIcons, tileIds,n){
    console.log(n);
    console.log(n+1);
        if(tileIcons[n] !== tileIcons[n+1]){
            console.log("no match");
            setTimeout(function(){
                    document.getElementById(tileIds[n+1]).classList.remove("displayTile");
                    document.getElementById(tileIds[n]).classList.remove("displayTile");
            }, 1000);  
        } else {
            console.log("match");
            console.log(n);
            document.getElementById(tileIds[n]).style.backgroundColor = "green";
            document.getElementById(tileIds[n+1]).style.backgroundColor = "green";
            document.getElementById(tileIds[n]).setAttribute("guess","correct")   
            document.getElementById(tileIds[n+1]).setAttribute("guess","correct")   
            document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
            document.getElementById(tileIds[n+1]).removeEventListener("click", displayTile); 
        }
}





function countMoves(){
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}


function clearTiles(){
    for(let n = 0; n < tiles.length; n++){
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
}


function calculateScore(){
    timeScore = parseInt(timeScore);
    let calculatedScore = (timeScore + clicks);
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
}

let newRGB;

function generateRGBVal() {

    function generateRandomColor() {
        let r = Math.random();
        r = r * 255;
        r = Math.round(r);
        return r;
    }

    let rgbValue = [];
    for (let i = 0; i <= 2; i++) {
        let singleVal = generateRandomColor();
        rgbValue.push(singleVal);
    }
    newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    return newRGB;
}


function resetTiles(){
    for(tile of tiles){
        tile.style.backgroundColor ="#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile"); 
        tile.classList.remove("displayTile"); 
        
    }
}


