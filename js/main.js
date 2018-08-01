document.addEventListener('DOMContentLoaded', function(){

	let game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
	let score = 0
	let scoreText;

	function preload() {
		game.load.image('sky', '../assets/sky.png');
		game.load.image('ground', '../assets/platform.png');
		game.load.image('star', '../assets/star.png');
		game.load.spritesheet('dude', '../assets/dude2.png', 32, 48)

	}

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.add.sprite(0, 0, 'sky');
		platforms = game.add.group();
		platforms.enableBody = true;

		let ground = platforms.create(0, game.world.height - 64, 'ground');
		ground.scale.setTo(2, 2);
		ground.body.immovable = true

		let ledge = platforms.create(400, 400, 'ground')
		ledge.body.immovable = true
		ledge = platforms.create(-150, 250, 'ground')
		ledge.body.immovable = true

		player = game.add.sprite(32, game.world.height - 150, 'dude')
		game.physics.arcade.enable(player)
		player.body.gravity.y = 300;
		player.body.bounce.y = 0.2;
		player.body.collideWorldBounds = true;

		player.animations.add('left', [0, 1, 2, 3], 10, true)
		player.animations.add('right', [5, 6, 7, 8], 10, true)

		stars = game.add.group()
		stars.enableBody = true

		for (let i = 0; i < 12; i++) {
			let star = stars.create(i * 70, 0, 'star')
			star.body.gravity.y = 15
			star.body.bounce.y = 0.7 + Math.random() * 0.2
		}
		scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: "#000"})
	}

	function update() {
		game.physics.arcade.collide(player, platforms)

		cursors = game.input.keyboard.createCursorKeys()
		player.body.velocity.x = 0

		if (cursors.left.isDown){
			player.body.velocity.x = -150
			player.animations.play('left')
		} else if (cursors.right.isDown) {
			player.body.velocity.x = 150
			player.animations.play('right')
		} else {
			player.animations.stop()
			player.frame = 4
		}

		if (cursors.up.isDown && player.body.touching.down){
			player.body.velocity.y = -350;
		}

		game.physics.arcade.collide(stars, platforms)
		game.physics.arcade.overlap(player, stars, collectStar, null, this);
		console.log(stars);
if(stars.children && stars.children.length === 5){
	console.log('we arwe here');
		for (let i = 0; i < 12; i++) {
			let star = stars.create(i * 70, 0, 'star')
			star.body.gravity.y = 15
			star.body.bounce.y = 0.7 + Math.random() * 0.2
		}
	}

	}

	function collectStar(player, star){
		star.kill();
		score += 10;
		scoreText.text = 'Score: ' + score
	}
	
}, false);