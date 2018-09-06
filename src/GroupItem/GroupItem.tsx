import * as React from 'react';
import { toastr } from 'react-redux-toastr';

import { Preloader } from '../Preloader';

const cx = require('classnames');
// const styles = require('./css');
import './styles.css';
const penWhite = require('./assets/images/penWhite.svg');
const archiveWhite = require('./assets/images/archiveWhite.svg');
const arrow = require('./assets/images/arrow.svg');
const arrowClose = require('./assets/images/arrowClose.svg');
const initialState = {
  isProcessing: false,
  isEdit: false,
  isHover: false,
  isUsual: false,
  isInitial: false,
  isAccordeonOpen: false,
  isAddNew: false,
  error: null,
  value: null,
  editValue: null,
};
const MAX_SYMBOLS_IN_NAME = 42;

interface IGroupItemProps {
  itemInitialState: string;
  initialValue: string;
}

interface IGroupItemState {
  name: string;
  machine: {
    isProcessing: boolean;
    isEdit: boolean;
    isHover: boolean;
    isUsual: boolean;
    isInitial: boolean;
    isAccordeonOpen: boolean;
    isAddNew: boolean;
    error: string;
    value: string;
    editValue: string;
  };
  timer: any;
}

const enum GroupItemType {
  USUAL = 'USUAL',
  USUAL_ACCORDEON_OPEN = 'USUAL_ACCORDEON_OPEN',
  HOVER = 'HOVER',
  HOVER_ACCORDEON_OPEN = 'HOVER_ACCORDEON_OPEN',
  SAVE = 'SAVE',
  INITIAL = 'INITIAL',
  EDIT = 'EDIT',
  ADD = 'ADD',
  ERROR = 'ERROR',
}

/**
 * This component use state machine in this.state,
 * for the change visualization of Quest's Group Item.
 *
 * For change item use this states:
 *
 * USUAL -- for usual exist item;
 * USUAL_ACCORDEON_OPEN -- for usual exist item and open accordeon items;
 * HOVER -- for hover on item;
 * HOVER_ACCORDEON_OPEN -- for hover on item and open accordeon items;
 * SAVE -- new item save to DB;
 * INITIAL -- for non presented item;
 * EDIT -- for editing item;
 * ADD -- for create new item;
 * ERROR -- error in item lifecycle;
 * ... -- add other states.
 *
 * Properties for each state:
 *
 * isProcessing: boolean -- some work with DB;
 * isEdit: boolean -- edition mode status;
 * isHover: boolean -- change appearance when hover on item;
 * isUsual: boolean -- for usual appearance;
 * isInitial: boolean -- for initial item appearance;
 * isAccordeonOpen: boolean -- accordeon open or accordeon close;
 * isAddNew: boolean -- appearance for create new item;
 * error: string -- error message from API;
 * value: string -- value of GroupItem;
 * editValue: string -- new value but not saved in DB;
 */
export default class GroupItem extends React.Component<
  IGroupItemProps,
  IGroupItemState
