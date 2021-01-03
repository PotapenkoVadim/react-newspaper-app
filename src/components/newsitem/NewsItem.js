import styles from './NewsItem.module.css';
export const NewsItem = ({ data, handlerClick }) => (
  <div className={ styles.item } onClick={ handlerClick }>
    <p className={ styles.title }>{ data.title || 'No title.' }</p>
    <div className={ styles.block }>
      <p>Author: { data.author || 'No author' }</p>
      <p><i className='fa fa-comments-o'></i> { data.num_comments || 0 }</p>
      <p>Created: { (new Date(data.created_at)).toLocaleDateString() }</p>
    </div>
  </div>
);