/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default function PageNavigation(props)  {
	const {
		      loading,
		      showPrevLink,
		      showNextLink,
		      handlePrevClick,
		      handleNextClick,
	      } = props;
	return (
		<div className="nav-link-container">
			
			<a
				href="#"
				className={
					` 
					${ showPrevLink ? ' nav-link show' : 'hide'}
					${ loading ? 'greyed-out' : ''
					}`
				}
				onClick={ handlePrevClick }
			>
				Prev
			</a>
			<a
				href="#"
				className={
					` 
					${ showNextLink ? ' nav-link show' : 'hide'}
					${ loading ? 'greyed-out' : '' }
					`}
				onClick={ handleNextClick }
			>
				Next
			</a>
		</div>
	)
}
