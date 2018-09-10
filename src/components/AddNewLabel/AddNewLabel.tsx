import * as React from 'react';
import * as cx from 'classnames';

import './styles.css';

interface IAddNewLabelProps {
  handleInputChange: (event) => void;
  handleInputKeyDown: (event) => void;
  editValue: string;
}

const AddNewLabel: React.SFC<IAddNewLabelProps> = props => {
  const { editValue, handleInputChange, handleInputKeyDown } = props;

  return (
    <div>
      <label className={'labelAddNew'}>Нажми Enter для подтверждения</label>
      <input
        className={cx('inputEdit', 'inputAddNew')}
        type="text"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        value={editValue}
        placeholder={'Введи название группы'}
        autoFocus={true}
      />
    </div>
  );
};

export default AddNewLabel;
