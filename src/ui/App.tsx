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
import { get as getSyncState, getStateFromLocalStorage } from '../../src/debug';
import { Fps } from './Fps';
import { StartStop } from './StartStop';
import { EntityList } from './EntityList';
import { CreateEntity } from './CreateEntity';
import { CreateComponent } from './CreateComponent';
import { ComponentList } from './ComponentList';

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
    const id = setInterval(() => {
      if (isPlayingRef.current) {
        const state = getSyncState('Editor');
        if (state) {
          appDispatch({ type: 'SetState', payload: state });
        }
      }
    }, 50);

    return () => {
      clearInterval(id);
    };
  }, [editorState.isPlaying]);

  useEffect(() => {
    const state = getStateFromLocalStorage();
    if (state) {
      appDispatch(state);
    }
  }, []);

  return (
    <ModalContext.Provider value={{ ...modalState, dispatch: modalDispatch }}>
      <EditorContext.Provider
        value={{ ...editorState, dispatch: editorDispatch }}
      >
        <AppContext.Provider value={{ ...appState, dispatch: appDispatch }}>
          <div className="text-gray-500 bg-gray-900 w-full h-full flex">
            <div className="flex flex-col flex-1 justify-between py-2 pl-2 pr-1">
              <Button
                onClick={
                  () => {}
                  // setModalContext(Modal_Context.OpenModal('saveState', None))
                }
              >
                Save
              </Button>
              <StartStop />
              <CreateEntity />
              <div className="flex flex-col flex-1 overflow-y-scroll mt-2">
                <EntityList />
              </div>
              <Fps />
            </div>
            <div className="flex flex-col flex-1 overflow-y-scroll overflow-x-hidden py-2 pr-2 pl-1">
              {editorState.selectedEntity !== '' ? (
                <div className="w-full">
                  <CreateComponent />
                  <div className="mt-2" />
                  <ComponentList />
                </div>
              ) : (
                'Entity not selected'
              )}
            </div>

            <div id="modal-container" />
          </div>
        </AppContext.Provider>
      </EditorContext.Provider>
    </ModalContext.Provider>
  );
};
