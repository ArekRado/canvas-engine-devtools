import { createContext, Dispatch, Reducer } from 'react';

export type Modal<Data> = {
  name: ModalName;
  isOpen: boolean;
  data?: Data;
};

type ModalAction = 'SetModal';

export type ModalName = 'save' | 'confirm';

type Action<Payload> = {
  payload: Modal<Payload>;
  type: ModalAction;
};

type ModalState = {
  list: Modal<any>[];
  dispatch: Dispatch<Action<any>>;
};

export const initialState: ModalState = {
  list: [],
  dispatch: () => {},
};

export const ModalContext = createContext<ModalState>(initialState);

export const reducer: Reducer<ModalState, Action<any>> = (state, action) => {
  switch (action.type) {
    case 'SetModal':
      const exist = state.list.find((x) => x.name === action.payload.name);

      if (exist) {
        return {
          ...state,
          list: state.list.map((x) =>
            x.name === action.payload.name ? action.payload : x
          ),
        };
      }

      return {
        ...state,
        list: [...state.list, action.payload],
      };
    default:
      return state;
  }
};
