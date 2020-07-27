import React from "react";

const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Month extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isShown: false
		} 

	}

	getColor(usersCount) {
		if(usersCount <= 2)
			return "gray";
		else if(usersCount <= 6)
			return "blue";
		else if(usersCount <= 10)
			return "green";
		else
			return "red";

	}

	render() {
		let { monthNumber, users } = this.props;
		return (
			<div className="wrap"
				onMouseEnter={() => this.setState({ isShown: true })}
        		onMouseLeave={() => this.setState({ isShown: false })}
        	>
				<h1 className="month" style={{ color: this.getColor(users.length) }}>{ monthes[monthNumber] }</h1>
				<div style={{ display: this.state.isShown ? "block" : "none" }}>
					{
						users.map(user => (
                    		<p key={ user.id} >{user.firstName + " " + user.lastName}</p>
                    	))
                    }
				</div>
			</div>
		)	
	}
}


export default Month;