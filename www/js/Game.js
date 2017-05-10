/**
 * Static Game class
 **/
class Game
{
	constructor(){};

	static Init()
	{
		Game.DivName = 'game';	
		Game.originalWidth = 256;
		Game.originalHeight = 176;
		Game.rescaleFactor = 2;
		Game.width = Game.originalWidth*Game.rescaleFactor;
		Game.height = Game.originalWidth*Game.rescaleFactor;

		Game.Main = new Phaser.Game(Game.width, Game.height, Phaser.Auto, Game.DivName,
		{
			preload : Game.preload,
			create : Game.create,
			update : Game.update,
			render : Game.render
		});

		Game.States =
		[
			{name : 'play', obj : new PlayState()}
		];

		Game.Map =
		{
			marginTop : 192,
			segmentWidth : 256*Game.rescaleFactor,
			segmentHeight : 176*Game.rescaleFactor,
			width : (256*Game.rescaleFactor)*3,
			height : (176*Game.rescaleFactor)*3
		};
	};

	static preload()
	{

		// Monster
		Game.Main.load.spritesheet('monster', 'assets/img/ZeldaOverlordEnnemies.png',24,24);
		// bullet monster
		Game.Main.load.spritesheet('bulletMonster', 'assets/img/ZeldaOverlordEnnemies.png',17,17);

		//Map
		Game.Main.load.tilemap('main-map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
		Game.Main.load.image('world-tiles', 'assets/img/world-tiles.png');
		Game.Main.load.image('HitBox-terrainNoPassable', 'assets/img/HitBox-terrainNoPassable.png');

		//Spritesheet
		Game.Main.load.spritesheet('link', 'assets/img/link.png', 28, 28);


	};

	static create()
	{
		//Start game physics
		Game.Main.physics.startSystem(Phaser.Physics.ARCADE);

		//Add all states to game
		for (let state of Game.States)
		{
			Game.Main.state.add(state.name, state.obj);
		}

		Game.Main.state.start('play');
	};

	static update()
	{

	};

	static render()
	{
		
	};
}