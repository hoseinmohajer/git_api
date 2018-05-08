import React from 'react';
import ShowData from './showData';

class GetApi extends React.Component {  
	constructor() {
		super();
		this.state = {
			data: [],
			sortValue: 'sort value',
			sortResult: '',
			items: 10,
			loadingState: false,
			lastItemId: null,
			oldData: null
		}
		this.sort = this.sort.bind(this)
	}
	fetchDate(id = 0) {
		var that = this;
		fetch('https://api.github.com/users?since='+id).then(function (response) {
			return response.json();
		}).then(function (result) {
			let lastItem = result.length - 1;
			let pervData = that.state.data;
			for (var i = 0; i < result.length; i++) {
				pervData.push(result[i]);
			}
			that.setState({
				data: pervData,
				lastItemId: result[lastItem].id,
				loadingState: false
			});
		});
	}
	componentWillMount() {
		this.fetchDate();
	}
	componentDidMount() {
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
		let value = this.refs.myTextInput.value;
		const filteredItems = this.state.data.filter(function(item){
			return (item.login.substring(0,1) === value)
		});
		this.setState({
			data: filteredItems,
			sortResult: `${filteredItems.length} items found.`,
			sortValue: value
		});
	}
	render() {
		return (
			<div
				className="vc"
				ref="iScroll"
				style={{"height": "600px", "overflow":"auto"}}
			>
				<input ref="myTextInput" type='text' />
				<button onClick={ this.sort } >sort</button>
				<h2>Sort By: {this.state.sortValue}</h2>
				<h3>result: {this.state.sortResult}</h3>
				<ShowData data={this.state.data} />
				{
					this.state.loadingState
					? 
						<p className="loading">
							loading More Items..
						</p>
					:
						""
				}
			</div>
		);
	}
}

export default GetApi;
