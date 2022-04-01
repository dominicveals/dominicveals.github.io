var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Ghostescape",
            "number": 1, 
            "speed": -1,
            "gameItems": [
                { "type": "sawblade", "x": 1200, "y": groundY -120}, 
                { "type": "sawblade", "x": 1509, "y": groundY -20},
                { "type": "sawblade", "x": 1965, "y": groundY-110},
                { "type": "sawblade", "x": 2265, "y": groundY-110},
                { "type": "sawblade", "x": 3365, "y": groundY-30},
                { "type": "sawblade", "x": 3065, "y": groundY-30},
               
                { "type": "enemy", "x": 1700, "y": groundY-110},
                { "type": "enemy", "x": 2800, "y": groundY-120},
                { "type": "enemy", "x": 2500, "y": groundY-120},
                { "type": "enemy", "x": 2800, "y": groundY-30},
                { "type": "enemy", "x": 3200, "y": groundY-30},
                { "type": "enemy", "x": 3700, "y": groundY-120},
                { "type": "enemy", "x": 4000, "y": groundY-120},

                { "type": "enemy2", "x": 4000, "y": groundY-30},
                { "type": "enemy2", "x": 4200, "y": groundY-120},
                { "type": "enemy2", "x": 4300, "y": groundY-40},
                { "type": "enemy2", "x": 4900, "y": groundY-120},
                { "type": "enemy2", "x": 5200, "y": groundY-130},
                { "type": "enemy2", "x": 5300, "y": groundY-30},

                { "type": "reward", "x": 3000, "y": groundY-20},
                { "type": "reward", "x": 2000, "y": groundY-10},
                { "type": "reward", "x": 3800, "y": groundY-120},
                { "type": "reward", "x": 4700, "y": groundY-10},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
             
            
        function createSawblade(x,y){ //function that can create a sawblade
              var hitZoneSize = 25;   // variable that sets the size of the hitzone for the sawblade
             var damageFromObstacle = 10;  // sets the damage taken from the sawblade
             var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // this puts the sawblade hitzone and damage into the game
             sawBladeHitZone.x = x; // x variabe for the sawblade
             sawBladeHitZone.y = y; // y variable for the sawblade
             game.addGameItem(sawBladeHitZone); // prints the sawblades hitzone so we xan see it
             sawBladeHitZone.rotationalVelocity = 10; // this sets hoe much you want the sawblade to rotate
             
              var obstacleImage = draw.bitmap('img/sawblade.png'); // this is the image for the sawblade
              sawBladeHitZone.addChild(obstacleImage);  // this adds the image to the game for the player to see
              obstacleImage.x= -25; // this sets the scale for the image on the x plane
              obstacleImage.y= -25; // stes the scale on the y plane
             
        };


        function createEnemy(x,y){ // function that creates an enemy
            var enemy = game.createGameItem('enemy',25); // this puts the hitzone for the enemy in the game
            var enemyImage = draw.bitmap('img/enemy.png'); // code for the image of the enemy
            enemyImage.x = -28; //x value for enemy 
            enemyImage.y = -25;// y value for enemy
            enemy.addChild(enemyImage);//adds a red square to he enemy


            enemy.x = x;//x value for the red square
            enemy.y = y;//y value for enemy

            enemyImage.scaleX = 0.50;
            enemyImage.scaleY = 0.50;
            game.addGameItem(enemy);
            enemy.velocityX = -3; //moves the enemy
            enemy.rotationalVelocity = 0;  //rotates the enemy

     
            
            //detects if enemy hits halle 
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-25)//decreases health
                console.log('The enemy has hit Halle'); //prints to the console when halle has been hit
                    enemy.shrink();
            };
                            //detects if the enemy ollides with the projectile and will fade oyt
            enemy.onProjectileCollision = function() {
                game.increaseScore(10);  
                enemy.shrink();                           
            };
         };
    function createEnemy2(x,y){ 
        var enemy = game.createGameItem('enemy2',25);
        var enemyImage = draw.bitmap('img/teach.png'); // image for the enemy
        enemyImage.x = -30; //x value for enemy 
        enemyImage.y = -30;// y value for enemy
        enemy.addChild(enemyImage);//adds a red square to he enemy


        enemy.x = x;//x value for the red square
        enemy.y = y;//y value for enemy

        enemyImage.scaleX = 0.50; //code for setting how wide your image will be 
        enemyImage.scaleY = 0.50; // code for how tall your image will be
        game.addGameItem(enemy); // adds the enemy to the game
        enemy.velocityX = -2; //moves the enemy
        enemy.rotationalVelocity = 0;  //rotates the enemy



        //detects if enemy hits halle 
        enemy.onPlayerCollision = function() {
            game.changeIntegrity(-43)//decreases health
            console.log('The enemy has hit Halle'); //prints to the console when halle has been hit
                enemy.shrink();
        };
                        //detects if the enemy collides with the projectile and will fade oyt
          enemy.onProjectileCollision = function() { 
             game.increaseScore(10); // sets the score for when you kill an enemy
             enemy.shrink();                           
           };
     }

   function createReward(x,y){
            var reward = game.createGameItem('reward',25);
            var rewardImage = draw.bitmap('img/gumgum.png'); // image for the reward
            rewardImage.x = -22; //x value for reward 
            rewardImage.y = -32;// y value for reward
            reward.addChild(rewardImage);//adds a red square to he reward

            rewardImage.scaleX = 0.50; // sets how long the image will be
            rewardImage.scaleY = 0.50; // sets how tall your image will be

            reward.x = x;//x value for the reward
            reward.y = y;//y value for the reward
            game.addGameItem(reward); // adds the reward file to the game
            reward.velocityX = -1; //moves the reward
            reward.rotationalVelocity = 0;  //rotates the reward
            
            //detects if reward hits halle 
            reward.onPlayerCollision = function() {
                game.changeIntegrity(+33)//increases health
                console.log('The reward has hit Halle'); //prints to the console when halle has been hit
                    reward.shrink(); //sets the code for when the reward hits halle it will shring into nothing
            };
   }
         

     for(var i =0;i<levelData.gameItems.length;i++){ // a loop to print how many of the following values as you want
         var gameItem = levelData.gameItems[i];

         if(gameItem.type=== "sawblade"){     
             createSawblade(gameItem.x, gameItem.y)
         }
          if(gameItem.type=== "enemy"){
             createEnemy(gameItem.x, gameItem.y)
            } 
           if(gameItem.type=== "reward"){
             createReward(gameItem.x, gameItem.y)
           }
           if(gameItem.type=== "enemy2"){
            createEnemy2(gameItem.x, gameItem.y)
           }
        };
     
     
     
     
        // DO NOT EDIT CODEBELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
