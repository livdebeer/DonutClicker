console.log("Welcome");
let donutClass = "clicked";
//functie van https://stackoverflow.com/questions/4209052/how-to-read-get-request-using-javascript
// geantwoord op 17 nov 2010 door Evan Mulawski

function getQueryVariable(variable)
{ 
  var query = window.location.search.substring(1); 
  var vars = query.split("&"); 
  for (var i=0;i<vars.length;i++)
  { 
    var pair = vars[i].split("="); 
    if (pair[0] == variable)
    { 
      return pair[1]; 
    } 
  }
  return -1; 
}

// maak 2 contante variabelen aan voor de naam en de kleur die meegegeven waren in de url
const naam = getQueryVariable('name');
const kleur = getQueryVariable('donut');

// als de naam niet is meegegeven of de naam is een lege string: stuur de persoon terug
if(naam == -1 || naam == '') {
  //stuur persoon terug
  window.location.replace('index.html');
}

//maak een lijst met alle legale kleuren
const legaleKleuren = ['blauwe', 'roze', 'gele', 'groene', 'paarse', 'rode'];
// als de kleur niet is meegegeven of de kleur zit niet (!) wel (includes) in de legale kleuren lijst.
if(kleur == -1 || !legaleKleuren.includes(kleur)) {
  //stuur persoon terug // uitroepteken is NOT // bars|| is or
  window.location.replace('index.html');
}
// pas de naam aan
document.getElementById('bakkerijnaam').innerHTML = naam + "'s Donut Bakery";

const donut_div = document.getElementById('donut');
//past de css van de  background van de donut aan met de file naam van: "/images/{kleur}-donut.png" {} haalt uit en veranderd
donut_div.style.backgroundImage = 'url("images/'+ kleur +'-donut.png ")';
donut_div.style.backgroundColor = 'transparent';
donut_div.style.backgroundSize = 'cover';
donut_div.style.backgroundRepeat = 'no-repeat';
donut_div.style.backgroundPosition = 'center';


//Hoeveel donuts de persoon heeft
let aantalDonuts = 0

//waarde wordt het getal wat je in changeDonut stopt
function changeDonut(waarde){
  aantalDonuts += waarde;
  document.getElementById('aantalDonuts').innerHTML = aantalDonuts;
}

// dictionary key and value
// bijv kleurenPerObject["farm"] geeft "#FFB500"
let alleObjecten = ["farm", "baker", "policeman", "factory", "temple", "cool", "special", "legendary", "rotate"]
let kleurenPerObject = {"default" : "#ababab", "farm" : '#FFB500', "baker" : '#C4A484', "policeman" : '#9bb1cb', "factory" : '#d3d3d1', "temple" : '#e57b38', "cool": '#8debf4', "special":'#8debf4', "legendary":'#8debf4', "rotate" : '#8debf4'};
let prijsPerObject = {"farm" : 100, "baker" : 300, "policeman" : 1000, "factory" : 5000, "temple" : 10000, "cool": 1000, "special": 10000, "legendary": 20000, "rotate" : 4000};
// Als de change color knop wordt ingedrukt
function changeColorButton(){
  //Code in for-loop runt voor elk object (met de variabele object als de naam van dit object)
  for (let i = 0; i < alleObjecten.length; i += 1) {
    let objectNaam = alleObjecten[i];
    let objectPrijs = prijsPerObject[objectNaam];
    let objectKleur = kleurenPerObject[objectNaam];
    //als donuts > dan prijs van het object: maak de kleur de object kleur
    if(aantalDonuts >= objectPrijs) {
      document.getElementById(objectNaam).style.backgroundColor = kleurenPerObject[objectNaam]
    }
    else if(aantalDonuts < objectPrijs){
      document.getElementById(objectNaam).style.backgroundColor = kleurenPerObject['default'];
    }
  } 
}


//waarde is donutsPerClick is dus 1
let donutsPerClick = 1;

function clickDonut(){
  changeDonut(donutsPerClick);
  donut_div.classList.add(donutClass);
  setTimeout(() => {donut_div.classList.remove(donutClass);}, 300);
  changeColorButton(); //?
}

donut_div.onclick = clickDonut;


let isColorCoolBought = false;
let isColorSpecialBought = false;
let isColorLegendaryBought = false;

