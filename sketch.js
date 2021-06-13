var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj , feed , fedtime , lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed");
  feed.position(700,90);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedtime = database.ref("FeedTime");
  fedtime.on("value",function(data){
  lastFed = data.val();
  })

  
 
  textSize(20);
  if(lastFed>=12){
    text("Last Fed"+lastFed%12+"pm",350,30)

  }
  else if(lastFed==0){
    text("Last Fed : 12am",350,30)}
    else{
      text("Last Fed"+ lastFed+"am", 350,30)
    }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var foodstockval = foodObj.getfoodstock();
if(foodstockval<=0){
  foodObj.updateFoodStock(foodstockval*0)

}
else{
  foodObj.updateFoodStock(foodstockval-1)
}
database.ref('/').update({
  Food:foodObj.getfoodstock(),FeedTime:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
