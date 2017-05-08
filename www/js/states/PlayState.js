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
		
		Log.Print("play - create");
	};

	update()
	{
		this.Monster.update();
	};
}