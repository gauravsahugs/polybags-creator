import React, { createContext, useState } from 'react';
import { BACKEND_URL } from '../config';
import useFetch from '../hooks/useFetch';

const FilmContext = createContext({});

export const FilmProvider = ({ children }) => {
	const [filmData, setFilmData] = useState([]);

	const allFilmsURL = `${BACKEND_URL}/films`;
	const { apiData: allFilmsData, isLoading } = useFetch(allFilmsURL, 'get');
	return (
		<FilmContext.Provider value={{ allFilmsData, isLoading, filmData }}>
			{children}
		</FilmContext.Provider>
	);
};
export default FilmContext;
