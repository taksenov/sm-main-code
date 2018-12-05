import * as React from 'react';

const cx = require('classnames');
import './styles.css';

// Preloader for all processes
export default class Preloader extends React.PureComponent {
  public render() {
    return <div className={cx('loader')} />;
  }
}
