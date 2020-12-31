import { createContext, Dispatch, Reducer } from 'react';
import { Action } from '../type';

export type Modal<Data> = {
  name: ModalName;
  isOpen: boolean;
  data?: Data;
};
export namespace ModalAction {
  export type SetModal = Action<'SetModal', Modal<any>>;
}

type ModalActions = ModalAction.SetModal;

export type ModalName = 'save' | 'confirm' | 'animation' | 'createBlueprint';

type ModalState = {
  list: Modal<any>[];
  dispatch: Dispatch<ModalActions>;
};

export const initialState: ModalState = {
  list: [],
  dispatch: () => {},
};

export const ModalContext = createContext<ModalState>(initialState);

export const reducer: Reducer<ModalState, ModalActions> = (state, action) => {
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
