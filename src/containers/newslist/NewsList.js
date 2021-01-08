import { Component } from 'react';
import styles from './NewsList.module.css';
import { connect } from 'react-redux';
import { newslistModalChange, fetchNewslistNews } from '../../redux/actions';

// components
import { Notice } from '../../components/notice/Notice';
import { NewsItem } from '../../components/newsitem/NewsItem';
import { Modal } from '../../components/modal/Modal';

class NewsList extends Component {
  handlerClick = () => this.props.newslistModalChange();
  modalHandler = () => this.props.newslistModalChange();
  isEmpty () {
    if (!this.props.load && this.props.news.hits?.length) return true;
    else return false;
  }

  componentDidMount () {
    this.props.fetchNewslistNews( this.props.query, true );
  }

  render () {
    return (
      <div className={ styles.display }>
        <Modal show={ this.props.modal } handler={ this.modalHandler }>
          <p>К сожалению, детальная информация новости, архитектурой приложения, не предусмотрена.</p>
        </Modal>
        { 
          this.props.load
            ? <Notice title='Loading please wait...' />
            : this.isEmpty()
              ? this.props.news.hits.map(v => <NewsItem key={ v.created_at_i } data={ v } handlerClick={ this.handlerClick } />)
              : <Notice title='Sorry. An error has occurred. Check your internet connection.' />
        }
      </div>
    );
  }
}

const mapState = state => ({
  load: state.newslist.load,
  modal: state.newslist.modal,
  news: state.newslist.news
});
export default connect( mapState, { newslistModalChange, fetchNewslistNews } )(NewsList);