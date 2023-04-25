import jwtDecode from 'jwt-decode';
import React, { useState, createContext, useEffect } from 'react';
import { Role } from '../constants/Role';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const token = localStorage.getItem(process.env.REACT_APP_TOKEN);
	const [auth, setAuth] = useState({
		isLoggedIn: token !== null ? jwtDecode(token).name !== null : false, //It will return null if name key not present in LS
		isAdmin:
			token !== null
				? jwtDecode(token).role === Role.SUPER ||
				  jwtDecode(token).role === Role.ADMIN
				: false, //It will return null if isAdmin  key not present in LS
		name: token !== null ? jwtDecode(token).name : null,
	});

	return (
		<AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
