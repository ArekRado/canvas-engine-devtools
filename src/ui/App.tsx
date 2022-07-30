import React, { useReducer } from 'react';
import {
  EditorContext,
  initialState as editorInitialState,
  reducer as editorReducer,
} from '../context/editor';
import {
  ModalContext,
  initialState as modalInitialState,
  reducer as modalReducer,
} from '../context/modal';
import { SaveModal } from './modal/SaveModal';
import { modalContainerId } from './modal/ModalWrapper';
import { useOutline } from './hooks/useOutline';
import { ConfirmModal } from './modal/ConfirmModal';
import { ActivityBar } from './ActivityBar';
import { appStyle, startStopStyle } from './app.css';
import { StartStop } from './StartStop';

export const App: React.FC = () => {
  const [editorState, editorDispatch] = useReducer(
    editorReducer,
    editorInitialState
  );

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState
  );

  // const isPlayingRef = useRef(false);
  // isPlayingRef.current = editorState.isPlaying;

  useOutline();

  // const openSaveModal = () =>
  //   modalDispatch({
  //     type: 'SetModal',
  //     payload: {
  //       name: 'save',
  //       isOpen: true,
  //     },
  //   });

  // const showMoreState = () =>
  //   modalDispatch({
  //     type: 'SetModal',
  //     payload: {
  //       name: 'moreStateDetails',
  //       isOpen: true,
  //     },
  //   });

  return (
    <ModalContext.Provider value={{ ...modalState, dispatch: modalDispatch }}>
      <EditorContext.Provider
        value={{ ...editorState, dispatch: editorDispatch }}
      >
        <div className={appStyle} id="canvas-engine-devtools">
          <div className={startStopStyle}>
            <StartStop />
          </div>
          <ActivityBar />
          <div id={modalContainerId} />
        </div>

        <ConfirmModal />
        <SaveModal />
        {/* <AnimationModal /> */}
      </EditorContext.Provider>
    </ModalContext.Provider>
  );
};
