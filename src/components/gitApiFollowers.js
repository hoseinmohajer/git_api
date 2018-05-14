import React from 'react';
import { withStyles } from 'material-ui/styles';
import Badge from 'material-ui/Badge';

const styles = theme => ({
	badge: {
		margin: 50
	},
	margin: {
		margin: theme.spacing.unit * 2,
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	},
});

class GitApiFollowers extends React.Component {
	constructor() {
		super();
		this.state = {
			followers: ''
		}
	}
	componentWillMount() {
		this.followers(this.props.login);
	}
	followers(userName) {
		const that = this;
		fetch(`https://api.github.com/users/${userName}`)
			.then(response => response.json())
			.then(
				data => {
					that.setState({
						followers: data.followers
					});
				}
			);
	}
	render () {
		const { classes } = this.props;
		return (
			<div>
				<Badge className={classes.margin} badgeContent={this.state.followers} color="primary" >
					Followers
				</Badge>
			</div>
		);
	}
}

const GitApiFollowersWithStyle = withStyles(styles)(GitApiFollowers);
export default GitApiFollowersWithStyle;