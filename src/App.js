import React from "react";
import Month from './Month.js';
import './App.css';

class App extends React.Component {

	constructor(props){
		super(props);

		this.state = { 
			users: []
		};
	}

	componentDidMount() {
		fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
	  	.then((response) => {
	   		return response.json();
	  	})
	  	.then((data) => {
		  	let mapUsers = new Map();
		  	data.forEach( user => {
		  		let date = new Date( user.dob );
		  		let month = date.getMonth();
		  		let usersGroup = mapUsers.get(month);
		  		if (!usersGroup){
		  			mapUsers.set(month, [user]);
		  		}
		  		else {
		  			usersGroup.push(user);
		  			mapUsers.set(month, usersGroup);
		  		}
			})

	  		let usersByMonth = Array.from(mapUsers).sort((a, b) => a[0] > b[0] ? 1 : -1);
	  		this.setState({ users: usersByMonth});
	  	});
	}

	render() {
		return (
			<>
                {
                	this.state.users.map(e => (
                    	< Month key={ e[0] } monthNumber={ e[0] } users={ e[1] } /> 
                	))
                }
            </>
		);
	}
}

export default App;