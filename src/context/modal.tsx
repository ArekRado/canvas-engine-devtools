import { createContext, Dispatch, Reducer } from 'react';

type Modal<Data> = {
  name: string;
  isOpen: boolean;
  data: Data;
};

type ModalState = {
  list: { [key in string]: Modal<any> };
  dispatch: Dispatch<Action<any>>;
};

type ModalAction = 'Open' | 'Close';

type Action<Payload> = {
  payload: Payload;
  type: ModalAction;
};

export const initialState: ModalState = {
  list: {},
  dispatch: () => {},
};

export const ModalContext = createContext<ModalState>(initialState);

export const reducer: Reducer<ModalState, Action<any>> = (state, action) => {
  switch (action.type) {
    case 'Open':
      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.name]: {
            ...action.payload,
            isOpen: true,
          },
        },
      };
    case 'Close':
      const modal = state.list[action.payload.name];

      return {
        ...state,
        list: {
          ...state.list,
          [action.payload.name]: {
            ...modal,
            isOpen: false,
          },
        },
      };
    default:
      return state;
  }
};
