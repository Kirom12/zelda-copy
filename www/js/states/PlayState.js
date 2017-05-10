/**
 * PlayState class
 **/
class PlayState
{
	constructor(){};

	preload()
	{
		Log.Print("play - preload");
	};

	create()
	{
		this.CreateMap();
		this.CreateInfo();

		Game.Main.world.bounds.setTo(0, Game.height-Game.Map.segmentHeight, Game.width, Game.Map.segmentHeight);

		Game.Main.physics.setBoundsToWorld();

		this.Monster = new Monster(250, 250);
		this.Player = new Player(250, 250);

		Log.Print("play - create");
	};

	CreateInfo()
	{
		let graphics = Game.Main.add.graphics(0, 0);

		graphics.beginFill('#000');
    	graphics.drawRect(0, 0, Game.width, Game.height-Game.Map.segmentHeight);
	};

	CreateMap()
	{
		this.Map = Game.Main.add.tilemap('main-map');

		this.Map.addTilesetImage('world-tiles');
		this.Map.addTilesetImage('HitBox-terrainNoPassable');

		this.Layers = 
		{
			main : this.Map.createLayer('main'),
			collision : this.Map.createLayer('collision')
		}

		this.Layers.main.setScale(Game.rescaleFactor);
		this.Layers.main.resizeWorld();
		this.Layers.main.fixedToCamera = false;
		this.Layers.main.position.set(-Game.Map.segmentWidth,-(Game.Map.segmentHeight*2)+Game.Map.marginTop);

		this.Layers.collision.setScale(Game.rescaleFactor);
		this.Layers.collision.resizeWorld();
		this.Layers.collision.alpha = 0;
		this.Layers.collision.fixedToCamera = false;
		this.Layers.collision.position.set(-Game.Map.segmentWidth,-(Game.Map.segmentHeight*2)+Game.Map.marginTop);

		this.Map.setCollisionBetween(1, 200, true, this.Layers.collision);
	};

	update()
	{
		Game.Main.physics.arcade.collide(this.Player.Sprite, this.Layers.collision);

		this.Monster.update();

		this.Player.update();

		//Change map
		if (this.Player.x < 10)
		{
			this.Player.Sprite.x = Game.Map.segmentWidth - 60;
			this.Layers.main.position.set(this.Layers.main.position.x+Game.Map.segmentWidth, this.Layers.main.position.y);
			this.Layers.collision.position.set(this.Layers.collision.position.x+Game.Map.segmentWidth, this.Layers.collision.position.y);
		}
		else if (this.Player.x > Game.Map.segmentWidth - this.Player.Sprite.width)
		{
			this.Player.Sprite.x = 10;
			this.Layers.main.position.set(this.Layers.main.position.x-Game.Map.segmentWidth, this.Layers.main.position.y);
			this.Layers.collision.position.set(this.Layers.collision.position.x-Game.Map.segmentWidth, this.Layers.collision.position.y);
		}
		else if (this.Player.y < Game.Map.marginTop - 20)
		{
			this.Player.Sprite.y =  Game.Map.segmentHeight + 110;
			this.Layers.main.position.set(this.Layers.main.position.x, this.Layers.main.position.y+Game.Map.segmentHeight);
			this.Layers.collision.position.set(this.Layers.collision.position.x, this.Layers.collision.position.y+Game.Map.segmentHeight);

		}
		else if (this.Player.y > Game.Map.segmentHeight + Game.Map.marginTop - 70)
		{
			console.log("change bottom");
			this.Player.Sprite.y =  Game.Map.marginTop - 20;
			this.Layers.main.position.set(this.Layers.main.position.x, this.Layers.main.position.y-Game.Map.segmentHeight);
			this.Layers.collision.position.set(this.Layers.collision.position.x, this.Layers.collision.position.y-Game.Map.segmentHeight);
		}
	};

	PlayerMonsterCollide()
	{
		console.log('collide');
	};

	render()
	{
		Game.Main.debug.spriteInfo(this.Player.Sprite, 10, 20);
	};
}