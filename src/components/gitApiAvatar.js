import React from 'react';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = {
	row: {
		display: 'flex',
		justifyContent: 'center',
	},
	pullLeft: {
		float: 'left'
	},
	avatar: {
		margin: 10,
	}
};

class GitApiAvatar extends React.Component {
	render () {
		const { classes } = this.props;
		return (
			<div className={classNames(classes.row, classes.pullLeft)}>
				<Avatar alt={ this.props.alt } src={ this.props.src } className={classes.avatar} />
			</div>
		);
	}
}

const AvatarWithStyle = withStyles(styles)(GitApiAvatar);
export default AvatarWithStyle;