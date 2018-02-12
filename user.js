import React from 'react';

export class User extends React.Component {
	render() {
		const e = React.createElement;
		return e(
			'div', 
			{className: 'member-container' + (this.props.isLead ? ' lead' : '')}, 
			e(
				'img', 
				{
					src: this.getAvatarUrl(this.props.id),
					className: 'avatar'
				}),
			e(
				'div', 
				{className: 'member-name'}, 
				this.props.displayName)
			);		
	}

	getAvatarUrl(userId) {
		return `https://octane-center.saas.hpe.com/api/shared_spaces/1001/workspaces/1002/workspace_users/${userId}/avatar?size=small`;
	}
};

