import * as React from 'react';

const cx = require('classnames');
import './styles.css';

// прелоадер во всех подгурзках
export class Preloader extends React.PureComponent {
  public render() {
    return <div className={cx('loader')} />;
  }
}
