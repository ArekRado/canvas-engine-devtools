import { Camera as CameraType } from '@arekrado/canvas-engine';
import React, { useContext, useEffect, useState } from 'react';
import { AlertTriangle, List, MoreHorizontal, Video } from 'react-feather';
import { AppContext } from '../context/app';
import { EditorContext } from '../context/editor';
import { EntityListName } from './activityView/entityList/EntityList';
import { Button } from './common/Button';

export const ActivityBar: React.FC = () => {
  const appState = useContext(AppContext);
  const editorState = useContext(EditorContext);

  const [openedView, setOpenedView] = useState<string | null>(EntityListName);

  useEffect(() => {
    import('./activityView/entityList/EntityList').then((component) => {
      editorState.dispatch({
        type: 'RegisterActivityView',
        payload: {
          name: component.EntityListName,
          index: 0,
          tab: () => <List />,
          content: component.EntityList,
        },
      });
    });

    import('./activityView/Camera').then((component) => {
      editorState.dispatch({
        type: 'RegisterActivityView',
        payload: {
          name: component.CameraName,
          index: 1,
          tab: () => <Video />,
          content: component.Camera,
        },
      });
    });

    import('./activityView/MoreStateDetails').then((component) => {
      editorState.dispatch({
        type: 'RegisterActivityView',
        payload: {
          name: component.MoreStateDetailsName,
          index: 2,
          tab: () => <MoreHorizontal />,
          content: component.MoreStateDetails,
        },
      });
    });
  }, []);

  return (
    <>
      <div className="flex flex-col overflow-y-auto bg-gray-800 w-10">
        {Object.entries(editorState.activityView)
          .sort((a, b) => (a[1].index > b[1].index ? 1 : -1))
          .map(([key, value]) => (
            <Button
              key={key}
              focused={openedView === key}
              onClick={() => setOpenedView(key)}
              className={`
              flex justify-center
              ${openedView === key ? 'border-l-2 border-blue-100' : ''}
            `}
            >
              {value ? <value.tab isOpen={false} /> : <AlertTriangle />}
            </Button>
          ))}
      </div>
      {Object.entries(editorState.activityView).map(([key, value]) =>
        key === openedView ? (
          value ? (
            <value.content isOpen={key === openedView} key={key} />
          ) : (
            `Activity view "${key}" is not registered in devtools`
          )
        ) : null
      )}
    </>
  );
};
