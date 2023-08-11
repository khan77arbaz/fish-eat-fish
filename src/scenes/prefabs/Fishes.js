
// You can write more code here

/* START OF COMPILED CODE */

class Fishes extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// fish
		const fish = scene.add.image(0, 31, "fishOne");
		fish.scaleX = 0.2;
		fish.scaleY = 0.2;
		this.add(fish);

		this.fish = fish;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.playerLives = 3;
		this.fish.setVisible(false);
		this.fishArray = [
			{ 'imageName': "fishOne", 'power': 210, 'setBodySizeX': 970, 'setBodySizeY': 420, 'setOffsetX': 90, 'setOffsetY': 500 },
			{ 'imageName': "fishTwo", 'power': 230, 'setBodySizeX': 1150, 'setBodySizeY': 420, 'setOffsetX': 70, 'setOffsetY': 100 },
			{ 'imageName': "fishThree", 'power': 155, 'setBodySizeX': 650, 'setBodySizeY': 450, 'setOffsetX': 10, 'setOffsetY': 30 },
			{ 'imageName': "fishFour", 'power': 140, 'setBodySizeX': 525, 'setBodySizeY': 700, 'setOffsetX': 0, 'setOffsetY': 45 },
			{ 'imageName': "sfishOne", 'power': 4, 'setBodySizeX': 240, 'setBodySizeY': 190, 'setOffsetX': 0, 'setOffsetY': 45 },
			{ 'imageName': "sfishTwo", 'power': 0 },
			{ 'imageName': "sfishThree", 'power': 75, 'setBodySizeX': 400, 'setBodySizeY': 200, 'setOffsetX': 0, 'setOffsetY': 0 },
		];
		this.fishArray2 = [
			// { 'imageName': "fishOne", 'power': 210, 'setBodySizeX': 970, 'setBodySizeY': 420, 'setOffsetX': 90, 'setOffsetY': 500 },
			// { 'imageName': "fishTwo", 'power': 230, 'setBodySizeX': 1150, 'setBodySizeY': 420, 'setOffsetX': 70, 'setOffsetY': 100 },
			{ 'imageName': "fishThree", 'power': 155, 'setBodySizeX': 650, 'setBodySizeY': 450, 'setOffsetX': 10, 'setOffsetY': 30 },
			{ 'imageName': "fishFour", 'power': 140, 'setBodySizeX': 525, 'setBodySizeY': 700, 'setOffsetX': 0, 'setOffsetY': 45 },
			{ 'imageName': "sfishOne", 'power': 4, 'setBodySizeX': 240, 'setBodySizeY': 190, 'setOffsetX': 0, 'setOffsetY': 45 },
			{ 'imageName': "sfishTwo", 'power': 0 },
			{ 'imageName': "sfishThree", 'power': 75, 'setBodySizeX': 400, 'setBodySizeY': 200, 'setOffsetX': 0, 'setOffsetY': 0 },
		];
		
		this.fishInterval = setInterval(() => {
			this.randomFish(scene);
		}, 3500);
		this.fishRightToLeftInterval = setInterval(() => {
			this.randomFish2(scene);
		}, 7000);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	fish;

	/* START-USER-CODE */

	randomYPosition() {
		return Math.floor(Math.random() * 700) + 10;
	}

	fishCollision(oFish, scene) {
		scene.physics.add.collider(scene.player, oFish, (_, fish) => {
			if (scene.player.power >= fish.power) {
				scene.fishEating.play();
				fish.destroy();
				scene.player.power += 5;
				scene.plusFive.x = scene.player.x+20;
				scene.plusFive.y = scene.player.y-40;
				scene.plusFive.setVisible(true)
				scene.time.delayedCall(500, () => {
					scene.plusFive.setVisible(false);
				}, [], scene);
				scene.scoreZero.setText(scene.player.power);
				scene.player.scaleX += 0.002;
				scene.player.scaleY += 0.002;
				scene.player.setVelocity(0);
			} else {
				this.playerLives -= 1;
				if (this.playerLives > 0) {
					scene.fishSkeleton.x = scene.player.x;
					scene.fishSkeleton.y = scene.player.y;
					scene.resetPlayerPosition();
					scene.player.setVelocity(0);
					scene.player.setVisible(false);
					scene.fishSkeleton.setVisible(true);
					scene.isPlayerAlive = false;
					scene.largerThanYou.setVisible(true)
					scene.time.delayedCall(1500, () => {
						scene.largerThanYou.setVisible(false);
					}, [], scene);
					scene.fishDead.play();
					scene.fishSkeleton.play('deadFish').on('animationcomplete', () => {
						scene.isPlayerAlive = true;
					});
					scene.time.delayedCall(1500, () => {
						scene.fishSkeleton.setVisible(false);
						scene.player.setVisible(true);
					}, [], scene);
				}
				if (this.playerLives == 0) {
					scene.player.destroy();
					clearInterval(this.fishInterval);
					clearInterval(this.fishRightToLeftInterval);
					clearInterval(scene.earthWorm.earthWarmInterval);
					clearInterval(scene.submarineCartoon.submarineInterval);
					scene.gameEnding.play();
					scene.backgroundSound.loop = false;
					scene.backgroundSound.stop();
					scene.scene.stop('Level');
					scene.scene.start('GameOver', scene);
				}
			}
		}, null, scene);
	}

	RightSidefishDestroyCollision(oFish, scene){
		scene.physics.add.overlap(scene.box1, oFish, (_, fish) => {
			fish.destroy();
			console.log("this.destroyRight");
		}, null, scene);
	}
	LeftSidefishDestroyCollision(oFish, scene){
		scene.physics.add.overlap(scene.box2, oFish, (_, fish) => {
			fish.destroy();
			console.log("this.destroyLeft");
		}, null, scene);
	}

	randomFish(s) {
		const no = Math.floor(Math.random() * this.fishArray.length)
		const randomY = this.randomYPosition();
		this.fish_ = s.physics.add.image(0, randomY, this.fishArray[no]['imageName']);
		this.fish_.scaleX = 0.2;
		this.fish_.scaleY = 0.2;
		this.fish_.setBodySize(this.fishArray[no]['setBodySizeX'], this.fishArray[no]['setBodySizeY'], true, this.fishArray[no]['setOffsetX'], this.fishArray[no]['setOffsetY']);
		this.fish_.power = this.fishArray[no]['power'];
		this.add(this.fish_);
		this.fish_.setVelocityX(-125);
		const timer = s.time.addEvent({
			delay: 20000,
			loop: true,
			callback: () => {
				this.increaseFishVelocity(this.fish_);
			}
		});
		this.fishTween(s, this.fish_);
		this.fishCollision(this.fish_, s);
		this.RightSidefishDestroyCollision(this.fish_,s);
		
	}

	randomFish2(s) {
		const no = Math.floor(Math.random() * this.fishArray2.length)
		const randomY = this.randomYPosition();
		this.fish_ = s.physics.add.image(-2500, randomY+10, this.fishArray2[no]['imageName']);
		this.fish_.scaleX = 0.2;
		this.fish_.scaleY = 0.2;
		this.fish_.setBodySize(this.fishArray2[no]['setBodySizeX'], this.fishArray2[no]['setBodySizeY'], true, this.fishArray2[no]['setOffsetX'], this.fishArray2[no]['setOffsetY']);
		this.fish_.power = this.fishArray2[no]['power'];
		this.fish_.flipX = true;
		this.add(this.fish_);
		this.fish_.setVelocityX(120);
		// const timer = s.time.addEvent({
		// 	delay: 20000,
		// 	loop: true,
		// 	callback: () => {
		// 		this.increaseFishVelocity(this.fish_);
		// 	}
		// });
		this.fishTween(s, this.fish_);
		this.fishCollision(this.fish_, s);
		this.LeftSidefishDestroyCollision(this.fish_,s);
	}

	fishTween(s, fish) {
		s.tweens.add({
			targets: fish,
			scaleX: { from: 0.2, to: 0.17 },
			duration: 500,
			yoyo: true,
			repeat: -1,
		});
	}

	increaseFishVelocity(fish) {
		const currentVelocityX = fish.body.velocity.x;
		const increasedVelocityX = currentVelocityX - 35;
		fish.setVelocityX(increasedVelocityX);
	}
	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
