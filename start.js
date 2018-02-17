import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {TeamsBoard} from './teams-board';
import {Authenticator} from './authenticator';

const e = React.createElement;

async function loadTeams() {
	let result = await axios.get(
		`https://octane-center.saas.hpe.com/api/shared_spaces/${window.config.sharedSpaceId}/workspaces/${window.config.workspaceId}/teams?fields=name,team_lead,members,number_of_members`, 
		{
			headers: {hpeclienttype: 'HPE_MQM_UI'}
		});
	return result.data.data
	.filter(team => team.number_of_members>0)
	.filter(team => {
		return team.members.data.find(member => member.activity_level !== 1);
	})
	.sort((a,b) => a.number_of_members - b.number_of_members);
}

function showLoading() {
	ReactDOM.render(
		e('div', null, e('h1', {className: 'loading'}, 'Loading...')),
		document.getElementById('root')
		);
}

async function main() {
	showLoading();
	await new Authenticator(window.config.email, window.config.password).authenticate();
	let teams = await loadTeams();
	ReactDOM.render(
		e(TeamsBoard, {teams: teams}),
		document.getElementById('root')
		);
}

main();


