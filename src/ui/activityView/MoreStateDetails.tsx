import React, { FC, useContext } from 'react';
import { AnySystem, Mouse, Time } from '@arekrado/canvas-engine';
import { getTime } from '@arekrado/canvas-engine/system/time/timeCrud';
import { timeEntity } from '@arekrado/canvas-engine/system/time/time';
import { getMouse } from '@arekrado/canvas-engine/system/mouse/mouseCrud';
import { mouseEntity } from '@arekrado/canvas-engine/system/mouse/mouse';
import { Input } from '../common/Input';
import { Vector } from '../common/Vector';
import { Checkbox } from '../common/Checkbox';
import { useAppState } from '../hooks/useAppState';

const TimeDetails: FC<{ time: Time }> = ({ time }) => (
  <>
    <div className="text-white mb-3">Time:</div>
    <Input
      label="delta"
      name="delta"
      id="time.delta"
      value={time.delta}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
    <Input
      label="timeNow"
      name="timeNow"
      id="time.timeNow"
      value={time.timeNow}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
    <Input
      label="previousTimeNow"
      name="previousTimeNow"
      id="time.previousTimeNow"
      value={time.previousTimeNow}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
  </>
);

const MouseDetails: FC<{ mouse: Mouse }> = ({ mouse }) => (
  <>
    <div className="text-white mb-3">Mouse:</div>
    <Input
      label="buttons"
      name="buttons"
      id="mouse.buttons"
      value={mouse.buttons}
      type="number"
      disabled={true}
      onChange={() => {}}
    />
    <Vector
      label="position"
      name="position"
      id="mouse.position"
      value={mouse.position}
      disabled={true}
      onChange={() => {}}
    />
    <Checkbox
      label="isMoving"
      name="isMoving"
      id="mouse.isMoving"
      value={mouse.isMoving}
      disabled={true}
      onChange={() => {}}
    />
    <Checkbox
      label="isButtonUp"
      name="isButtonUp"
      id="mouse.isButtonUp"
      value={mouse.isButtonUp}
      disabled={true}
      onChange={() => {}}
    />
    <Checkbox
      label="isButtonDown"
      name="isButtonDown"
      id="mouse.isButtonDown"
      value={mouse.isButtonDown}
      disabled={true}
      onChange={() => {}}
    />
    <div className="mb-3">{JSON.stringify(mouse.lastClick)}</div>
  </>
);

const SystemDetails: FC<{ system: AnySystem[] }> = ({ system }) => (
  <>
    <div className="text-white mb-3">Systems:</div>
    <div className="mb-3">
      {[...system]
        .sort((a, b) => (a.priority > b.priority ? 1 : -1))
        .map((system, index) => (
          <div key={`${system.name}${index}`}>
            {system.priority} - {system.name}
          </div>
        ))}
    </div>
  </>
);

export const MoreStateDetailsName = 'MoreStateDetails';

export const MoreStateDetails: React.FC = () => {
  const appState = useAppState();
  const time = appState
    ? getTime({ state: appState, entity: timeEntity })
    : undefined;
  const mouse = appState
    ? getMouse({ state: appState, entity: mouseEntity })
    : undefined;

  return (
    <div className="flex flex-1 flex-col m-2 overflow-y-auto">
      {/* <Checkbox
        label="isDebugInitialized"
        name="isDebugInitialized"
        id="appState.isDebugInitialized"
        value={appState.isDebugInitialized}
        disabled={true}
        onChange={() => {}}
      />
      <Checkbox
        label="isDrawEnabled"
        name="isDrawEnabled"
        id="appState.isDrawEnabled"
        value={appState.isDrawEnabled}
        disabled={true}
        onChange={() => {}}
      /> */}

      {time && <TimeDetails time={time} />}
      {mouse && <MouseDetails mouse={mouse} />}
      <SystemDetails system={appState?.system ?? []} />
    </div>
  );
};
