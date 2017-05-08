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
		]
	};

	static preload()
	{

	};

	static create()
	{
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