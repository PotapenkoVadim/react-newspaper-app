import { Component } from 'react';
import styles from './Header.module.css';

export class Header extends Component {
  render () {
    return (
      <div className={ styles.header }>
        <span className={ styles.logo }>News Paper App</span>
        { this.props.children }
      </div>
    );
  }
}