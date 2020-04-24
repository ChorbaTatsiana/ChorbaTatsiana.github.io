let pressButton = document.getElementById("education-button");
 
pressButton.addEventListener("click", showInfo);

function showInfo (){
  document.getElementById("education__more-info").style.display = "block";
  pressClose.style.display = "block";
}

let pressClose = document.getElementById("education-button-close");

pressClose.addEventListener("click", closeInfo);

function closeInfo (){
  document.getElementById("education__more-info").style.display = "none";
  pressClose.style.display = "none";
}