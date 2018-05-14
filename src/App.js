import React, { Component } from 'react';
import './App.css';
import MyList from './myList';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
  	overflow: 'auto',
  	height: 674,
		flexGrow: 1,
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

let url = (id = 0) => (`https://api.github.com/users?since=${id}`);
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			origData: [],
			sortMsg: 'Sort',
			loadingState: false,
			lastItemId: null
		}
		this.sort = this.sort.bind(this);
	}

	fetchDate(id) {
		let thiz = this;
		fetch( url(id) ).then(
			response => (response.json()).then(
				data => { 
					let allLoadedData = thiz.state.data;
					for (let i = 0; i < data.length; i++) {
						allLoadedData.push(data[i]);
					}
					thiz.setState({ data: allLoadedData, origData: allLoadedData, lastItemId: data[ data.length-1 ].id, loadingState: false })
				}	
			)
		)
	}
	componentDidMount() {
		this.fetchDate(0);	
		this.refs.iScroll.addEventListener("scroll", () => {
			if ( this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight ) {
				this.loadMoreItems();
			}
		});
	}
	loadMoreItems() {
		if(this.state.loadingState){
			return;
		}
		this.setState({ loadingState: true });
		this.fetchDate(this.state.lastItemId);
	}
	sort(event) {
		const value = event.target.value;
		if (value === '' || value === null) {
			this.setState({
				data: this.state.origData,
				sortMsg: 'You have to fill the textbox!'
			});
		} else {
			const filteredArray = this.state.data.filter((item, index) => (
				(item.login.substring(0,1) === value)
			));
			this.setState({
				data: (filteredArray.length === 0) ? this.state.origData : filteredArray,
				sortMsg: `${filteredArray.length} items found.`
			});
		}
	}
	render() {
		// deconstruct
		const {classes} = this.props;
		return (
			<div className={classes.root} ref="iScroll">
				<AppBar position="static">
					<Toolbar>
						<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
							<MenuIcon />
						</IconButton>
						<Typography variant="title" color="inherit" className={classes.flex}>
							Git API
						</Typography>
						<form className={classes.container} noValidate autoComplete="off">
							<TextField
								id="sort"
								label={this.state.sortMsg}
								className={classes.textField}
								onChange={this.sort}
								margin="normal"
							/>
						</form>  
					</Toolbar>
				</AppBar>
					<MyList data={this.state.data} />
					{ (this.state.loadingState) ? <div id="loadingContainer" ref="loadingContainer">Loading...</div> : '' }
			</div>
		);
	}
}

const AppWithStyles = withStyles(styles)(App);
export default AppWithStyles;
