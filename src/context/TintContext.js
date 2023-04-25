import React, { createContext } from 'react';
import { BACKEND_URL } from '../config';
import useFetch from '../hooks/useFetch';

const TintContext = createContext({});

export const TintProvider = ({ children }) => {
	const allTintURL = `${BACKEND_URL}/tints`;
	const { apiData: allTintData, isLoading } = useFetch(allTintURL, 'get');
	return (
		<TintContext.Provider value={{ allTintData }}>
			{children}
		</TintContext.Provider>
	);
};

export default TintContext;
