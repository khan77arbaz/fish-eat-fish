
// You can write more code here

/* START OF COMPILED CODE */

class SubmarineCartoon extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? 0);

		// submarine
		const submarine = scene.add.image(0, 0, "sunmarine");
		this.add(submarine);

		this.submarine = submarine;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.submarineInterval = setInterval(() => {
			this.randomSubmarine(scene);
		}, 20000);
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Image} */
	submarine;

	/* START-USER-CODE */

	submarineCollision(oSubmarine, scene) {
		scene.physics.add.collider(scene.player, oSubmarine, (_) => {
			scene.fishes.playerLives -= 1;
			if(scene.fishes.playerLives > 0){
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
			} else{
				clearInterval(this.submarineInterval);
				clearInterval(scene.fishes.fishInterval);
				clearInterval(scene.fishes.fishRightToLeftInterval);
				clearInterval(scene.earthWorm.earthWarmInterval);
				scene.backgroundSound.stop();
				scene.scene.stop('Level');
				scene.scene.start('GameOver',scene);
			}
		}, null, scene)
	}

	randomSubmarine(s) {
		this.submarine_ = s.physics.add.image(0, 0, 'sunmarine');
		this.submarine_.setBodySize(350, 170, true);
		this.submarine_.setOffset(80, 170);
		this.add(this.submarine_);
		this.submarine_.setVelocityX(-100);
		this.submarineCollision(this.submarine_, s);
	}

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
