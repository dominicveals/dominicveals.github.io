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
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 1200, "y": groundY -110},
                { "type": "sawblade", "x": 1509, "y": groundY -20},
                { "type": "sawblade", "x": 1965, "y": groundY-110},
                { "type": "sawblade", "x": 2265, "y": groundY-110},
                { "type": "sawblade", "x": 3365, "y": groundY-30},
                { "type": "sawblade", "x": 3065, "y": groundY-30},
               
                { "type": "enemy", "x": 1700, "y": groundY-110},
                { "type": "enemy", "x": 2800, "y": groundY-50},
                { "type": "enemy", "x": 2500, "y": groundY-30},
                { "type": "enemy", "x": 2800, "y": groundY-50},
                { "type": "enemy", "x": 3200, "y": groundY-90},
                { "type": "enemy", "x": 3700, "y": groundY-60},
                { "type": "enemy", "x": 4000, "y": groundY-100},

                { "type": "enemy2", "x": 400, "y": groundY-100},

                { "type": "reward", "x": 3000, "y": groundY-20},
                { "type": "reward", "x": 2000, "y": groundY-10},
                { "type": "reward", "x": 3800, "y": groundY-120},
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
            var enemyImage = draw.bitmap('img/enemy.png');
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
        var enemyImage = draw.bitmap('img/teach.png');
        enemyImage.x = -130; //x value for enemy 
        enemyImage.y = -105;// y value for enemy
        enemy.addChild(enemyImage);//adds a red square to he enemy


        enemy.x = x;//x value for the red square
        enemy.y = y;//y value for enemy

        enemyImage.scaleX = 0.50;
        enemyImage.scaleY = 0.50;
        game.addGameItem(enemy);
        enemy.velocityX = -1; //moves the enemy
        enemy.rotationalVelocity = 0;  //rotates the enemy



        //detects if enemy hits halle 
        enemy.onPlayerCollision = function() {
            game.changeIntegrity(-43)//decreases health
            console.log('The enemy has hit Halle'); //prints to the console when halle has been hit
                enemy.shrink();
        };
     }

   function createReward(x,y){
            var reward = game.createGameItem('reward',25);
            var rewardImage = draw.bitmap('img/gumgum.png');
            rewardImage.x = -22; //x value for reward 
            rewardImage.y = -32;// y value for reward
            reward.addChild(rewardImage);//adds a red square to he reward

            rewardImage.scaleX = 0.50;
            rewardImage.scaleY = 0.50;

            reward.x = x;//x value for the red square
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1; //moves the reward
            reward.rotationalVelocity = 0;  //rotates the reward
            
            //detects if reward hits halle 
            reward.onPlayerCollision = function() {
                game.changeIntegrity(+33)//increases health
                console.log('The reward has hit Halle'); //prints to the console when halle has been hit
                    reward.shrink();
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
