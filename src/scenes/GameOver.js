
// You can write more code here

/* START OF COMPILED CODE */

class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// text_1
		const text_1 = this.add.text(690, 32, "", {});
		text_1.text = "Game Over";
		text_1.setStyle({ "fontSize": "100px", "fontStyle": "bold" });

		// fish_eat_fish
		const fish_eat_fish = this.add.image(960, 497, "fish-eat-fish");
		fish_eat_fish.scaleX = 2.2;
		fish_eat_fish.scaleY = 1.8;

		// playAgain
		const playAgain = this.add.image(960, 996, "play_again_button");

		// text_2
		const text_2 = this.add.text(770, 864, "", {});
		text_2.text = "Your Score:";
		text_2.setStyle({ "fontSize": "50px", "fontStyle": "bold" });

		// totalScore
		const totalScore = this.add.text(1120, 868, "", {});
		totalScore.text = "0";
		totalScore.setStyle({ "fontSize": "50px", "fontStyle": "bold" });

		this.playAgain = playAgain;
		this.totalScore = totalScore;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	playAgain;
	/** @type {Phaser.GameObjects.Text} */
	totalScore;

	/* START-USER-CODE */

	// Write your code here
	init(data){
		this.sceneObj = data;
	}	

	create() {

		this.editorCreate();
		this.totalScore.setText(this.sceneObj.player.power--);
		this.playAgain.setInteractive().on("pointerdown",()=>{
			this.scene.stop('GameOver');
			this.scene.start('Level');
		});
		const enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  		enterKey.on('down', this.onEnterKey, this);
	}

	onEnterKey(){
		this.scene.stop('GameOver');
		this.scene.start('Level');
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
