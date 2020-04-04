export default function StateController(uiIndentifires) {
  // @enum
  const States = {
    ADD: 1,
    EDIT: 2,
  };

  function getStateVariabls(state) {
    return {
      addButtonState: state === States.EDIT ? "none" : "inline",
      editButtonState: state === States.ADD ? "none" : "inline",
      deleteButtonState: state === States.ADD ? "none" : "inline",
      backButtonState: state === States.ADD ? "none" : "inline"
    }

  }

  function setState(state) {
    const stateVariables = getStateVariabls(state);
    document.querySelector(uiIndentifires.ADD_BUTTON).style.display = stateVariables.addButtonState;
    document.querySelector(uiIndentifires.UPDATE_BUTTON).style.display = stateVariables.editButtonState;
    document.querySelector(uiIndentifires.DELETE_BUTTON).style.display = stateVariables.deleteButtonState;
    document.querySelector(uiIndentifires.BACK_BUTTON).style.display = stateVariables.backButtonState;

  }

  return {
    setAddState: () => {
      setState(States.ADD);
    },
    setEditState: () => {
      setState(States.EDIT);
    }
  }
}