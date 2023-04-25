import React, { createContext } from 'react';
import { BACKEND_URL } from '../config';
import useFetch from '../hooks/useFetch';

const PrintingContext = createContext({});

export const PrintingProvider = ({ children }) => {
	const allPrintingURL = `${BACKEND_URL}/printings`;

	const { apiData: allPrintingData, isLoading } = useFetch(
		allPrintingURL,
		'get'
	);
	return (
		<PrintingContext.Provider value={{ allPrintingData }}>
			{children}
		</PrintingContext.Provider>
	);
};

export default PrintingContext;
