if (process.env.REACT_APP_ENV === 'development')
	module.exports = {
		BACKEND_URL: process.env.REACT_APP_DEV_BACKEND,
	};
else if (process.env.REACT_APP_ENV === 'local')
	module.exports = {
		BACKEND_URL: process.env.REACT_APP_LOCAL_BACKEND,
	};
else
	module.exports = {
		BACKEND_URL: process.env.REACT_APP_BACKEND,
	};
