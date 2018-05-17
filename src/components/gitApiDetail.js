import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from 'material-ui/Typography';

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

const url = (loginName) => `https://api.github.com/users/${loginName}`;

class GitApiDetail extends React.Component {
	constructor() {
		super();
		this.state = {
			data: ''
		}
	}
	componentWillMount() {
		const that = this;
		fetch(url(this.props.match.params.userLoginName))
			.then(
				response => response.json()
			)
			.then(
				data => that.setState({
					data: data
				})
			);
	}

	render() {
		const {classes} = this.props;
		return (
			<div>	
				<Avatar
	        alt={this.state.data.name}
	        src={this.state.data.avatar_url}
	        className={classNames(classes.avatar, classes.bigAvatar)}
	      />
	      <Typography gutterBottom variant="headline" component="h2">
					{this.state.data.name}
				</Typography>
	      <Typography gutterBottom variant="headline" component="h2">
					{`Followers:${this.state.data.followers || 0}`}
				</Typography>
	      <Typography gutterBottom variant="headline" component="h2">
					{`Following:${this.state.data.following || 0}`}
				</Typography>
	      <Typography gutterBottom variant="headline" component="h2">
					{`Created at:${this.state.data.created_at || 'yyyy-dd-mmThh:mm:ssZ'}`}
				</Typography>
	      <Typography gutterBottom variant="headline" component="h2">
					{`Updated at:${this.state.data.updated_at || 'yyyy-dd-mmThh:mm:ssZ'}`}
				</Typography>
			</div>	
		);
	}
}
const GitApiDetailWithStyle = withStyles(styles)(GitApiDetail);
export default GitApiDetailWithStyle;
