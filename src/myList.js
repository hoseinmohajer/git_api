import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {Link, withRouter} from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
	root: {
		width: '100%',
		flexGrow: 1,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	link: {
		textDecoration: 'none'
	}
});
class MyList extends React.Component {
	detail() {
		const {classes} = this.props;
		return(
			<div className={classes.root}>
				<GridList cellHeight={300} className={classes.gridList} cols={4}>
					{
						this.props.data.map((item, index) => {
							 return (
								<GridListTile key={item.id} cols={1}>
									<Card>
										<CardMedia className={classes.media} image={item.avatar_url} title={item.login} />
										<CardContent>
											<Typography gutterBottom variant="headline" component="h2">
												{item.login}
											</Typography>
										</CardContent>
										<CardActions>
											<Link className={classes.link} target="_blank" to={item.html_url}>GitHub</Link>
											<Link className={classes.link} to={`/gitApiDetail/${item.login}`} >More...</Link>
										</CardActions>
									</Card>
								</GridListTile>
							);
						})
					}
				</GridList>
			</div>
		); 
	}

	render () {
		return (
			<div>
					{ this.detail() }
			</div>
		);
	}
}

const MyListWithStyle = withStyles(styles)(MyList);
export default withRouter(MyListWithStyle);
