import React, { Fragment } from "react";
import './App.css';

const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Users extends React.Component {

	constructor(props){
		super(props);

		this.state = { 
			users: []
		};

		console.log("state", this.state.users);
	}

	componentDidMount() {
		fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
	  	.then((response) => {
	   		return response.json();
	  	})
	  	.then((data) => {
	  		// let monthes = data.map(obj => {
	  		// 	let date =	new Date(obj.dob );
	  		// 	return date.getMonth() + 1;
	  		// })
	  		// console.log("monthes", monthes);
		
	  	// let data = data.dob;
	  	// console.log("data", data);
	  	let mapUsers = new Map();
	  	// console.log("null", mapUsers);
	  	data.forEach( user => {
	  		let date = new Date( user.dob );
	  		let month = date.getMonth();

	  		console.log("2month", month);
	  		let usersGroup = mapUsers.get(month);
	  		if (!usersGroup){
	  			mapUsers.set(month, [user]);
	  		}
	  		else {
	  			usersGroup.push(user);
	  			mapUsers.set(month, usersGroup);
	  		}
	  		//mapUsers.set(month, user);
		})


	  	let usersByMonth = Array.from(mapUsers).sort((a, b) => a[0] > b[0] ? 1 : -1);
	  	console.log(usersByMonth);
	  	usersByMonth = usersByMonth.map(e => {
	  		e[0] = monthes[e[0]];
	  		return e;
	  	})

	  	this.setState({ users: usersByMonth});
	  	

	  	// let m = this.state.users;
	  	// console.log(Object.entries(m));
	  	
	  	// let roots = m.getMonth();
	 	
	  	});
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
		return (
			<>
                { this.state.users.map(e => (
                	<>
                    <p style={{ color: this.getColor(e[1].length) }} key={ e[0] }>{ e[0] }</p>
                    
                    { e[1].map(user => (
                    	<p key={ user.id} >{user.firstName + " " + user.lastName}</p>
                    ))}

                    </>
                ))}

            </>
		);
	}
}

export default Users;