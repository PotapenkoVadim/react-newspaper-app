import React from 'react';
import styles from './SearchWidget.module.css';
export const SearchWidget = ({ value, change, click, keypress }) => (
	<div className={ styles.search } onKeyPress={ keypress }>
		<input type='search' placeholder="Type to search" onChange={ change } value={ value } />
		<button onClick={ click }><i className='fa fa-search'></i></button>
	</div>
);