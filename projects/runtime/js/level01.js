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
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 1200, "y": groundY -110},
                { "type": "sawblade", "x": 1509, "y": groundY -20},
                { "type": "sawblade", "x": 1965, "y": groundY-110},
               
               
                { "type": "enemy", "x": 1300, "y": groundY-50},
                { "type": "enemy", "x": 1630, "y": groundY-50},
                { "type": "enemy", "x": 2200, "y": groundY-50},

                { "type": "reward", "x": 1522, "y": groundY-50},
                { "type": "reward", "x": 2370, "y": groundY-50},
                { "type": "reward", "x": 4340, "y": groundY-50},

            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
     

        function createSawblade(x,y){
              var hitZoneSize = 25;
             var damageFromObstacle = 10;
             var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
             sawBladeHitZone.x = x;
             sawBladeHitZone.y = y;
             game.addGameItem(sawBladeHitZone);    
             sawBladeHitZone.rotationalVelocity = 10;
             
              var obstacleImage = draw.bitmap('img/sawblade.png');
              sawBladeHitZone.addChild(obstacleImage);
              obstacleImage.x= -25;
              obstacleImage.y= -25;
             
        };


        function createEnemy(x,y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'red');
            redSquare.x = -25; //x value for enemy 
            redSquare.y = -25;// y value for enemy
            enemy.addChild(redSquare);//adds a red square to he enemy


            enemy.x = x;//x value for the red square
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1; //moves the enemy
            enemy.rotationalVelocity = 0;  //rotates the enemy
            
            //detects if enemy hits halle 
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-33)//decreases health
                console.log('The enemy has hit Halle'); //prints to the console when halle has been hit
                    enemy.shrink(12);
            };
                            //detects if the enemy ollides with the projectile and will fade oyt
            enemy.onProjectileCollision = function() {
                game.increase(10);  
                enemy.shrink(22);                           
            };
         };
                  
   function createReward(x,y){
            var reward = game.createGameItem('reward',25);
            var blueSquare = draw.rect(50,50,'blue');
            blueSquare.x = -25; //x value for reward 
            blueSquare.y = -25;// y value for reward
            reward.addChild(blueSquare);//adds a red square to he reward


            reward.x = x;//x value for the red square
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1; //moves the reward
            reward.rotationalVelocity = 0;  //rotates the reward
            
            //detects if reward hits halle 
            reward.onPlayerCollision = function() {
                game.changeIntegrity(+33)//increases health
                console.log('The reward has hit Halle'); //prints to the console when halle has been hit
                    reward.shrink(12);
            };
   }
         

     for(var i =0;i<levelData.gameItems.length;i++){
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
