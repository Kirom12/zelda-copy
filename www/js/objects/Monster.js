/**
 * Monster class
 **/
class Monster extends Character
{

	constructor(x, y, width, height)
	{
		super(x, y, width, height);
		this.sprite = Game.Main.add.sprite(x,y, 'monster');

		// les différentes animations du monstre
		this.sprite.animations.add('left', [0,1]);
		this.sprite.animations.add('bot', [2,3]);
		this.sprite.animations.add('right', [4,5]);
		this.sprite.animations.add('top', [6,7]);

		this.sprite.scale.set(2);
    	this.sprite.smoothed = false;

    	// on compte chaque seconde pour la direction du monstre.
		Game.Main.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

		//vitesse du monstre
    	this.speed = 2;

    	this.direction = 0; // 1 = haut, 2 = droite, 3 = bas, 4 = gauche, sinon stop

    	//timer de changement de direction du monstre
    	this.timeDirectionRandom = 0;
	};

	update()
	{

		//Toutes les 2 secondes, on défini une nouvelle direction et on reset le timer
		if (this.timeDirectionRandom >= 2)
		{
			this.direction = Math.round(Math.random()*4);
			this.timeDirectionRandom = 0;
		}

		//direction : 1 = haut, 2 = droite, 3 = bas, 4 = gauche, sinon stop
		if (this.direction == 1 && this.sprite.y >= 0)
		{
			this.sprite.animations.play('top', 8, true);
			this.sprite.y -= this.speed;
		}
		else if (this.direction == 2 && this.sprite.x <= 462)
		{
			this.sprite.animations.play('right', 8, true);
			this.sprite.x += this.speed;
		}
		else if (this.direction == 3 && this.sprite.y <= 462)
		{
			this.sprite.animations.play('bot', 8, true);
			this.sprite.y += this.speed;
		}
		else if (this.direction == 4 && this.sprite.x >= 0)
		{
			this.sprite.animations.play('left', 8, true);
			this.sprite.x -= this.speed;
		}
		else
		{
			this.sprite.x = this.sprite.x;
			this.sprite.y = this.sprite.y;
		}
	};

	updateCounter()
	{
		this.timeDirectionRandom++;
	}
}