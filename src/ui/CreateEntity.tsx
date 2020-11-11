import React, { useContext, useState } from 'react';
import { Plus } from 'react-feather';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { Button } from './common/Button';
import { Form } from './common/Form';
import { Input } from './common/Input';

export const CreateEntity: React.FC = () => {
  const editorState = useContext(EditorContext);
  const appState = useContext(AppContext);

  const [entity, setEntity] = useState('');

  return (
    <Form
      className="flex justify-between"
      onSubmit={() => {
        setEntity('');
        appState.dispatch({ type: 'SetEntity', payload: entity });
        editorState.dispatch({ type: 'SetEntity', payload: entity });
      }}
    >
      <Input
        containerClassName="flex-1"
        title="entity"
        value={entity}
        onChange={(event) => setEntity(event.target.value)}
      />
      <Button type="submit" title="Create entity">
        <Plus size={12} />
      </Button>
    </Form>
  );
};
