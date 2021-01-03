import styles from './SideBarItem.module.css';
export const SideBarItem = ({ data, handler }) => (
  <div className={ styles.item } onClick={ handler }># { data.title }</div>
);