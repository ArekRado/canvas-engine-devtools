import { generateEntity } from '@arekrado/canvas-engine';
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

  const [entityName, setEntityName] = useState('');

  return (
    <Form
      className="flex justify-between"
      onSubmit={() => {
        setEntityName('');
        const newEntity = generateEntity(entityName);

        appState.dispatch({
          type: 'SetEntity',
          payload: newEntity,
        });
        editorState.dispatch({
          type: 'SetEntity',
          payload: newEntity,
        });
      }}
    >
      <Input
        labelClassName="mr-3"
        label="Create"
        id="createEntity"
        name="createEntity"
        containerClassName="flex flex-1"
        value={entityName}
        onChange={(event) => setEntityName(event.target.value)}
        required={true}
      />
      <Button type="submit" title="Create entity">
        <Plus size={12} />
      </Button>
    </Form>
  );
};
