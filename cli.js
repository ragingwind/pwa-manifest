'use strict';

var inquirer = require('inquirer');
var palette = require('./assets/material-palette.json');
const ansiStyle = require('ansi-styles');

function colorChoices() {
	var choices = [ansiStyle.white.open + 'default' + ansiStyle.white.close];
	var ansiable = palette.ansiable;

	for (const c in ansiable) {
		if (ansiable.hasOwnProperty(c)) {
			choices.push({
				key: c,
				name: ansiStyle[c].open + ansiable[c] + ansiStyle[c].close,
				value: ansiable[c]
			});
		}
	}

	return choices;
}

var questions = [{
	type: 'list',
	name: 'theme',
	message: 'Theme color',
	choices: colorChoices()
}];

inquirer.prompt(questions, function (answers) {
	console.log(JSON.stringify(answers, null, '  '));
});
