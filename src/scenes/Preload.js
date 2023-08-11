// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
    // Write your code here.

    /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// loading_background
		const loading_background = this.add.image(960, 540, "loading_background");
		loading_background.scaleX = 2.6;
		loading_background.scaleY = 2.6;

		// sand_clock
		const sand_clock = this.add.image(960, 540, "sand-clock");
		sand_clock.scaleX = 1.5;
		sand_clock.scaleY = 1.5;

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

  // Write your code here


  preload() {
    this.editorCreate();

    this.editorPreload();

	this.load.audio('sbackgroundMusic', 'assets/sounds/backgroundMusic.mp3');
	this.load.audio('sfishEat', 'assets/sounds/fishEat.wav');
	this.load.audio('sdeadFish', 'assets/sounds/deadFish.wav');
	this.load.audio('sgameEnd', 'assets/sounds/gameEnd.mp3');

    this.load.on(Phaser.Loader.Events.COMPLETE, () =>
      this.scene.start("StartGame")
    );
  }

  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