> {
  constructor(props) {
    super(props);

    this.state = {
      name: GroupItemType.USUAL,
      machine: this.generateState(GroupItemType.USUAL, this.props.initialValue),
      timer: null,
    };
  }

  componentDidMount() {
    const { itemInitialState, initialValue } = this.props;

    this.goToState(itemInitialState, initialValue);
  }

  /**
   * State machine binding
   */
  generateState = (stateName, stateParam) => {
    const previousState = this.state
      ? { ...this.state.machine }
      : { ...initialState };
    let stateParamNormalLength = stateParam || '';

    if (stateParamNormalLength.length > MAX_SYMBOLS_IN_NAME) {
      stateParamNormalLength = stateParamNormalLength.substr(
        0,
        MAX_SYMBOLS_IN_NAME,
      );
    }

    switch (stateName) {
      case GroupItemType.USUAL:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: false,
          isUsual: true,
          isInitial: false,
          isAccordeonOpen: false,
          isAddNew: false,
          error: null,
          value: stateParamNormalLength || previousState.value,
          editValue: null,
        };
      case GroupItemType.USUAL_ACCORDEON_OPEN:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: false,
          isUsual: true,
          isInitial: false,
          isAccordeonOpen: true,
          isAddNew: false,
          error: null,
          value: stateParamNormalLength || previousState.value,
          editValue: null,
        };
      case GroupItemType.HOVER:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: true,
          isUsual: false,
          isInitial: false,
          isAccordeonOpen: false,
          isAddNew: false,
          error: null,
          value: stateParamNormalLength || previousState.value,
          editValue: null,
        };
      case GroupItemType.HOVER_ACCORDEON_OPEN:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: true,
          isUsual: false,
          isInitial: false,
          isAccordeonOpen: true,
          isAddNew: false,
          error: null,
          value: stateParamNormalLength || previousState.value,
          editValue: null,
        };
      case GroupItemType.SAVE:
        return {
          isProcessing: true,
          isEdit: true,
          isHover: false,
          isUsual: false,
          isInitial: false,
          isAccordeonOpen: previousState.isAccordeonOpen,
          isAddNew: false,
          error: null,
          value: previousState.value,
          editValue: previousState.editValue,
        };
      case GroupItemType.INITIAL:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: false,
          isUsual: false,
          isInitial: true,
          isAccordeonOpen: false,
          isAddNew: false,
          error: null,
          value: '+ ДОБАВИТЬ НОВЫЙ ЗАГОЛОВОК',
          editValue: null,
        };
      case GroupItemType.EDIT:
        return {
          isProcessing: false,
          isEdit: true,
          isHover: false,
          isUsual: false,
          isInitial: false,
          isAccordeonOpen: previousState.isAccordeonOpen,
          isAddNew: false,
          error: null,
          value: previousState.value,
          editValue: stateParamNormalLength,
        };
      case GroupItemType.ADD:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: false,
          isUsual: false,
          isInitial: false,
          isAccordeonOpen: false,
          isAddNew: true,
          error: null,
          value: previousState.value,
          editValue: stateParamNormalLength,
        };
      // default state
      default:
        return {
          isProcessing: false,
          isEdit: false,
          isHover: false,
          isUsual: false,
          isInitial: false,
          isAccordeonOpen: false,
          isAddNew: false,
          error: null,
          value: null,
          editValue: null,
        };
    }
  };

  goToState = (stateName, stateParam) => {
    this.setState({
      name: stateName,
      machine: this.generateState(stateName, stateParam),
    });
  };

  // Transitions
  transitionFromHoverAccordeonOpen = name => {
    const { value } = this.state.machine;

    switch (name) {
      case GroupItemType.HOVER:
        this.goToState(GroupItemType.HOVER_ACCORDEON_OPEN, value);
        break;
      case GroupItemType.HOVER_ACCORDEON_OPEN:
        this.goToState(GroupItemType.HOVER, value);
        break;
      default:
        return null;
    }
  };

  transitionFromHoverAccordeonClose = name => {
    const { value } = this.state.machine;

    switch (name) {
      case GroupItemType.HOVER:
        this.goToState(GroupItemType.USUAL, value);
        break;
      case GroupItemType.HOVER_ACCORDEON_OPEN:
        this.goToState(GroupItemType.USUAL_ACCORDEON_OPEN, value);
        break;
      default:
        return null;
    }
  };

  transitionFromUsual = name => {
    const { value } = this.state.machine;

    switch (name) {
      case GroupItemType.USUAL:
        this.goToState(GroupItemType.HOVER, value);
        break;
      case GroupItemType.USUAL_ACCORDEON_OPEN:
        this.goToState(GroupItemType.HOVER_ACCORDEON_OPEN, value);
        break;
      default:
        return null;
    }
  };

  transitionFromInput = (name, value) => {
    switch (name) {
      case GroupItemType.EDIT:
        this.goToState(GroupItemType.EDIT, value);
        break;
      case GroupItemType.ADD:
        this.goToState(GroupItemType.ADD, value);
        break;
      case GroupItemType.INITIAL:
        this.goToState(GroupItemType.INITIAL, value);
        break;
      case GroupItemType.USUAL:
        this.goToState(GroupItemType.USUAL, value);
        break;
      case GroupItemType.USUAL_ACCORDEON_OPEN:
        this.goToState(GroupItemType.USUAL_ACCORDEON_OPEN, value);
        break;
      default:
        return null;
    }
  };

  transitionEscapeFromInput = (name, value) => {
    switch (name) {
      case GroupItemType.ADD:
        this.goToState(GroupItemType.INITIAL, value);
        break;
      case GroupItemType.EDIT:
        const { isAccordeonOpen } = this.state.machine;

        if (isAccordeonOpen) {
          this.goToState(GroupItemType.USUAL_ACCORDEON_OPEN, value);
        } else {
          this.goToState(GroupItemType.USUAL, value);
        }
        break;
      default:
        return null;
    }
  };
  // State machine binding

  handleHoverSet = () => {
    const { isInitial } = this.state.machine;
    const { name } = this.state;

    if (isInitial) return;

    this.transitionFromUsual(name);
  };

  handleHoverUnSet = () => {
    const { isInitial } = this.state.machine;
    const { name } = this.state;

    if (isInitial) return;

    this.transitionFromHoverAccordeonClose(name);
  };

  handleClickInitial = () => {
    const { isInitial } = this.state.machine;

    if (!isInitial) return;

    this.goToState(GroupItemType.ADD, null);
  };

  handleClickEdit = () => {
    const { value } = this.state.machine;

    this.goToState(GroupItemType.EDIT, value);
  };

  handleClickAccordeonOpen = () => {
    const { name } = this.state;

    this.transitionFromHoverAccordeonOpen(name);
  };

  handleInputChange = e => {
    const { name } = this.state;

    this.transitionFromInput(name, e.target.value);
  };

  handleInputKeyDown = e => {
    const { name } = this.state;
    const { value } = this.state.machine;

    if (e.keyCode === 13) {
      if (e.target.value === '') {
        toastr.warningWithoutIcon(
          'Внимание!',
          'Название группы не может быть пустым',
          {},
        );
        return;
      }

      this.onSave(e.target.value);
    } else if (e.keyCode === 27) {
      this.transitionEscapeFromInput(name, value);
    }
  };

  onSave = valueToSave => {
    this.goToState(GroupItemType.SAVE, null);

    // TODO: Works with save data imitation. Use sagas and API here
    setTimeout(() => {
      const { isAccordeonOpen } = this.state.machine;

      if (isAccordeonOpen) {
        this.goToState(GroupItemType.USUAL_ACCORDEON_OPEN, valueToSave);
      } else {
        this.goToState(GroupItemType.USUAL, valueToSave);
      }
    }, 1500);
  };

  handleOnFocusInput = e => {
    const valueTemp = e.target.value;
    e.target.value = '';
    e.target.value = valueTemp;
  };

  render() {
    const {
      isInitial,
      isUsual,
      isHover,
      isAccordeonOpen,
      isEdit,
      isProcessing,
      isAddNew,
      value,
      editValue,
    } = this.state.machine;

    if (isProcessing) {
      return (
        <div className={'wrapper'}>
          <div className={'preloader'}>
            <Preloader />
          </div>
        </div>
      );
      // tslint:disable-next-line:no-else-after-return
    } else {
      return (
        <div
          className={'wrapper'}
          onMouseEnter={this.handleHoverSet}
          onMouseLeave={this.handleHoverUnSet}
          onClick={this.handleClickInitial}
        >
          <div className={'itemLabel'}>
            {isInitial && <div className={'text'}>{value}</div>}
            {isUsual && <div className={'text'}>{value}</div>}
            {isHover && <div className={'text'}>{value}</div>}
            {isUsual && (
              <div
                className={'accordeonSwitcher'}
                onClick={this.handleClickAccordeonOpen}
              >
                {!isAccordeonOpen && <img src={arrow} alt="Open" width={18} />}
                {isAccordeonOpen && (
                  <img src={arrowClose} alt="Close" width={18} />
                )}
              </div>
            )}
            {isHover && (
              <div
                className={'accordeonSwitcher'}
                onClick={this.handleClickAccordeonOpen}
              >
                {!isAccordeonOpen && <img src={arrow} alt="Open" width={18} />}
                {isAccordeonOpen && (
                  <img src={arrowClose} alt="Close" width={18} />
                )}
              </div>
            )}
            {isEdit && (
              <input
                className={'inputEdit'}
                type="text"
                onChange={this.handleInputChange}
                onKeyDown={this.handleInputKeyDown}
                value={editValue}
                autoFocus={true}
                onFocus={this.handleOnFocusInput}
              />
            )}
            {isAddNew && (
              <div>
                <label className={'labelAddNew'}>
                  Нажми Enter для подтверждения
                </label>
                <input
                  className={cx('inputEdit', 'inputAddNew')}
                  type="text"
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleInputKeyDown}
                  value={editValue}
                  placeholder={'Введи название группы'}
                  autoFocus={true}
                />
              </div>
            )}
          </div>
          <div className={cx('itemActions', isHover && 'isHover')}>
            <div className={'archive'}>
              <img src={archiveWhite} alt="Archive" width={24} />
            </div>
            <div className={'edit'} onClick={this.handleClickEdit}>
              <img src={penWhite} alt="Edit" width={24} />
            </div>
          </div>
        </div>
      );
    }
  }
}
