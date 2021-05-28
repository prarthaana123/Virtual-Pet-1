//Create variables here

var dog, dogImage,HappydogImage,database;
var foodS,foodStock;

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png");
  HappydogImage=loadImage("images/HappydogImage.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food")
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImage)
  dog.scale=0.2;

  
}


function draw() { 
  background("green");

  if(foodS!==undefined){
    textSize(20)
    fill(255)
    text("Note: Press UP ARROW to feed LIAM milk",50,50);
    text("Food Remaning :" +foodS,150,150);
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(HappydogImage);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }

 if(foodS===0){
   foodS=20;
 }
  

  drawSprites();
}
}

function writeStock(x){
  if(x<=0){
     x = 0;
  }
   else{
     x = x-1;
   }

   database.ref("/").update({
     Food:x
   });

}

function readStock(data){
  foodS = data.val();
}



