var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'Anastasia'},
		{username:'Sarah'},
		{username:'Chad'}
	]);

	app.tasks = new IssueCollection([
		// test data here
	]);

	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
})
