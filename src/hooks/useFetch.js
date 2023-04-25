import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (apiURL, method) => {
	const [apiData, setApiData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errorOccurred, setErrorOccurred] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		const fetchingApiData = async () => {
			try {
				const response = await axios({
					method: method.toLowerCase(),
					url: apiURL,
				});
				const data = await response?.data;

				setApiData(data);
				setIsLoading(false);
			} catch (error) {
				setErrorOccurred(error);
				setIsLoading(false);
			}
		};
		fetchingApiData();

		// const timer = setTimeout(() => {
		// 	fetchingApiData();
		// }, 3000);
		// return () => clearTimeout(timer);
	}, [apiURL, method]);

	if (errorOccurred) {
		console.error(errorOccurred.message);
	}
	return { apiData, isLoading, errorOccurred };
};

export default useFetch;
