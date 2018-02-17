import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {TeamsBoard} from './teams-board';
import {Authenticator} from './authenticator';

const e = React.createElement;

async function loadTeams() {
	let result = await axios.get(
		`https://octane-center.saas.hpe.com/api/shared_spaces/${window.config.sharedSpaceId}/workspaces/${window.config.workspaceId}/teams?fields=name,team_lead,members`, 
		{
			headers: {hpeclienttype: 'HPE_MQM_UI'}
		});
	return result.data.data
	.reduce((accumulator, team) => {
		let activeMembers = team.members.data.filter(member => member.activity_level !== 1);
		let numberOfMembers = activeMembers.length;
		if (numberOfMembers > 0) {
			team.activeMembers = activeMembers;
			team.numberOfMembers = numberOfMembers;
			accumulator.push(team);
		}
		return accumulator;
	}, [])
	.sort((a,b) => a.numberOfMembers - b.numberOfMembers);
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


