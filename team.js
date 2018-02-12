import React from 'react';
import {User} from './User';

export class Team extends React.Component {

	render() {
		const activeUsers = this.props.members
		.filter(member => member.activity_level !== 1);
		if (activeUsers.length === 0) {
			return '';
		};

		const numColumns = 4;
		const e = React.createElement;
		const rowsOfUsers = activeUsers.sort((a,b) => {

			if (a.id === this.props.leadId) {
				return -1;
			} else if (b.id === this.props.leadId) {
				return 1;
			} else {
				return a.id - b.id;	
			}

		}).reduce((result, item, i) => { 

			const ix = Math.floor(i/numColumns); 
			if(!result[ix]) {
				result[ix] = [];
			}
			result[ix].push(item);
			return result;

		}, []).map(membersChuck => {

			const cols = membersChuck.map(member => ({
				key: member.id, 
				displayName: member.full_name, 
				id: member.id, 
				isLead: this.props.leadId===member.id
			})).map(member => e(User, member, null));

			return e('div', {className: 'team-row'}, cols);
		});


		return e(
				'div',
				{className: 'team-container bg-info'}, 
				e(
					'div', 
					{className: 'team-header'},
					e(
						'h5',
						{className: 'team-header-content m-4'},
						this.props.name
					)
				),
				rowsOfUsers
			);

	}
};