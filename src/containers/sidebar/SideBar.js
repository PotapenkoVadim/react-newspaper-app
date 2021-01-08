import { Component } from 'react';
import { connect } from 'react-redux';
import styles from './SideBar.module.css';
import { sidebarModalChange, fetchSidebarNews } from '../../redux/actions';

//components
import { Notice } from '../../components/notice/Notice';
import { SideBarItem } from '../../components/sidebaritem/SideBarItem';
import { Modal } from '../../components/modal/Modal';

class SideBar extends Component {
  isEmpty () {
    if (!this.props.load && this.props.news.hits?.length) return true;
    else return false;
  }

  modalHandler = e => this.props.sidebarModalChange();
  handlerClick = e => this.props.sidebarModalChange();

  componentDidMount () {
    this.props.fetchSidebarNews(true);
  }

  render () {
    return (
      <div className={ styles.sidebar }>
        <Modal show={ this.props.modal } handler={ this.modalHandler }>
          <p>К сожалению, детальная информация новости, архитектурой приложения, не предусмотрена.</p>
        </Modal>
        <div className={ styles.display }>
          <h4>Latest World News</h4>
          <div className={ styles.lists }>
          { 
            this.props.load
              ? <Notice title='Loading please wait...' />
              : this.isEmpty()
                ? this.props.news.hits.map(v => <SideBarItem key={ v.created_at_i } data={ v } handler={ this.handlerClick } />)
                : <Notice title='Sorry. An error has occurred. Check your internet connection.' />
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  modal: state.sidebar.modal,
  load: state.sidebar.load,
  news: state.sidebar.news
});
export default connect( mapState, { sidebarModalChange, fetchSidebarNews } )(SideBar);