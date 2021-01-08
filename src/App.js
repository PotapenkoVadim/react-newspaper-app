import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.css';

import { setQueryParams } from './redux/actions';

// containers
import { Header } from './containers/header/Header';
import NewsList from './containers/newslist/NewsList';
import SideBar from './containers/sidebar/SideBar';
// components
import { SearchWidget } from './components/searchwidget/SearchWidget';

class App extends Component {
  state = { string: '' };

  handlerSearch = ({ target }) => {
    this.setState({ string: target.value });
  };

  handlerClick = ({ target }) => {
    let value = '';
    if (target.nodeName === 'I')
      value = target.parentElement.previousElementSibling.value;
    else 
      value = target.previousElementSibling.value;

    this.setState({ string: '' });
    this.props.setQueryParams(value);
  };

  handlerKeyPress = e => {
    if (e.code === 'Enter') {
      this.setState({ string: '' });
      this.props.setQueryParams(e.target.value);
    }
  }

  render () {
    return (
      <div className={ styles.app }>
        <Header>
            <SearchWidget
              keypress = { this.handlerKeyPress }
              change={ this.handlerSearch }
              click={ this.handlerClick }
              value={ this.state.string }
            />
        </Header>
        <NewsList key={ this.props.query } query={ this.props.query } />
        <SideBar />
      </div>
    );
  }
}

const mapState = state => ({ query: state.app.query });
export default connect( mapState, { setQueryParams } )(App);