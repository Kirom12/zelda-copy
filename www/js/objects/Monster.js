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

		//modification du point d'ancrage du monstre et on le met au millieux
		this.sprite.anchor.set(0.5);

		this.sprite.scale.set(2);
    	this.sprite.smoothed = false;

    	//weapon
    	this.weapon;
    	this.weapon = Game.Main.add.weapon(10, 'bulletMonster');
		// on détruit les balles quand elles sortent de l'écran
		this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		// vitesse de la balle
		this.weapon.bulletSpeed = 600;
		//interval entre 2 tir
		this.weapon.fireRate = 1000;
		// on defini la ou parte les balles tirée par rapport au monstre
		this.weapon.trackSprite(this.sprite, 0, 0, true);

    	// on compte chaque seconde pour la direction du monstre.
		Game.Main.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

		Game.Main.physics.enable(this.sprite,Phaser.Physics.ARCADE);

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
			this.weapon.bulletAngleVariance = 360;
			this.weapon.fire();

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

		//si collision avec le bord de l'écran, on redéfini une direction
		if (this.sprite.x <= 0) //si touche à gauche, va à droite
		{
			this.direction = 2;
		}

		if (this.sprite.x >= 462) // si touche a droite, va a gauche
		{
			this.direction = 4;
		}

		if (this.sprite.y <= 0) // si touche en haut, va en bas
		{
			this.direction = 3;
		}

		if (this.sprite.y >= 462) // si touche en bas, va en haut
		{
			this.direction = 1;
		}
		
	};

	updateCounter()
	{
		this.timeDirectionRandom++;
	}
}