import * as React from 'react';

import { GroupItemType, initialState } from './constants';
import generateState from './fsmGroupItem';
import AccordeonSwitcher from '../AccordeonSwitcher';
import AddNewLabel from '../AddNewLabel';
import EditButton from '../EditButton';
import { Preloader } from '../Preloader';

import './styles.css';

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

/**
 * This component use state machine in this.state,
 * for the change visualization of Accordeon's Group Item.
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

    this.state = { name: null, machine: { ...initialState }, timer: null };
  }

  componentDidMount() {
    const { itemInitialState, initialValue } = this.props;

    this.goToState(itemInitialState, initialValue);
  }

  /**
   * State machine binding
   */
  goToState = (stateName, stateParam) => {
    this.setState(generateState(this.state, this.props, stateName, stateParam));
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
      if (e.target.value === '') return;

      this.onSave(e.target.value);
    } else if (e.keyCode === 27) {
      this.transitionEscapeFromInput(name, value);
    }
  };

  onSave = valueToSave => {
    this.goToState(GroupItemType.SAVE, null);

    // IDEA: Works with save data imitation.
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
            {/* Label */}
            {isInitial && <div className={'text'}>{value}</div>}
            {isUsual && <div className={'text'}>{value}</div>}
            {isHover && <div className={'text'}>{value}</div>}
            {/* Expand */}
            {isUsual && (
              <AccordeonSwitcher
                handleClickAccordeonOpen={this.handleClickAccordeonOpen}
                isAccordeonOpen={isAccordeonOpen}
              />
            )}
            {isHover && (
              <AccordeonSwitcher
                handleClickAccordeonOpen={this.handleClickAccordeonOpen}
                isAccordeonOpen={isAccordeonOpen}
              />
            )}
            {/* Input */}
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
            {/* Add new label */}
            {isAddNew && (
              <AddNewLabel
                editValue={editValue}
                handleInputChange={this.handleInputChange}
                handleInputKeyDown={this.handleInputKeyDown}
              />
            )}
          </div>
          {/* Edit button */}
          {!isInitial && (
            <EditButton
              isHover={isHover}
              handleClickEdit={this.handleClickEdit}
            />
          )}
        </div>
      );
    }
  }
}
