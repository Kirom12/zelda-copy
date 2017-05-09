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

		this.Monster = new Monster(100,100);
		

		//this.CreateMap();

		this.Player = new Player(100, 100);


		Log.Print("play - create");
	};

	CreateMap()
	{
		this.Map = Game.Main.add.tilemap('main-map');

		this.Map.addTilesetImage('world-tiles');

		this.Layers = 
		{
			main : this.Map.createLayer('main'),
			collision : this.Map.createLayer('collision')
		}

		this.Layers.main.setScale(Game.rescaleFactor);
		this.Layers.main.resizeWorld();

	};

	update()
	{

		this.Monster.update();

		this.Player.update();

	};
}