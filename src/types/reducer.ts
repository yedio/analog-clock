import rootReducer from '../redux';

export type RootState = ReturnType<typeof rootReducer>;

interface Type_Position {
  x: number;
  y: number;
}

export interface Type_TooltipReducer {
  open: boolean;
  position: Type_Position;
  text: string;
}
