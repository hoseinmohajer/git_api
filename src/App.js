import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyList from './myList';

let url = (id = 0) => (`https://api.github.com/users?since=${id}`);
class App extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			origData: [],
			sortMsg: '',
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
	sort() {
		const value = this.refs.findInput.value;
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
		return (
			<div className="App" ref="iScroll">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Git API</h1>
				</header>
				<div className="header">
					<input ref="findInput" type="text" placeholder="sort by..." />
					<button onClick={this.sort.bind(this)} >Sort!</button>
					<div id="sortMsg"><span>Sort Resault:</span>&nbsp;{this.state.sortMsg}</div>
				</div>
				<br/>
				<div className="container">
					<MyList data={this.state.data} />
					{ (this.state.loadingState) ? <div id="loadingContainer" ref="loadingContainer">Loading...</div> : '' }
				</div>
			</div>
		);
	}
}

export default App;
