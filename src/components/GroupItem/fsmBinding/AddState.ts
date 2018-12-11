import { GroupItemType } from '../constants';

export default class AddState {
  handleAccordeonOpen = accordeon => {
    const { name } = accordeon.state;
    accordeon.transitionFromHoverAccordeonOpen(name);

    // TODO: Use destructurization
    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.ACCORDEON_OPEN;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({ currentState });
  };

  handleHover = accordeon => {
    const { isInitial } = accordeon.state.machine;
    const { name } = accordeon.state;

    if (isInitial) return;

    accordeon.transitionFromUsual(name);

    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.HOVER;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({ currentState });
  };

  handleUnHover = accordeon => {
    const { isInitial } = accordeon.state.machine;
    const { name } = accordeon.state;

    if (isInitial) return;

    accordeon.transitionFromHoverAccordeonClose(name);

    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.UN_HOVER;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({ currentState });
  };

  handleEdit = (accordeon, valueToSave) => {
    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.EDIT_LABEL;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.goToState(GroupItemType.EDIT, valueToSave, currentState);
    accordeon.setState({ currentState });
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

  // handlePlay(player) {
  //   const stateId = player.state.currentState;
  //   const inputId = player.state.inputs.PLAY;
  //   const currentState = player.state.transitions[stateId][inputId];

  //   player.setState({
  //     currentState: currentState,
  //   });
  // }

  // handleNext(player) {
  //   let songId = player.state.currentSong;
  //   const maxSongs = player.state.songs.length - 1;
  //   const currentSong = songId === maxSongs ? songId : ++songId;

  //   player.setState({
  //     currentSong: currentSong,
  //   });
  // }

  // handlePrevious(player) {
  //   let songId = player.state.currentSong;
  //   const currentSong = songId === 0 ? songId : --songId;

  //   player.setState({
  //     currentSong: currentSong,
  //   });
  // }

  // handleStop(player) {
  //   const stateId = player.state.currentState;
  //   const inputId = player.state.inputs.STOP;
  //   const currentState = player.state.transitions[stateId][inputId];

  //   player.setState({
  //     currentState: currentState,
  //     currentSong: 0,
  //   });
  // }
}
