import React from 'react';
import {Team} from './team';

export class TeamsBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {filter: ''};
		this.handleFilterChange = this.handleFilterChange.bind(this);
	}

	render() {
		return React.createElement('div', null, this.getFilterDom(), this.getTeamsDom());
	}

	getFilterDom() {
		const e = React.createElement;
		return e('div',
			{className: 'm-3'},
			e('label',
				null,
				'Search for: ',
				e('input', {
					type: 'text',
					value: this.state.filter,
					onChange: this.handleFilterChange
				}))
			)
	}

	getTeamsDom() {
		let dom =  this.props.teams
		.filter(team => {
			return team.members.data.find(member => 
				member.full_name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0);
		})
		.map(team => ({
			key: team.id,
			name: team.name,
			members: team.members.data,
			leadId: team.team_lead && team.team_lead.id
		}))
		.map(team => React.createElement(Team, team, null));
		return React.createElement('div', null, dom)
	}

	handleFilterChange(event) {
		this.setState({filter: event.target.value});
	}
}
