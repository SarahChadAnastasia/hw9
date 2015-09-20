var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Anastasia'},
		{username:'Sarah'},
		{username:'Chad'}
	]);

	app.tasks = new TaskCollection([
		// test data here
	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
}
//comment 
