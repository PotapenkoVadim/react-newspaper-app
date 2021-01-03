import React, { Component } from 'react';
import styles from './App.module.css';

// containers
import { Header } from './containers/header/Header';
import { NewsList } from './containers/newslist/NewsList';
import { SideBar } from './containers/sidebar/SideBar';
// components
import { SearchWidget } from './components/searchwidget/SearchWidget';

export class App extends Component {
  state = {
    string: '',
    query: ''
  };

  handlerSearch = ({ target }) => {
    this.setState({ string: target.value });
  };

  handlerClick = ({ target }) => {
    let value = '';
    if (target.nodeName === 'I')
      value = target.parentElement.previousElementSibling.value;
    else 
      value = target.previousElementSibling.value;

    this.setState({
      string: '',
      query: value
    });
  };

  handlerKeyPress = e => {
    if (e.code === 'Enter') {
      this.setState({
        string: '',
        query: e.target.value
      });
    }
  }

  render () {
    return (
      <div className={ styles.app }>
        <Header>
            <SearchWidget
              click={ this.handlerClick }
              change={ this.handlerSearch }
              value={ this.state.string }
              keypress = { this.handlerKeyPress }
            />
        </Header>
        <NewsList key={ this.state.query } query={ this.state.query } />
        <SideBar />
      </div>
    );
  }
}