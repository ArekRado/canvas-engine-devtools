import { Camera as CameraType } from '@arekrado/canvas-engine';
import React, { useContext } from 'react';
import { AlertTriangle } from 'react-feather';
import { AppContext } from '../../context/app';
import { EditorContext } from '../../context/editor';
import { Button } from '../common/Button';
import { InlineInput } from '../common/InlineInput';
import { InlineVector } from '../common/InlineVector';
import { Input } from '../common/Input';
import { Vector } from '../common/Vector';

export const ActivityBar: React.FC = () => {
  const appState = useContext(AppContext);
  const editorState = useContext(EditorContext);

  // import('../../entityComponent/CollideCircle').then((component) => {
  //   editorState.dispatch({
  //     type: 'RegisterComponent',
  //     payload: {
  //       name: componentName.collideCircle,
  //       render: component.CollideCircle,
  //       defaultData: defaultData.collideCircle({
  //         entityId: generateEntity('').id,
  //       }),
  //       animatedProperties: [
  //         { path: 'radius', type: 'number' },
  //         { path: 'position', type: 'Vector2D' },
  //       ],
  //     },
  //   });
  // });

  return (
    <div className="flex flex-col overflow-y-auto bg-gray-800">
      {Object.entries(editorState.activityView).map(([key, value]) => (
        <Button key={key}>
          {value ? <value.tab isOpen={false} /> : <AlertTriangle />}
        </Button>
      ))}

      {Object.entries(editorState.activityView).map(([key, value]) => (
        <div key={key}>
          {value ? (
            <value.content isOpen={false} />
          ) : (
            `Activity view "${key}" is not registered in devtools`
          )}
        </div>
      ))}
      {/* <Button>
        <List />
      </Button>

      <Button>
        <Video />
      </Button>

      <Button onClick={openSaveModal} title="Save">
        <Save size={24} strokeWidth={1} />
      </Button>

      <StartStop /> */}
    </div>
  );
};
