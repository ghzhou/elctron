import React from 'react';
import {MarkableText} from './markable-text';

export class User extends React.Component {
	render() {
		const e = React.createElement;
		return e(
			'div', 
			{className: 'member-container' + (this.props.isLead ? ' team-leader' : '')}, 
			e(
				'img', 
				{
					src: this.getAvatarUrl(this.props.id),
					className: 'avatar'
				}),
			e(
				'div', 
				{className: 'member-name'}, 
				e(MarkableText, {
					text: this.props.name,
					index: this.props.startIndexOfFilter,
					length: this.props.filterTextLength
				}))
			);		
	}

	getAvatarUrl(userId) {
		return 'https://octane-center.saas.hpe.com/api'+
		`/shared_spaces/${window.config.sharedSpaceId}`+
		`/workspaces/${window.config.workspaceId}`+
		`/workspace_users/${userId}/avatar?size=small`;
	}
};

