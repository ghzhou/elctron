import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Team} from './Team';
import {Authenticator} from './Authenticator';


async function loadTeams() {
	let result = await axios.get(
		`https://octane-center.saas.hpe.com/api/shared_spaces/${window.config.sharedSpaceId}/workspaces/${window.config.workspaceId}/teams?fields=name,team_lead,members,number_of_members`, 
		{
			headers: {hpeclienttype: 'HPE_MQM_UI'}
		});
	return result.data.data
	.filter(team => team.number_of_members>0)
	.sort((a,b) => a.number_of_members - b.number_of_members);
}

async function main() {
	await new Authenticator(window.config.email, window.config.password).authenticate();
	let teams = await loadTeams();
	const e = React.createElement;
	ReactDOM.render(
		teams
		.map(team => ({key: team.id, name: team.name, members: team.members.data, leadId: team.team_lead && team.team_lead.id}))
		.map(team => e(Team, team, null)),
		document.getElementById('root')
		);
}

main();


