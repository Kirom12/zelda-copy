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

		this.Monster = new Monster(100, 100);
		this.Player = new Player(100, 100);

		Log.Print("play - create");
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
		Game.Main.physics.arcade.collide(this.Monster.Sprite, this.Layers.collision);

		this.Monster.update();

		this.Player.update();
	};

	render()
	{
		//Game.Main.debug.body(this.Player.Sprite);
	};
}