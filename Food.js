class Food{
    constructor(){
    }
   
    display(){
        this.foodStock=0;
        this.image=loadImage("Milk.png");
        
        
        var button=createButton("Feed the Dog");
        button.position(400,125);

        if(button.mousePressed(function(){
            foodS=foodS-1;
            gamestate=1;
            db.ref('/').update({'gameState':gamestate})
        }));

        var addFood=createButton("Add Food");
        addFood.position(500,125);
      
        if(addFood.mousePressed(function(){
          foodS=foodS+1;
          gamestate=2;
          db.ref('/').update({'gameState':gamestate});
        }));
    
    }
    

   
}