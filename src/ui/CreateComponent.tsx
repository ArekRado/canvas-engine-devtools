import { State } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Select, SelectOption } from './common/Select';

export const CreateComponent: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const options: SelectOption[] = Object.keys(appState.component).map(
    (key) => ({
      value: key,
      label: key,
    })
  );

  return !editorState.selectedEntity ? (
    <Select
      label="Add component"
      options={options}
      value=""
      onChange={(value) =>
        appState.dispatch({
          type: 'CreateComponent',
          payload: {
            component: value.target.value as keyof State['component'],
            entity: editorState.selectedEntity,
          },
        })
      }
    />
  ) : null;
};
