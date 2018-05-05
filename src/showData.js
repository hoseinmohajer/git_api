import React from 'react';
class ShowData extends React.Component {
	constructor() {
		super();
		this.main = this.main.bind(this)
	}
	handleclick(id) {
		if(document.getElementById(id).style.display === "none"){
			document.getElementById(id).style.display = "inline";
		} else {
			document.getElementById(id).style.display = "none";
		}
	}
	main(value = null) {
		var that = this;
		return (
			this.props.data.map(function(item){
				return (
					<div key={item.id + 3}>
						<li key={item.id + 2} onClick={ that.handleclick.bind(that, item.id) }>
							{item.login}
							<div id={item.id} style={{'display': 'none'}} >
								<ul>
									<li>{item.followers_url}</li>
									<li>{item.id}</li>
									<li>{item.avatar_url}</li>
									<li>{(item.gravatar_id) ? "true" : "false"}</li>
									<li>{item.url}</li>
									<li>{item.html_url}</li>
									<li>{item.followers_url}</li>
									<li>{item.following_url}</li>
									<li>{item.gists_url}</li>
									<li>{item.starred_url}</li>
									<li>{item.subscriptions_url}</li>
									<li>{item.organizations_url}</li>
									<li>{item.repos_url}</li>
									<li>{item.events_url}</li>
									<li>{item.received_events_url}</li>
									<li>{item.type}</li>
									<li>{(item.site_admin) ? "true" : "false"}</li>
								</ul>
							</div>
						</li>
					</div>
				)
			})
		)
	}
	render() {
		return (
			<div>
				<hr/>
				<ul>
					{this.main()}
				</ul>
			</div>
		);
	}
}
export default ShowData;