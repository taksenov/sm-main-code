import { GroupItemType, initialState, initialStateNames } from './constants';

const MAX_SYMBOLS_IN_NAME = 42;

/**
 * This export function implemented Finite State Machine
 * for internal state of component GroupItem
 */
export default function generateState(
  state,
  props,
  stateName,
  stateParam,
  stateCode,
) {
  const previousState = state ? { ...state.machine } : { ...initialState };
  let stateParamNormalLength = stateParam || '';

  if (stateParamNormalLength.length > MAX_SYMBOLS_IN_NAME) {
    stateParamNormalLength = stateParamNormalLength.substr(
      0,
      MAX_SYMBOLS_IN_NAME,
    );
  }

  switch (initialStateNames[stateCode]) {
    case GroupItemType.USUAL:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.USUAL_ACCORDEON_OPEN:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.HOVER:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.HOVER_ACCORDEON_OPEN:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.SAVE:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.INITIAL:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.EDIT:
      return {
        name: stateName,
        machine: {
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
        },
      };
    case GroupItemType.ADD:
      return {
        name: stateName,
        machine: {
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
        },
      };
    // default state
    default:
      return {
        name: stateName,
        machine: {
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
        },
      };
  }
}
