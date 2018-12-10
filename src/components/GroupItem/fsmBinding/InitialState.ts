import { GroupItemType } from '../constants';

export default class InitialState {
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

    accordeon.setState({
      currentState,
    });
  };

  handleUnHover = accordeon => {
    const { isInitial } = accordeon.state.machine;
    const { name } = accordeon.state;

    if (isInitial) return;

    accordeon.transitionFromHoverAccordeonClose(name);

    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.UN_HOVER;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({
      currentState,
    });
  };

  handleEdit = accordeon => {};

  handleAddNew = accordeon => {};

  handleSave = (accordeon, valueToSave) => {
    console.log('Im inside handleSave UsualState!');

    accordeon.goToState(GroupItemType.SAVE, null);
    // IDEA: Works with save data imitation.
    setTimeout(() => {
      const { isAccordeonOpen } = accordeon.state.machine;
      if (isAccordeonOpen) {
        accordeon.goToState(GroupItemType.USUAL_ACCORDEON_OPEN, valueToSave);
      } else {
        accordeon.goToState(GroupItemType.USUAL, valueToSave);
      }
    }, 1500);

    const stateId = accordeon.state.currentState;
    const inputId = accordeon.state.inputs.SAVING;
    const currentState = accordeon.state.transitions[stateId][inputId];

    accordeon.setState({ currentState });
  };

  handleError = accordeon => {};

  handleSaveDone = accordeon => {};

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
