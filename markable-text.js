import React from 'react';

export class MarkableText extends React.Component {
	render() {
		const e = React.createElement;
		if (this.props.index >= 0 && this.props.length > 0) {
			let firstPart = this.props.text.slice(0, this.props.index);
			let secondPart = this.props.text.slice(this.props.index, this.props.index + this.props.length);
			let thirdPart = this.props.text.slice(this.props.index + this.props.length);
			return e('p', null, firstPart, e('mark', null, secondPart), thirdPart);
		} else {
			return e('p', null, this.props.text);
		}
	}
}