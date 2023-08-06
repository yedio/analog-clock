import { Type_TooltipReducer } from '../types/reducer';

interface Action {
  type: string;
  payload?: any;
}

const initialState: Type_TooltipReducer = {
  open: false,
  position: { x: 0, y: 0 },
  text: '',
};

// Reducer
export default function tooltipReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'OPEN':
      return { ...state, open: true };
    case 'CLOSE':
      return { ...state, open: false };
    case 'MOVE':
      const { x, y, text } = action.payload;
      return { ...state, position: { x, y }, text };
    default:
      return state;
  }
}
