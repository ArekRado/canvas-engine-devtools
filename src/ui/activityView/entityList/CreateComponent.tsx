import React, { useContext } from 'react';
import { EditorContext } from '../../../context/editor';
import { Select, SelectOption } from '../../common/Select';
import { useAppState } from '../../hooks/useAppState';

export const CreateComponent: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useAppState();

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
        id="Add component"
        options={options}
        value=""
        variants={{ inline: true }}
        onChange={(value) => {
          // if (editorState.selectedEntity) {
          //   appState.dispatch({
          //     type: 'CreateComponent',
          //     payload: {
          //       component: value.target.value,
          //       entity: editorState.selectedEntity,
          //       defaultData:
          //         editorState.components[value.target.value]?.defaultData,
          //     },
          //   });
          // }
        }}
      />
    );
    return null;
  }
};
