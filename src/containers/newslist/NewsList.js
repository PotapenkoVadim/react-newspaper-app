import { Component } from 'react';
import styles from './NewsList.module.css';
import { HOST, METHOD_SEARCH, QUERY_PARAMS } from '../../configs/hnconfigs';

// components
import { Notice } from '../../components/notice/Notice';
import { NewsItem } from '../../components/newsitem/NewsItem';
import { Modal } from '../../components/modal/Modal';

export class NewsList extends Component {
  state = {
    load: true,
    modal: false,
    news: {},
    url: `${HOST}${METHOD_SEARCH}?${QUERY_PARAMS}`
  };

  handlerClick = e => {
    this.setState({ modal: true });
  };

  modalHandler = e => {
    this.setState({ modal: false });
  }

  isEmpty () {
    if (!this.state.load && this.state.news.hits?.length) return true;
    else return false;
  }

  componentDidMount () {
    let url = this.state.url + this.props.query;
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState({
          load: false,
          news: result
        });
      })
      .catch(error => {
        this.setState({ load: false });
      });
  }

  render () {
    return (
      <div className={ styles.display }>
        <Modal show={ this.state.modal } handler={ this.modalHandler }>
          <p>К сожалению, детальная информация новости, архитектурой приложения, не предусмотрена.</p>
        </Modal>
        { 
          this.state.load
            ? <Notice title='Loading please wait...' />
            : this.isEmpty()
              ? this.state.news.hits.map(v => <NewsItem key={ v.created_at_i } data={ v } handlerClick={ this.handlerClick } />)
              : <Notice title='Sorry. An error has occurred. Check your internet connection.' />
        }
      </div>
    );
  }
}