import React, { createContext } from 'react';
import { BACKEND_URL } from '../config';
import useFetch from '../hooks/useFetch';

const StriosContext = createContext({});

export const StriosProvider = ({ children }) => {
	const allStriosURL = `${BACKEND_URL}/strios`;
	const { apiData: allStriosData, isLoading } = useFetch(allStriosURL, 'get');

	return (
		<StriosContext.Provider value={{ allStriosData, isLoading }}>
			{children}
		</StriosContext.Provider>
	);
};

export default StriosContext;
