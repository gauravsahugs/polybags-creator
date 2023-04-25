import React from 'react';

const MandatoryFields = () => {
	return (
		<div className='required__div'>
			<sup>*</sup>
			<p className='required__text'>indicates a Required field</p>
		</div>
	);
};

export default MandatoryFields;
