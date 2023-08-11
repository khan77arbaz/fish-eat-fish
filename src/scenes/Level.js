// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.

		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gameBackground
		const gameBackground = this.add.image(967, 548, "4262432");
		gameBackground.scaleX = 0.65;
		gameBackground.scaleY = 0.55;

		// Gamecontainer
		this.add.container(0, 0);

		// fishes
		const fishes = new Fishes(this, 2100, 122);
		this.add.existing(fishes);

		// earthWorm
		const earthWorm = new EarthWorm(this, 123, -132);
		this.add.existing(earthWorm);

		// text_1
		const text_1 = this.add.text(134, 10, "", {});
		text_1.text = "Score:";
		text_1.setStyle({ "color": "#0a0909ff", "fontSize": "60px", "fontStyle": "bold" });

		// scoreZero
		const scoreZero = this.add.text(361, 15, "", {});
		scoreZero.text = "0";
		scoreZero.setStyle({ "color": "#070707ff", "fontSize": "60px", "fontStyle": "bold" });

		// submarineCartoon
		const submarineCartoon = new SubmarineCartoon(this, 2220, 950);
		this.add.existing(submarineCartoon);

		// lifeOne
		const lifeOne = this.add.image(1715, 50, "lifeOn");
		lifeOne.scaleX = 0.6;
		lifeOne.scaleY = 0.6;

		// lifeTwo
		const lifeTwo = this.add.image(1780, 50, "lifeOn");
		lifeTwo.scaleX = 0.6;
		lifeTwo.scaleY = 0.6;

		// lifeThree
		const lifeThree = this.add.image(1845, 50, "lifeOn");
		lifeThree.scaleX = 0.6;
		lifeThree.scaleY = 0.6;

		// fishSkeleton
		const fishSkeleton = this.add.sprite(1097, 121, "fishSkeleton", 0);
		fishSkeleton.scaleX = 0.5;
		fishSkeleton.scaleY = 0.5;
		fishSkeleton.visible = false;

		// maximize
		const maximize = this.add.image(40, 39, "full-size");
		maximize.scaleX = 0.1;
		maximize.scaleY = 0.1;

		// earthwormMiss
		const earthwormMiss = this.add.text(749.5, 476, "", {});
		earthwormMiss.visible = false;
		earthwormMiss.text = "Earthworm is missed!";
		earthwormMiss.setStyle({ "color": "#000000ff", "fontSize": "35px" });

		// dontMiss
		const dontMiss = this.add.text(672, 312, "", {});
		dontMiss.text = "DON'T MISS THE EARTHWOTM";
		dontMiss.setStyle({ "color": "#d75a5aff", "fontSize": "40px", "fontStyle": "bold" });

		// plusFive
		const plusFive = this.add.text(939, 241, "", {});
		plusFive.visible = false;
		plusFive.text = "+5";
		plusFive.setStyle({ "color": "#000000ff", "fontSize": "20px" });

		// plusOne
		const plusOne = this.add.text(972, 173, "", {});
		plusOne.visible = false;
		plusOne.text = "+1";
		plusOne.setStyle({ "color": "#000000ff", "fontSize": "20px" });

		// largerThanYou
		const largerThanYou = this.add.text(787, 439, "", {});
		largerThanYou.visible = false;
		largerThanYou.text = "It was larger than you!";
		largerThanYou.setStyle({ "color": "#000000ff", "fontSize": "25px" });

		this.gameBackground = gameBackground;
		this.fishes = fishes;
		this.earthWorm = earthWorm;
		this.scoreZero = scoreZero;
		this.submarineCartoon = submarineCartoon;
		this.lifeOne = lifeOne;
		this.lifeTwo = lifeTwo;
		this.lifeThree = lifeThree;
		this.fishSkeleton = fishSkeleton;
		this.maximize = maximize;
		this.earthwormMiss = earthwormMiss;
		this.dontMiss = dontMiss;
		this.plusFive = plusFive;
		this.plusOne = plusOne;
		this.largerThanYou = largerThanYou;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	gameBackground;
	/** @type {Fishes} */
	fishes;
	/** @type {EarthWorm} */
	earthWorm;
	/** @type {Phaser.GameObjects.Text} */
	scoreZero;
	/** @type {SubmarineCartoon} */
	submarineCartoon;
	/** @type {Phaser.GameObjects.Image} */
	lifeOne;
	/** @type {Phaser.GameObjects.Image} */
	lifeTwo;
	/** @type {Phaser.GameObjects.Image} */
	lifeThree;
	/** @type {Phaser.GameObjects.Sprite} */
	fishSkeleton;
	/** @type {Phaser.GameObjects.Image} */
	maximize;
	/** @type {Phaser.GameObjects.Text} */
	earthwormMiss;
	/** @type {Phaser.GameObjects.Text} */
	dontMiss;
	/** @type {Phaser.GameObjects.Text} */
	plusFive;
	/** @type {Phaser.GameObjects.Text} */
	plusOne;
	/** @type {Phaser.GameObjects.Text} */
	largerThanYou;

	/* START-USER-CODE */

	// Write more your code here
	playerSpeed = 10;
	zoomInOut = 1;

	create() {
		this.editorCreate();
		this.time.delayedCall(2500, () => {
			this.dontMiss.setVisible(false);
		}, [], this);

		this.backgroundSound = this.sound.add('sbackgroundMusic');
		this.backgroundSound.play();
		this.backgroundSound.loop = true;
		this.fishEating = this.sound.add('sfishEat');
		this.fishDead = this.sound.add('sdeadFish');
		this.gameEnding = this.sound.add('sgameEnd');

		this.player = this.physics.add.sprite(960, 110, "player");
		this.player.setScale(0.08, 0.08);
		this.isPlayerAlive = true;
		this.resetPlayerPosition();
		this.player.power = 0;
		// boundary boxes
		this.box = this.physics.add.sprite(960, 1095, "box");
		this.box.setVisible(false);
		this.box.setScale(7.5, 1);

		this.box1 = this.physics.add.sprite(-350, 540, "box1");
		this.box1.setVisible(false);
		this.box1.setScale(2, 32);

		this.box2 = this.physics.add.sprite(2400, 540, "box2");
		this.box2.setVisible(false);
		this.box2.setScale(3, 32);

		this.maximize.setInteractive().on("pointerdown", () => {
			if(this.zoomInOut == 1){
				toggleFullScreen(document.body);
				this.maximize.setTexture('half-size');
				this.zoomInOut++;
			}else{
				toggleFullScreen(document.body);
				this.maximize.setTexture('full-size');
				this.zoomInOut--;
			}
		});
	}

	toggleFullScreen(elem) {
		if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
			if (elem.requestFullScreen) {
				elem.requestFullScreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullScreen) {
				elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			}
		} else {
			if (document.cancelFullScreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	}

	resetPlayerPosition() {
		this.player.setVisible(true);
		this.fishSkeleton.setVisible(false);
		this.player.setBodySize(670, 400, true);
		this.player.setOffset(200, 200);
		this.player.x = 960;
		this.player.y = 110;
		this.player.setCollideWorldBounds(true);

		if (this.fishes.playerLives == 2) {
			this.lifeOne.setTexture('lifeOff');
		}
		if (this.fishes.playerLives == 1) {
			this.lifeTwo.setTexture('lifeOff');
		}
	}

	update() {
		const cursors = this.input.keyboard.createCursorKeys();
		if (this.isPlayerAlive) {
			if (cursors.left.isDown) {
				this.player.flipX = true;
				this.player.x -= this.playerSpeed;
			} else if (cursors.right.isDown) {
				this.player.flipX = false;
				this.player.x += this.playerSpeed;
			}
			if (cursors.up.isDown) {
				this.player.y -= this.playerSpeed;
			} else if (cursors.down.isDown) {
				this.player.y += this.playerSpeed;
			}
		}
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
