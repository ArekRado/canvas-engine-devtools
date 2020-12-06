import { State } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Select, SelectOption } from './common/Select';

export const CreateComponent: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const options: SelectOption[] = Object.keys(editorState.components).map(
    (key) => ({
      value: key,
      label: key,
    })
  );

  if (!editorState.selectedEntity) {
    return null;
  } else {
    return (
      <Select
        label="Add component"
        options={options}
        value=""
        onChange={(value) => {
          if (editorState.selectedEntity) {
            appState.dispatch({
              type: 'CreateComponent',
              payload: {
                component: value.target.value,
                entity: editorState.selectedEntity,
                defaultData:
                  editorState.components[value.target.value]?.defaultData,
              },
            });
          }
        }}
      />
    );
  }
};
