import styles from './Modal.module.css';
export const Modal = ({ show, children, handler }) => (
  <div className={ `${styles.wrapper} ${show && styles.show}` } onClick={ handler }>
    <div className={ styles.modal }>
      <div className={ styles.body }>{ children }</div>
    </div>
  </div>
);