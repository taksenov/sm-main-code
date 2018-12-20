import { GroupItemType } from '../constants';

export default class HoverAccordeonOpenState {
  handleAccordeonOpen = accordeon => {
    // const { name } = accordeon.state;
    // accordeon.transitionFromHoverAccordeonOpen(name);

    // TODO: Use destructurization
    let stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.ACCORDEON_OPEN;
    let currentState = accordeon.state.transitions[stateId][inputId];

    const { isAccordeonOpen, value } = accordeon.state.machine;

    if (isAccordeonOpen) {
      stateId = accordeon.state.initialStateCodes[GroupItemType.HOVER];
      currentState = accordeon.state.transitions[stateId][inputId];

      accordeon.setState({ currentState });
      accordeon.goToState(GroupItemType.HOVER, value, currentState);
    } else {
      stateId =
        accordeon.state.initialStateCodes[GroupItemType.HOVER_ACCORDEON_OPEN];

      accordeon.setState({ currentState });
      currentState = accordeon.state.transitions[stateId][inputId];
      accordeon.goToState(
        GroupItemType.HOVER_ACCORDEON_OPEN,
        value,
        currentState,
      );
    }

    // accordeon.setState({ currentState });
  };

  handleHover = accordeon => {
    const { isInitial, isAddNew, isEdit } = accordeon.state.machine;
    // const { name } = accordeon.state;

    if (isInitial) return;
    if (isAddNew) return;
    if (isEdit) return;

    // accordeon.transitionFromUsual(name);

    let stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.HOVER;
    let currentState = accordeon.state.transitions[stateId][inputId];

    // accordeon.setState({
    //   currentState,
    // });

    const { isAccordeonOpen, value } = accordeon.state.machine;

    if (isAccordeonOpen) {
      stateId =
        accordeon.state.initialStateCodes[GroupItemType.HOVER_ACCORDEON_OPEN];
      currentState = accordeon.state.transitions[stateId][inputId];

      accordeon.setState({ currentState });
      accordeon.goToState(
        GroupItemType.HOVER_ACCORDEON_OPEN,
        value,
        currentState,
      );
    } else {
      stateId = accordeon.state.initialStateCodes[GroupItemType.HOVER];

      accordeon.setState({ currentState });
      currentState = accordeon.state.transitions[stateId][inputId];
      accordeon.goToState(GroupItemType.HOVER, value, currentState);
    }
  };

  handleUnHover = accordeon => {
    const { isInitial, isAddNew, isEdit } = accordeon.state.machine;
    // const { name } = accordeon.state;

    if (isInitial) return;
    if (isAddNew) return;
    if (isEdit) return;

    // accordeon.transitionFromHoverAccordeonClose(name);

    let stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.UN_HOVER;
    let currentState = accordeon.state.transitions[stateId][inputId];
    const { isAccordeonOpen, value } = accordeon.state.machine;

    if (isAccordeonOpen) {
      stateId =
        accordeon.state.initialStateCodes[GroupItemType.USUAL_ACCORDEON_OPEN];
      currentState = accordeon.state.transitions[stateId][inputId];

      accordeon.setState({ currentState });
      accordeon.goToState(
        GroupItemType.USUAL_ACCORDEON_OPEN,
        value,
        currentState,
      );
    } else {
      stateId = accordeon.state.initialStateCodes[GroupItemType.USUAL];

      accordeon.setState({ currentState });
      currentState = accordeon.state.transitions[stateId][inputId];
      accordeon.goToState(GroupItemType.USUAL, value, currentState);
    }
  };

  handleEdit = (accordeon, valueToSave) => {
    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.EDIT_LABEL;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.goToState(GroupItemType.EDIT, valueToSave, currentState);
    accordeon.setState({ currentState });
  };

  handleEditCancel = (accordeon, valueToSave) => {
    const { isAddNew } = accordeon.state.machine;
    let stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.EDIT_CANCEL;
    let currentState = accordeon.state.transitions[stateId][inputId];

    if (isAddNew) {
      stateId = accordeon.state.initialStateCodes[GroupItemType.INITIAL];
      currentState = accordeon.state.transitions[stateId][inputId];

      accordeon.setState({ currentState });
      accordeon.goToState(GroupItemType.INITIAL, valueToSave, currentState);

      return;
    }

    // accordeon.goToState(GroupItemType.EDIT, valueToSave, currentState);
    accordeon.setState({
      currentState,
    });
    const { isAccordeonOpen } = accordeon.state.machine;
    // inputId = accordeon.state.inputs.SAVED_DONE;

    if (isAccordeonOpen) {
      stateId =
        accordeon.state.initialStateCodes[GroupItemType.USUAL_ACCORDEON_OPEN];
      currentState = accordeon.state.transitions[stateId][inputId];

      accordeon.setState({ currentState });
      accordeon.goToState(
        GroupItemType.USUAL_ACCORDEON_OPEN,
        valueToSave,
        currentState,
      );
    } else {
      stateId = accordeon.state.initialStateCodes[GroupItemType.USUAL];

      accordeon.setState({ currentState });
      currentState = accordeon.state.transitions[stateId][inputId];
      accordeon.goToState(GroupItemType.USUAL, valueToSave, currentState);
    }
  };

  handleAddNew = accordeon => {
    const { isInitial } = accordeon.state.machine;

    if (!isInitial) return;

    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.ADD_LABEL;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.goToState(GroupItemType.ADD, null, currentState);
    accordeon.setState({ currentState });
  };

  handleSave = (accordeon, valueToSave) => {
    // console.log('Im inside handleSave HoverAccordeonOpenState!');
    let stateId = accordeon.state.currentState;
    let inputId = accordeon.state.inputs.SAVING;
    let currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.goToState(GroupItemType.SAVE, null, currentState);
    accordeon.setState({ currentState });
    // IDEA: Works with save data imitation.
    setTimeout(() => {
      const { isAccordeonOpen } = accordeon.state.machine;
      inputId = accordeon.state.inputs.SAVED_DONE;

      if (isAccordeonOpen) {
        stateId =
          accordeon.state.initialStateCodes[GroupItemType.USUAL_ACCORDEON_OPEN];
        currentState = accordeon.state.transitions[stateId][inputId];

        accordeon.setState({ currentState });
        accordeon.goToState(
          GroupItemType.USUAL_ACCORDEON_OPEN,
          valueToSave,
          currentState,
        );
      } else {
        stateId = accordeon.state.initialStateCodes[GroupItemType.USUAL];

        accordeon.setState({ currentState });
        currentState = accordeon.state.transitions[stateId][inputId];
        accordeon.goToState(GroupItemType.USUAL, valueToSave, currentState);
      }
    }, 1500);
  };

  handleError = accordeon => {
    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.SAVED_ERROR;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({ currentState });

    console.error('ERROR: Something went wrong!');
  };

  handleSaveDone = accordeon => {
    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.SAVED_DONE;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({ currentState });
  };
}