const coolButton = document.getElementById('cool');
const specialButton = document.getElementById('special');
const legendaryButton = document.getElementById('legendary');


function clickColorCool(){
  if (!isColorCoolBought && aantalDonuts >= prijsPerObject["cool"]) {
    //splice from: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    //by: Justin Liu Jun 29 2022
    const index = alleObjecten.indexOf("cool");
    if (index > -1) { // only splice array when item is found
      alleObjecten.splice(index, 1); // 2nd parameter means remove one item only
    }

    changeDonut(-prijsPerObject["cool"]);
    document.body.style.backgroundImage = 'url("images/forest.jpeg")';
    isColorCoolBought = true;
    coolButton.disabled = true;
    coolButton.textContent = 'Purchased Forest';
    changeColorButton();
    coolButton.classList.add("clicked2");
    setTimeout(() => {coolButton.classList.remove("clicked2");}, 300);
  }
  if (isColorCoolBought) {  
    document.getElementById("aantalDonuts").style.color = "black";
    document.body.style.backgroundImage = 'url("images/forest.jpeg")';
    coolButton.style.backgroundColor = '#01bc01';

    legendaryButton.style.backgroundColor = '#008000';
    specialButton.style.backgroundColor = '#008000';

    changeColorButton();
    coolButton.classList.add("clicked2");
    setTimeout(() => {coolButton.classList.remove("clicked2");}, 300);
  }
}

coolButton.onclick = clickColorCool;


function buyColorSpecial(){
  if (!isColorSpecialBought && aantalDonuts >= prijsPerObject["special"]) {
    //splice from: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    //by: Justin Liu Jun 29 2022
    const index = alleObjecten.indexOf("special");
    if (index > -1) { // only splice array when item is found
      alleObjecten.splice(index, 1); // 2nd parameter means remove one item only
    }

    changeDonut(-prijsPerObject["special"]);
    document.body.style.backgroundImage = 'url("images/moon.jpeg")';
    isColorSpecialBought = true;
    specialButton.disabled = true;
    specialButton.textContent = 'Purchased Moon';
    changeColorButton();
    specialButton.classList.add("clicked2");
    setTimeout(() => {specialButton.classList.remove("clicked2");}, 300);
  }
  if (isColorSpecialBought) {  
    document.getElementById("aantalDonuts").style.color = "white";
    document.body.style.backgroundImage = 'url("images/moon.jpeg")';
    specialButton.style.backgroundColor = '#01bc01';

    legendaryButton.style.backgroundColor = '#008000';
    coolButton.style.backgroundColor = '#008000';

    changeColorButton();
    specialButton.classList.add("clicked2");
    setTimeout(() => {specialButton.classList.remove("clicked2");}, 300);
  }
}

specialButton.onclick = buyColorSpecial;


function buyColorLegendary(){
  if (!isColorLegendaryBought && aantalDonuts >= prijsPerObject["legendary"]) {
    //splice from: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    //by: Justin Liu Jun 29 2022
    const index = alleObjecten.indexOf("legendary");
    if (index > -1) { // only splice array when item is found
      alleObjecten.splice(index, 1); // 2nd parameter means remove one item only
    }

    changeDonut(-prijsPerObject["legendary"]);
    document.body.style.backgroundImage = 'url("images/legendary.gif")';
    isColorLegendaryBought = true;
    legendaryButton.disabled = true;
    legendaryButton.textContent = 'Purchased Trippy';
    changeColorButton();
    legendaryButton.classList.add("clicked2");
    setTimeout(() => {legendaryButton.classList.remove("clicked2");}, 300);
  }
  if (isColorLegendaryBought) {  //als je er nog een keer op klikt na het kopen
    document.getElementById("aantalDonuts").style.color = "black";
    document.body.style.backgroundImage = 'url("images/legendary.gif")';
    legendaryButton.style.backgroundColor = '#01bc01';

    specialButton.style.backgroundColor = '#008000';
    coolButton.style.backgroundColor = '#008000';

    changeColorButton();
    legendaryButton.classList.add("clicked2");
    setTimeout(() => {legendaryButton.classList.remove("clicked2");}, 300);
  }
}

legendaryButton.onclick = buyColorLegendary;


let aantalFarms = 0;
let aantalBakers = 0;
let aantalPolice = 0;
let aantalFactory = 0;
let aantalTemple = 0;

