import React from 'react';
import {User} from './user';
import {MarkableText} from './markable-text'

export class Team extends React.Component {

	render() {
		const e = React.createElement;
		const membersDom = this.props.members.sort((a,b) => {

			if (a.id === this.props.leadId) {
				return -1;
			} else if (b.id === this.props.leadId) {
				return 1;
			} else {
				return a.id - b.id;	
			}

		}).map(member => ({
			key: member.id, 
			displayName: member.full_name,
			startIndexOfFilter: member.startIndexOfFilter,
			filterTextLength: member.filterTextLength, 
			id: member.id, 
			isLead: this.props.leadId===member.id
		})).map(member => e(User, member, null));

		return e(
			'div',
			{className: 'team-container bg-info'}, 
			e(
				'div', 
				{className: 'team-header'},
				e(
					'h5',
					{className: 'team-header-content m-4'},
					e(MarkableText,
					{
						text: this.props.name,
						index: this.props.startIndexOfFilter,
						length: this.props.filterTextLength
					}))
				),
			membersDom
			);

	}
};