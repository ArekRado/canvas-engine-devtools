import React, { useContext, useEffect, useState } from 'react';
import { EditorContext } from '../context/editor';
import { EntityListName } from './activityView/entityList/EntityList';
import { Button } from './common/Button';
import { Video, List, MoreHorizontal, AlertTriangle } from 'react-feather';
import { container } from './activityBar.css';
import { sprinkles } from './util.css';

export const ActivityBar: React.FC = () => {
  const editorState = useContext(EditorContext);

  useEffect(() => {
    window.requestIdleCallback(() => {
      // import('./activityView/entityList/Events').then((component) => {
      //   editorState.dispatch({
      //     type: 'RegisterActivityView',
      //     payload: {
      //       name: component.EntityListName,
      //       index: 0,
      //       tab: () => <List />,
      //       content: component.EntityList,
      //     },
      //   });
      // });
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

      // import('./activityView/Camera').then((component) => {
      //   editorState.dispatch({
      //     type: 'RegisterActivityView',
      //     payload: {
      //       name: component.CameraName,
      //       index: 1,
      //       tab: () => <Video />,
      //       content: component.Camera,
      //     },
      //   });
      // });

      // import('./activityView/MoreStateDetails').then((component) => {
      //   editorState.dispatch({
      //     type: 'RegisterActivityView',
      //     payload: {
      //       name: component.MoreStateDetailsName,
      //       index: 2,
      //       tab: () => <MoreHorizontal />,
      //       content: component.MoreStateDetails,
      //     },
      //   });
      // });
    });

    // Blueprints

    // import('./activityView/MoreStateDetails').then((component) => {
    //   editorState.dispatch({
    //     type: 'RegisterActivityView',
    //     payload: {
    //       name: component.MoreStateDetailsName,
    //       index: 2,
    //       tab: () => <MoreHorizontal />,
    //       content: component.MoreStateDetails,
    //     },
    //   });
    // });
  }, []);

  return (
    <>
      <div className={container}>
        {Object.entries(editorState.activityView)
          .sort((a, b) => (a[1].index > b[1].index ? 1 : -1))
          .map(([key, value]) => (
            <Button
              key={key}
              focused={editorState.openedActivityView === key}
              onClick={() =>
                editorState.dispatch({
                  type: 'OpenActivityView',
                  payload: key,
                })
              }
            >
              {value ? <value.tab isOpen={false} /> : <AlertTriangle />}
            </Button>
          ))}
      </div>
      {Object.entries(editorState.activityView).map(([key, value]) =>
        key === editorState.openedActivityView ? (
          value ? (
            <value.content
              isOpen={key === editorState.openedActivityView}
              key={key}
            />
          ) : (
            `Activity view "${key}" is not registered in devtools`
          )
        ) : null
      )}
    </>
  );
};
