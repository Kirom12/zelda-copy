/**
 * Player class
 **/
class Player extends Character
{
	constructor(x, y, width, height)
	{
		super(x, y, width, height);

		this.Sprite = Game.Main.add.sprite(this.x, this.y, 'link');

		this.Weapon = Game.Main.add.weapon(100, 'link');

		console.log(this.Weapon);

		this.Weapon.setBulletFrames(108,108);

		this.Weapon.bulletSpeed = 200;
		this.Weapon.fireRate = 1000;
		this.Weapon.trackSprite(this.Sprite, 25, 25, false);

		this.Weapon.fireAngle = 90;

		this.Weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.scale.set(Game.rescaleFactor);
		this.Sprite.body.setSize(12, 12, 2, 2);

		this.Sprite.body.maxVelocity = 200;
		this.Sprite.body.collideWorldBounds = true;

		this.Sprite.animations.add('top', [2, 17], 7, true);
		this.Sprite.animations.add('left', [1, 16], 7, true);
		this.Sprite.animations.add('down', [0, 15], 7, true);
		this.Sprite.animations.add('right', [18, 3], 7, true);
		this.Sprite.animations.add('idle', [0], 5, true);

		this.Cursors = Game.Main.input.keyboard.createCursorKeys();

		this.Buttons =
		{
			x : Game.Main.input.keyboard.addKey(Phaser.Keyboard.X)
		}
	};

	update()
	{
		this.Sprite.body.velocity.y = 0;
		this.Sprite.body.velocity.x = 0;

		if (this.Cursors.up.isDown) {
			this.Sprite.body.velocity.y = -150;
			this.Sprite.animations.play('top');
			this.Weapon.fireAngle = 270;
		} else if (this.Cursors.down.isDown) {
			this.Sprite.body.velocity.y = 150;
			this.Sprite.animations.play('down');
			this.Weapon.fireAngle = 90;
		} else if (this.Cursors.left.isDown) {
			this.Sprite.body.velocity.x = -150;
			this.Sprite.animations.play('left');
			this.Weapon.fireAngle = 180;
		} else if (this.Cursors.right.isDown) {
			this.Sprite.body.velocity.x = 150;
			this.Sprite.animations.play('right');
			this.Weapon.fireAngle = 0;
		} else {
			this.Sprite.animations.stop(null, true);
		}

		if (this.Buttons.x.isDown)
		{
			//console.log(this.Weapon);
			this.Weapon.fire();
		}

		this.x = this.Sprite.body.position.x;
		this.y = this.Sprite.body.position.y;

		//console.log(this.Sprite.body.angle);
	};
}