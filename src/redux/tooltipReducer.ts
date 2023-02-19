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

// Action Type
// const SET_TOOLTIP = 'tooltipReducer/SET_TOOLTIP';

// Action Creator & Action
// export const setTooltip = (value: Type_TooltipReducer) => ({
//   type: SET_TOOLTIP,
//   payload: value,
// });

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
