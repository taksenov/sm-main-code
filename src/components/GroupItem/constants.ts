export const enum GroupItemType {
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

export const initialState = {
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
