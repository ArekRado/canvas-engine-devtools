import React, { useEffect, useReducer, useRef } from 'react';
import {
  AppContext,
  initialState as appInitialState,
  reducer as appReducer,
} from '../context/app';
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
import { AnimationModal } from './modal/AnimationModal';
import { eventBusDispatch, eventBusOn, eventBusRemove } from '../util/eventBus';
import { InternalInitialState } from '@arekrado/canvas-engine';
import { ActivityBar } from './ActivityBar';
import './app.css';
import { appStyle } from './app.css';
import { useAppState } from './hooks/useAppState';
import { Button } from './common/Button';
import { Fps } from './Fps';
import { EntityList } from './activityView/entityList/EntityList';
import { CreateEntity } from './activityView/entityList/CreateEntity';

export const App: React.FC = () => {
  const appState = useAppState();

  const [editorState, editorDispatch] = useReducer(
    editorReducer,
    editorInitialState
  );

  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState
  );

  const isPlayingRef = useRef(false);
  isPlayingRef.current = editorState.isPlaying;

  useOutline();

  const openSaveModal = () =>
    modalDispatch({
      type: 'SetModal',
      payload: {
        name: 'save',
        isOpen: true,
      },
    });

  const showMoreState = () =>
    modalDispatch({
      type: 'SetModal',
      payload: {
        name: 'moreStateDetails',
        isOpen: true,
      },
    });

  return (
    <ModalContext.Provider value={{ ...modalState, dispatch: modalDispatch }}>
      <EditorContext.Provider
        value={{ ...editorState, dispatch: editorDispatch }}
      >
        <div className={appStyle}>
          <ActivityBar />

          {/* <div className="flex flex-col flex-1">
            <div className="py-2 pl-2 pr-1 flex flex-col flex-1 overflow-y-hidden">
              <CreateEntity />
              <div className="flex flex-col flex-1 overflow-y-auto mt-2">
                <EntityList />
              </div>

              <Button onClick={showMoreState} title="Other state properties">
                Show more state
              </Button>
              <Fps />
            </div>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <EntityDetails />
          </div> */}

          {/* <Button onClick={showMoreState} title="Other state properties">
                  Show more state
                </Button>
                <Fps /> */}

          <div id={modalContainerId} />
        </div>

        <ConfirmModal />
        <SaveModal />
        {/* <AnimationModal /> */}
      </EditorContext.Provider>
    </ModalContext.Provider>
  );
};
