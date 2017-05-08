/**
 * Player class
 **/
class Player extends Character
{
	constructor(x, y, width, height)
	{
		super(x, y, width, height);

		this.Sprite = Game.Main.add.sprite(this.x, this.y, 'link');

		Game.Main.physics.enable(this.Sprite, Phaser.Physics.ARCADE);

		this.Sprite.scale.set(Game.rescaleFactor);

		this.Sprite.animations.add('top', [2, 17], 5, true);
		this.Sprite.animations.add('left', [1, 16], 5, true);
		this.Sprite.animations.add('down', [0, 15], 5, true);
		this.Sprite.animations.add('right', [18, 3], 5, true);
		this.Sprite.animations.add('idle', [0], 5, true);

		this.cursors = Game.Main.input.keyboard.createCursorKeys();
	};

	update()
	{
		this.Sprite.body.velocity.y = 0;
		this.Sprite.body.velocity.x = 0;

		if (this.cursors.up.isDown) {
			this.Sprite.body.velocity.y = -150;
			this.Sprite.animations.play('top');
		} else if (this.cursors.down.isDown) {
			this.Sprite.body.velocity.y = 150;
			this.Sprite.animations.play('down');
		} else if (this.cursors.left.isDown) {
			this.Sprite.body.velocity.x = -150;
			this.Sprite.animations.play('left');
		} else if (this.cursors.right.isDown) {
			this.Sprite.body.velocity.x = 150;
			this.Sprite.animations.play('right');
		} else {
			this.Sprite.animations.stop(null, true);
		}

		this.x = this.Sprite.body.position.x;
		this.y = this.Sprite.body.position.y;
	};
}