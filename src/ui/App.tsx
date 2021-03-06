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
import { Button } from './common/Button';
import { Fps } from './Fps';
import { StartStop } from './StartStop';
import { EntityList } from './EntityList';
import { CreateEntity } from './CreateEntity';
import { SaveModal } from './modal/SaveModal';
import { modalContainerId } from './modal/ModalWrapper';
import { useOutline } from '../util/useOutline';
import { Save } from 'react-feather';
import { EntityDetails } from './EntityDetails';
import { ConfirmModal } from './modal/ConfirmModal';
import { AnimationModal } from './modal/AnimationModal';
import { eventBusDispatch, eventBusOn, eventBusRemove } from '../util/eventBus';
import { State } from '@arekrado/canvas-engine';
import { MoreStateDetailsModal } from './modal/MoreStateDetailsModal';

export const App: React.FC = () => {
  const [appState, appDispatch] = useReducer(appReducer, appInitialState);

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

  useEffect(() => {
    eventBusDispatch('setIsUIInitialized', true);

    const callback = (state?: State) => {
      state &&
        appDispatch({
          type: 'SetState',
          payload: state,
        });
    };
    eventBusOn('setEditorState', callback);

    return () => {
      eventBusRemove('setEditorState', callback);
    };
  }, []);

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
        <AppContext.Provider value={{ ...appState, dispatch: appDispatch }}>
          <div className="text-gray-500 bg-gray-900 w-full h-full flex">
            <div className="flex flex-col flex-1">
              <div className="bg-gray-800">
                <Button onClick={openSaveModal} title="Save">
                  <Save size={24} strokeWidth={1} />
                </Button>
                <StartStop />
              </div>

              <div className="py-2 pl-2 pr-1 flex flex-col flex-1 overflow-y-hidden">
                <CreateEntity />
                <div className="flex flex-col flex-1 overflow-y-scroll mt-2">
                  <EntityList />
                </div>

                <Button onClick={showMoreState} title="Other state properties">
                  Show more state
                </Button>
                <Fps />
              </div>
            </div>
            <div className="flex flex-col flex-1 overflow-y-scroll overflow-x-hidden">
              <EntityDetails />
            </div>

            <div id={modalContainerId} />
          </div>

          <MoreStateDetailsModal />
          <ConfirmModal />
          <SaveModal />
          <AnimationModal />
        </AppContext.Provider>
      </EditorContext.Provider>
    </ModalContext.Provider>
  );
};
