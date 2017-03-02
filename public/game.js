var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var terrain;
var players;

function preload() {
    game.load.image('player', 'img/aim.gif');
    game.load.image('wall', 'img/wall.png');
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	players = game.add.group();
	createPlayer(0, 0, Phaser.KeyCode.A, Phaser.KeyCode.D, Phaser.KeyCode.W);
	createPlayer(0, 20, Phaser.KeyCode.LEFT, Phaser.KeyCode.RIGHT, Phaser.KeyCode.UP);

	terrain = game.add.group();
	terrain.enableBody = true;
	const wall = terrain.create(0, 160, 'wall');
	wall.scale.setTo(10, 1);
	wall.body.immovable = true;
}

function createPlayer(x, y, leftKey, rightKey, jumpKey) {
	const walkSpeed = 100;
	const jumpSpeed = 200;

	const player = players.create(x, y, 'player');
	game.physics.arcade.enable(player);
	const body = player.body;
	body.gravity.y = 300;
	body.collideWorldBounds = true;

	player.update = () => {
		const keyboard = game.input.keyboard;

		if (keyboard.isDown(leftKey)) body.velocity.x = -walkSpeed;
		else if (keyboard.isDown(rightKey)) body.velocity.x = walkSpeed
		else body.velocity.x = 0;

		if (keyboard.isDown(jumpKey) && player.body.touching.down)
			body.velocity.y = -jumpSpeed;
	};
}

function update() {
	game.physics.arcade.collide(players, players);
	game.physics.arcade.collide(players, terrain);
}
