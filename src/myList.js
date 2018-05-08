import React from 'react';

class MyList extends React.Component {
	detail() {
		let namesArray = [];
		this.props.data.map((item, index) => {
			let detailArray = [];
			for(let key in item) {
				detailArray.push(<li key={key}><b>{key}: </b>{item[key]}</li>);
			}
			return namesArray.push(
				<li key={index}>
					{item.login}&nbsp;
					<a className="detail" onClick={this.toggleDetail.bind(this, item.login)}>more...</a>
					<ol className="hide" key={item.login} ref={item.login}>
						{detailArray}
					</ol>	
				</li>
			);
		});
		return namesArray;
	}
	toggleDetail(id) {
		for (let key in this.refs) {
			if(key === id) {
				this.refs[key].className = (this.refs[key].className === 'hide') ? 'show' : 'hide';
			}
		}
	}
	render () {
		return (
			<ol>
				{ this.detail() }
			</ol>
		);
	}
}

export default MyList;