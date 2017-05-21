import React from 'react';
import { Main as styles } from '../styles';

const Main = props => (<div className={styles.message}>
  <div className={styles.data} {...props} />
</div>);

export default Main;
