var dog,happyDog;
var db,foodS,foodStock;
var dogimg,happydogimg;
var foodObj, fedTime,lastFed;
var feed, addFood;
var state,gamestate;

function preload()
{
dogimg=loadImage("Dog.png");
happydogimg=loadImage("happydog.png")
garden=loadImage("images/Garden.png");
washroom=loadImage("images/Wash Room.png")
bedroom=loadImage("images/Bed Room.png")
milkimg=loadImage("images/milk.png");
livingroom=loadImage("images/Living Room.png")
}

function setup() {

  db=firebase.database();
  createCanvas(500, 500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale=0.15;

  foodStock=db.ref('Food')
  foodStock.on("value",readStock)
  foodStock.set(20);

  foodObj=new Food();

  readState=db.ref('gameState');
  readState.on("value",function(data){
    gamestate=data.val();
  })
 
  milkBottle1=createSprite(140,435,10,10)
  milkBottle1.addImage(milkimg);
  milkBottle1.scale=0.025;

  milkBottle2=createSprite(210,280,10,10)
  milkBottle2.addImage(milkimg);
  milkBottle2.scale=0.025
  milkBottle2.visible=false;
}


function draw() { 
  background("yellow") 

  foodObj.display();
  writeStock(foodS)

  if(foodS==0){
    dog.addImage(happydogimg);
    milkBottle2.visible=false;
  }
  else{
    dog.addImage(dogimg)
    milkBottle2.visible=true
  }

  var gsref=db.ref('gameState');
  gsref.on("value",function(data){
    gamestate=data.val();
  });

  if(gamestate===1){
    dog.addImage(happydogimg);
    dog.scale=0.175;
    dog.y=250
  }

  if(gamestate===2){
    dog.addImage(dogimg);
    dog.scale=0.175;
    milkBottle2.visible=true;
    dog.y=250;
  }

  var Bath=createButton("I want to take a bath");
  Bath.position(580,125);
  if(Bath.mousePressed(function(){
    gamestate=3;
    db.ref('/').update({'gameState':gamestate});
  }));

  if(gamestate===3){
    dog.addImage(washroom);
    dog.scale=1;
    milkBottle2.visible=false;
  }

  var Sleep=createButton("I am very sleepy");
  Sleep.position(720,125)
 if(Sleep.mousePressed(function(){
   gamestate=4;
   db.ref('/').update({'gameState':gamestate});
 }));

 if(gamestate===4){
   dog.addImage(bedroom);
   dog.scale=1;
   milkBottle2.visible=false;
 }

 var Play=createButton("Lets play!");
 Play.position(500,160);
 if(Play.mousePressed(function(){
   gamestate=5;
   db.ref('/').update({'gameState':gamestate});
 }));

 if(gamestate===5){
   dog.addImage(livingroom);
   dog.scale=1;
   milkBottle2.visible=false;
 }

 var playgarden=createButton("Lets play in the park");
 playgarden.position(585,160);
 if(playgarden.mousePressed(function(){
   gamestate=6;
   db.ref('/').update({'gameState':gamestate});
 }));

 if(gamestate===6){
   dog.y=175;
   dog.addImage(garden);
   dog.scale=1;
   milkBottle2.visible=false;
 }
  textSize(17);
  fill("black");
  text("Milk Bottles Remaining : "+foodS,170,440)
  drawSprites();
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  db.ref('/').update({
    Food:x
  })
}

