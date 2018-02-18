import React from 'react';
import {Team} from './team';

export class TeamsBoard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {filter: ''};
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.highlightFilterText = this.highlightFilterText.bind(this);
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

	highlightFilterText(accu, member) {
		let index = member.full_name.toLowerCase().indexOf(this.state.filter.toLowerCase());
		member.startIndexOfFilter = index;
		member.filterTextLength = this.state.filter.length;
		if (index >= 0) {
			accu = true;
		}
		return accu || false;
	};

	getTeamsDom() {
		let dom =  this.props.teams
		.reduce((accu, team) => {
			let filterText = this.state.filter.toLowerCase();
			if (filterText.length > 0) {
				let anyMemberMatchesFilter = team.activeMembers.reduce(this.highlightFilterText, false);
				let index = team.name.toLowerCase().indexOf(filterText);
				team.startIndexOfFilter = index;
				if (index >= 0 || anyMemberMatchesFilter) {
					accu.push(team);
				}
			} else {
				team.startIndexOfFilter = -1;
				team.filterTextLength = 0;
				team.activeMembers.forEach(member => {
					member.startIndexOfFilter = -1;
					member.filterTextLength = 0;
				});
				accu.push(team);
			}
			return accu;
		}, [])
		.map(team => ({
			key: team.id,
			name: team.name,
			startIndexOfFilter: team.startIndexOfFilter,
			filterTextLength: this.state.filter.length,
			members: team.activeMembers,
			leadId: team.team_lead && team.team_lead.id
		}))
		.map(team => React.createElement(Team, team, null));
		return React.createElement('div', null, dom)
	}

	handleFilterChange(event) {
		this.setState({filter: event.target.value});
	}
}
