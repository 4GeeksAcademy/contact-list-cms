import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {Context} from "../store/appContext.js"


export const Navbar = () => {
	const {store} = useContext(Context)
	

	     
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			
			<div className="ml-auto">
				
		 	</div> 
		</nav>  
	);  
};