const farmButton = document.getElementById('farm');
const bakerButton = document.getElementById('baker');
const policemanButton = document.getElementById('policeman');
const factoryButton = document.getElementById('factory');
const templeButton = document.getElementById('temple');

function buyFarm(){
  if (aantalDonuts >= prijsPerObject["farm"]) {
    aantalFarms += 1;
    changeDonut(-prijsPerObject["farm"]);
    donutsPerClick += 1;
    updateBought();
    farmButton.classList.add("clicked2");
    setTimeout(() => {farmButton.classList.remove("clicked2");}, 300);
    changeColorButton();
  }
}

farmButton.onclick = buyFarm;


function buyBaker(){
  if (aantalDonuts >= prijsPerObject["baker"]) {
    aantalBakers += 1;
    changeDonut(-prijsPerObject["baker"]);
    donutsPerClick += 5;
    updateBought();
    bakerButton.classList.add("clicked2");
    setTimeout(() => {bakerButton.classList.remove("clicked2");}, 300);
    changeColorButton();
  }
}

bakerButton.onclick = buyBaker;


function buyPoliceman(){
  if (aantalDonuts >= prijsPerObject["policeman"]) {
    aantalPolice += 1;
    changeDonut(-prijsPerObject["policeman"]);
    donutsPerClick += 20;
    updateBought();
    policemanButton.classList.add("clicked2");
    setTimeout(() => {policemanButton.classList.remove("clicked2");}, 300);
    changeColorButton();
  }
}

policemanButton.onclick = buyPoliceman;


function buyFactory(){
  if (aantalDonuts >= prijsPerObject["factory"]) {
    aantalFactory += 1;
    changeDonut(-prijsPerObject["factory"]);
    donutsPerClick += 60;
    updateBought();
    factoryButton.classList.add("clicked2");
    setTimeout(() => {factoryButton.classList.remove("clicked2");}, 300);
    changeColorButton();
  }
}

factoryButton.onclick = buyFactory;


function buyTemple(){
  if (aantalDonuts >= prijsPerObject["temple"]) {
    aantalTemple += 1;
    changeDonut(-prijsPerObject["temple"]);
    donutsPerClick += 200;
    updateBought();
    templeButton.classList.add("clicked2");
    setTimeout(() => {templeButton.classList.remove("clicked2");}, 300);
    changeColorButton();
  }
}

templeButton.onclick = buyTemple;


function updateBought() {
  document.getElementById('farmsbought').innerHTML = 'Bought: ' + aantalFarms
  document.getElementById('bakerbought').innerHTML = 'Bought: ' + aantalBakers
  document.getElementById('policebought').innerHTML = 'Bought: ' + aantalPolice
  document.getElementById('factorybought').innerHTML = 'Bought: ' + aantalFactory
  document.getElementById('templebought').innerHTML = 'Bought: ' + aantalTemple
}

let isRotateBought = false
const rotateButton = document.getElementById('rotate')
let isRotating = true

function buyRotate(){
  if (!isRotateBought && aantalDonuts >= prijsPerObject["rotate"]) {
    //splice from: https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
    //by: Justin Liu Jun 29 2022
    const index = alleObjecten.indexOf("rotate");
    if (index > -1) { // only splice array when item is found
      alleObjecten.splice(index, 1); // 2nd parameter means remove one item only
    }

    changeDonut(-prijsPerObject["rotate"]);
    isRotateBought = true;
    rotateButton.disabled = true;
    rotateButton.textContent = 'Purchased Rotate';
    changeColorButton();
    rotateButton.classList.add("clicked2");
    setTimeout(() => {rotateButton.classList.remove("clicked2");}, 300);
    const donut_div = document.getElementById('donut');
    donutClass = "clickedMetRotate";
    rotateButton.style.backgroundColor = '#01bc01';
  }
  else if (isRotateBought) {  
    const donut_div = document.getElementById('donut');
    if(isRotating){
      isRotating = false;
      donutClass = "clicked";
      rotateButton.style.backgroundColor = '#008000';
    }else{
      isRotating = true;
      donutClass = "clickedMetRotate";
      rotateButton.style.backgroundColor = '#01bc01';
    }
    changeColorButton();
    rotateButton.classList.add("clicked2");
    setTimeout(() => {rotateButton.classList.remove("clicked2");}, 300);
  }
}

rotateButton.onclick = buyRotate;

