import React from 'react';

class GitApiDetail extends React.Component {
	
	render() {
		return (
			<h1><i>User loginName is: </i> <u>{this.props.match.params.userLoginName}</u></h1>
		);
	}
}
export default GitApiDetail;