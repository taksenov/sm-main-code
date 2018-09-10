import * as React from 'react';

const arrow = require('./assets/images/arrow.svg');
const arrowClose = require('./assets/images/arrowClose.svg');

interface IAccordeonSwitcherProps {
  handleClickAccordeonOpen: () => void;
  isAccordeonOpen: boolean;
}

const AccordeonSwitcher: React.SFC<IAccordeonSwitcherProps> = props => {
  const { isAccordeonOpen, handleClickAccordeonOpen } = props;

  return (
    <div onClick={handleClickAccordeonOpen}>
      {!isAccordeonOpen && <img src={arrow} alt="Open" width={18} />}
      {isAccordeonOpen && <img src={arrowClose} alt="Close" width={18} />}
    </div>
  );
};

export default AccordeonSwitcher;
