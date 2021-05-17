import { getEntity, State } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../../../context/app';
import { EditorContext } from '../../../context/editor';
import { Select, SelectOption } from '../../common/Select';

export const CreateComponent: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const options: SelectOption[] = Object.keys(editorState.components).map(
    (key) => ({
      value: key,
      label: key,
    })
  );

  if (!editorState.selectedEntityId) {
    return null;
  } else {
    return (
      <Select
        label="Add component"
        options={options}
        value=""
        onChange={(value) => {
          if (editorState.selectedEntityId) {
            appState.dispatch({
              type: 'CreateComponent',
              payload: {
                component: value.target.value,
                entityId: editorState.selectedEntityId,
                defaultData:
                  editorState.components[value.target.value]?.defaultData,
              },
            });
          }
        }}
      />
    );
    return null;
  }
};
