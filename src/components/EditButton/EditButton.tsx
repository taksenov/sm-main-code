import * as React from 'react';
import * as cx from 'classnames';

import './styles.css';

const penWhite = require('./assets/images/penWhite.svg');

interface IEditButtonProps {
  handleClickEdit: () => void;
  isHover: boolean;
}

const EditButton: React.SFC<IEditButtonProps> = props => {
  const { isHover, handleClickEdit } = props;

  return (
    <div className={cx('itemActions', isHover && 'isHover')}>
      <div className={'edit'} onClick={handleClickEdit}>
        <img src={penWhite} alt="Edit" width={24} />
      </div>
    </div>
  );
};

export default EditButton;
