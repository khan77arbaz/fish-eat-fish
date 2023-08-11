
// You can write more code here

/* START OF COMPILED CODE */

class EarthWorm extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// earthworm
		const earthworm = scene.add.image(0, 0, "earthworm1");
		earthworm.scaleX = 0.2;
		earthworm.scaleY = 0.2;
		this.add(earthworm);

		this.earthworm = earthworm;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.earthworm.setVisible(false);

		this.earthwormArray = ["earthworm1", "earthworm2", "earthworm3"];
		this.earthWarmInterval = setInterval(() => {
			this.randomEarthworm(scene);
		}, 2000);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	earthworm;

	/* START-USER-CODE */

	randomXPosition() {
		return Math.floor(Math.random() * 1001) + 200;
	}

	earthwormCollision(oEarthworm, scene) {
		scene.physics.add.collider(scene.player, oEarthworm, (_, e) => {
			scene.fishEating.play();
			e.destroy();
			scene.plusOne.x = scene.player.x+20;
			scene.plusOne.y = scene.player.y-40;
			scene.plusOne.setVisible(true)
			scene.time.delayedCall(500, () => {
				scene.plusOne.setVisible(false);
			}, [], scene);
			scene.player.power++;
			scene.scoreZero.setText(scene.player.power);
			scene.player.scaleX += 0.001;
			scene.player.scaleY += 0.001;
			scene.player.setVelocity(0);
		}, null, scene);
	}

	bottomCollision(oEarthworm, scene) {
		scene.physics.add.collider(scene.box, oEarthworm, (_, e) => {
			scene.fishDead.play();
			scene.earthwormMiss.setVisible(true);
			e.destroy();
			scene.box.setVelocity(0);
			scene.time.delayedCall(1500, () => {
				scene.earthwormMiss.setVisible(false);
			}, [], scene);
			scene.fishes.playerLives -= 1;
			if (scene.fishes.playerLives == 2) {
				scene.lifeOne.setTexture('lifeOff');
			}
			if (scene.fishes.playerLives == 1) {
				scene.lifeTwo.setTexture('lifeOff');
			}
			if(scene.fishes.playerLives == 0){
				scene.player.destroy();
				clearInterval(scene.fishes.fishInterval);
				clearInterval(scene.fishes.fishRightToLeftInterval);
				clearInterval(scene.earthWorm.earthWarmInterval);
				clearInterval(scene.submarineCartoon.submarineInterval);
				scene.gameEnding.play();
				scene.backgroundSound.loop = false;
				scene.backgroundSound.stop();
				scene.scene.stop('Level');
				scene.scene.start('GameOver', scene);
			}
		}, null, scene);
	}	

	randomEarthworm(s) {
		this.earthworm_ = s.physics.add.image(this.randomXPosition(), 0, this.earthwormArray[Math.floor(Math.random() * this.earthwormArray.length)]);
		this.earthworm_.scaleX = 0.20;
		this.earthworm_.scaleY = 0.20;
		this.add(this.earthworm_);
		this.earthworm_.setVelocityY(190);

		this.earthwormCollision(this.earthworm_, s);
		this.bottomCollision(this.earthworm_, s);
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
