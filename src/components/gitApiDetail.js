import React from 'react';


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