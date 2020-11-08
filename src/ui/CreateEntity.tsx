import React, { useContext, useState } from 'react';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';
import { Input } from './common/Input';

export const CreateEntity: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const [entity, setEntity] = useState('');

  return (
    <div>
      <Input
        label="entity"
        value={entity}
        onChange={(event) => setEntity(event.target.value)}
      />
      <Button
        onClick={(_) => {
          setEntity((_) => '');
          appState.dispatch({ type: 'SetEntity', payload: entity });
          editorState.dispatch({ type: 'SetEntity', payload: entity });
        }}
      >
        Add entity
      </Button>
    </div>
  );
};