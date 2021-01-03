import { Component } from 'react';
import styles from './SideBar.module.css';
import { HOST, METHOD_SEARCH, SORT_PARAMS, QUERY_PARAMS } from '../../configs/hnconfigs';

//components
import { Notice } from '../../components/notice/Notice';
import { SideBarItem } from '../../components/sidebaritem/SideBarItem';
import { Modal } from '../../components/modal/Modal';

export class SideBar extends Component {
  TIME = Date.now() / 1000;
  state = {
    load: true,
    modal: false,
    start: this.TIME - 99999900,
    end: this.TIME,
    news: {}
  };

  isEmpty () {
    if (!this.state.load && this.state.news.hits?.length) return true;
    else return false;
  }

  modalHandler = e => {
    console.log('click');
    this.setState({ modal: false });
  }

  handlerClick = e => {
    this.setState({ modal: true });
  };

  componentDidMount () {
    const { start, end } = this.state;
    fetch(`${HOST}${METHOD_SEARCH}?${QUERY_PARAMS}&${SORT_PARAMS}created_at_i>${start},created_at_i<${end}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          load: false,
          news: result
        });
      })
      .catch(error => error);
  }

  render () {
    return (
      <div className={ styles.sidebar }>
        <Modal show={ this.state.modal } handler={ this.modalHandler }>
          <p>К сожалению, детальная информация новости, архитектурой приложения, не предусмотрена.</p>
        </Modal>
        <div className={ styles.display }>
          <h4>Latest World News</h4>
          <div className={ styles.lists }>
          { 
            this.state.load
              ? <Notice title='Loading please wait...' />
              : this.isEmpty()
                ? this.state.news.hits.map(v => <SideBarItem key={ v.created_at_i } data={ v } handler={ this.handlerClick } />)
                : <Notice title='Sorry. News not found.' />
          }
          </div>
        </div>
      </div>
    );
  }
}