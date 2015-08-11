(function () {
  if (this.towerDefense === undefined) {
    window.towerDefense = {};
  }

  var Wave = towerDefense.Wave = function (options) {
    this.enemies = [];
    this.enemiesGenerated = 0;

    this.numEnemies = 5;

    this.currentWave = 1;

    this.wayPoints = options.wayPoints;

    this.addingAnEnemy = false;
    this.generateEnemy();

  }

  Wave.prototype.generateEnemy = function(){
    var that = this;

    if (!this.addingAnEnemy && this.enemiesGenerated < this.numEnemies) {
      this.addingAnEnemy = true;
      this.enemiesGenerated += 1;
      setTimeout(function () {

        that.enemies.push(new towerDefense.Enemy({
          wayPoints: that.wayPoints, health: that.currentWave * 100
        }))

        that.addingAnEnemy = false;
        that.generateEnemy();
      }, 2000)
    } else if (this.enemiesGenerated === this.numEnemies){
      setTimeout(function(){
        that.nextWave();
      },2000)
    }

  }

  Wave.prototype.nextWave = function(){
    this.enemiesGenerated = 0;
    this.currentWave += 1;
    console.log("Wave: " + this.currentWave);
    this.generateEnemy();
  }

  Wave.prototype.draw = function(ctx){
    this.enemies.forEach(function (enemy) {
      enemy.draw(ctx);
    })
  }


})();
