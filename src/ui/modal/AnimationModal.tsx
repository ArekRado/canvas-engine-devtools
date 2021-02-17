import {
  Entity,
  Animation,
  Animation as AnimationType,
  Keyframe,
} from '@arekrado/canvas-engine';
import { vector, Vector2D } from '@arekrado/vector-2d';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { ModalContext } from '../../context/modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Vector } from '../common/Vector';
import { ModalWrapper } from './ModalWrapper';

const emptyKeyframe: Keyframe = {
  duration: 1000,
  timingFunction: 'Linear',
  valueRange: {
    type: 'number',
    value: vector(0, 1),
  },
};

const msToTime = (ms: number): string => {
  let seconds = (ms / 1000.0) % 60.0;
  let minutes = (ms / (1000.0 * 60.0)) % 60.0;

  let formattedMinutes =
    minutes < 10.0 ? '0' + Math.floor(minutes) : Math.floor(minutes);

  let formattedSeconds =
    seconds < 10.0 ? '0' + Math.floor(seconds) : Math.floor(seconds);

  return formattedMinutes + ':' + formattedSeconds;
};

type ValueRangeProps = {
  selectedKeyframe: Keyframe;
  setKeyframe: (data: Partial<Keyframe>) => void;
};
const ValueRange: React.FC<ValueRangeProps> = ({
  selectedKeyframe,
  setKeyframe,
}) => (
  <div className="grid grid-cols-12 my-1">
    <div className="col-span-4">valueRange</div>
    {selectedKeyframe.valueRange.type === 'number' && (
      <Vector
        containerClassName="col-span-8 flex"
        id="valueRange"
        name="valueRange"
        value={selectedKeyframe.valueRange.value}
        onChange={(value) =>
          setKeyframe({
            valueRange: {
              type: 'number',
              value,
            },
          })
        }
      />
    )}

    {selectedKeyframe.valueRange.type === 'vector2D' && (
      <Vector
        containerClassName="col-span-4"
        id="valueRange[0]"
        name="valueRange[0]"
        value={selectedKeyframe.valueRange.value[0]}
        onChange={(value) =>
          setKeyframe({
            valueRange: {
              type: 'vector2D',
              value: [value, selectedKeyframe.valueRange.value[1] as Vector2D],
            },
          })
        }
      />
    )}

    {selectedKeyframe.valueRange.type === 'vector2D' && (
      <Vector
        containerClassName="col-span-4"
        id="valueRange[1]"
        name="valueRange[1]"
        value={selectedKeyframe.valueRange.value[1]}
        onChange={(value) =>
          setKeyframe({
            valueRange: {
              type: 'vector2D',
              value: [selectedKeyframe.valueRange.value[0] as Vector2D, value],
            },
          })
        }
      />
    )}
  </div>
);

type TimelineProps = {
  component: Animation;
  keyframeIndex: number;
  animationLength: number;
  setKeyframeIndex: (index: number) => void;
};
const Timeline: React.FC<TimelineProps> = ({
  component,
  keyframeIndex,
  setKeyframeIndex,
  animationLength,
}) => (
  <div className="flex h-20 bg-gray-700 bg-opacity-75 relative overflow-hidden">
    {component.keyframes.map((keyframe, index) => (
      <button
        key={index}
        className={
          (index === keyframeIndex ? 'border-white' : 'border-black') +
          ' flex flex-wrap items-center justify-center border overflow-hidden'
        }
        style={{
          flex: (keyframe.duration * animationLength) / 100.0,
        }}
        onClick={() => {
          setKeyframeIndex(index);
        }}
      >
        {keyframe.valueRange.type === 'number' && (
          <>
            {keyframe.timingFunction}
            <br />
            {keyframe.valueRange.value[0]}-{keyframe.valueRange.value[1]}
          </>
        )}
        {keyframe.valueRange.type === 'vector2D' && (
          <>
            {keyframe.timingFunction}
            <br />
            <Vector
              id="valueRange.value[0]"
              name="valueRange.value[0]"
              value={keyframe.valueRange.value[0]}
              onChange={() => {}}
            />
            -
            <Vector
              id="valueRange.value[1]"
              name="valueRange.value[1]"
              value={keyframe.valueRange.value[1]}
              onChange={() => {}}
            />
          </>
        )}
      </button>
    ))}
    <div
      className="absolute w-full h-full flex flex-col justify-between pointer-events-none"
      style={{
        transform: `translate(${
          (component.currentTime * 100.0) / animationLength
        }%)`,
      }}
    >
      <div className="ml-1 overflow-hidden w-10">
        {msToTime(component.currentTime)}
      </div>
      <div className="absolute border-l border-red-500 h-full" />
    </div>
  </div>
);

type AnimationProps = {
  entity: Entity;
};
const AnimationModalBody: React.FC<AnimationProps> = ({ entity }) => {
  const appState = useContext(AppContext);
  const modalState = useContext(ModalContext);
  const [keyframeIndex, setKeyframeIndex] = React.useState(-1);

  const component = appState.component.animation[entity.id];

  if (!component) {
    return <div>Animation doesn't exist</div>;
  }

  const setAnimationData = (data: Partial<AnimationType>): void =>
    appState.dispatch({
      type: 'SetAnimationComponent',
      payload: {
        ...component,
        ...data,
      },
    });

  const selectedKeyframe = component.keyframes[keyframeIndex];

  const setKeyframe = (data: Partial<Keyframe>): void =>
    setAnimationData({
      keyframes: component.keyframes.map((keyframe, i) =>
        i === keyframeIndex
          ? {
              ...selectedKeyframe,
              ...data,
            }
          : keyframe
      ),
    });

  const addKeyframe = () =>
    setAnimationData({
      keyframes: [...component.keyframes, emptyKeyframe],
    });

  const animationLength = component.keyframes.reduce(
    (sum, keyframe) => keyframe.duration + sum,
    0
  );

  return (
    <>
      <div className="grid grid-cols-12 gap-1 my-1">
        <div className="col-span-6 grid grid-cols-12 gap-1">
          <Input
            containerClassName="col-span-12 grid grid-cols-12"
            labelClassName="col-span-4"
            inputClassName="col-span-8"
            label="name"
            id="name"
            name="name"
            value={component.name} // todo
            onChange={() => {}}
            disabled={true}
          />

          <Input
            containerClassName="col-span-12 grid grid-cols-12"
            labelClassName="col-span-4"
            inputClassName="col-span-8"
            type="checkbox"
            label="isPlaying"
            id="isPlaying"
            name="isPlaying"
            checked={component.isPlaying}
            onChange={() => {
              setAnimationData({ isPlaying: !component.isPlaying });
            }}
          />

          <Input
            containerClassName="col-span-12 grid grid-cols-12"
            labelClassName="col-span-4"
            inputClassName="col-span-8"
            label="currentTime"
            id="currentTime"
            name="currentTime"
            type="number"
            value={component.currentTime}
            onChange={(e) => {
              setAnimationData({ currentTime: parseFloat(e.target.value) });
            }}
            max={animationLength}
            min="0"
          />

          <Select
            containerClassName="col-span-12 grid grid-cols-12"
            labelClassName="col-span-4"
            inputClassName="col-span-8"
            label="property"
            id="property"
            name="property"
            options={[]}
            value={''}
            onChange={() => {}}
          />

          <div className="col-span-4"> {'isFinished'} </div>
          <div className="col-span-8">
            {component.isFinished ? 'true' : 'false'}
          </div>

          <div className="col-span-4"> {'wrapMode'} </div>
          <div className="col-span-8">{component.wrapMode}</div>
        </div>
        <div className="col-span-6 my-1">
          <Button
            className="col-span-12"
            onClick={() => {
              addKeyframe();
            }}
          >
            Add keyframe
          </Button>
          {selectedKeyframe && (
            <>
              <Input
                containerClassName="grid grid-cols-12 my-1"
                labelClassName="col-span-4"
                inputClassName="col-span-8"
                id="duration"
                name="duration"
                label="duration"
                value={selectedKeyframe.duration}
                onChange={(e) =>
                  setKeyframe({ duration: parseFloat(e.target.value) })
                }
              />
              <Input
                containerClassName="grid grid-cols-12 my-1"
                labelClassName="col-span-4"
                inputClassName="col-span-8"
                id="timingFunction"
                name="timingFunction"
                label="timingFunction"
                value="Linear"
                disabled
                onChange={() => {}}
              />

              <ValueRange
                selectedKeyframe={selectedKeyframe}
                setKeyframe={setKeyframe}
              />
            </>
          )}
        </div>
      </div>
      <Timeline
        component={component}
        keyframeIndex={keyframeIndex}
        setKeyframeIndex={setKeyframeIndex}
        animationLength={animationLength}
      />
      {/* <div className="ml-1 overflow-hidden w-10">
        value
      </div> */}
    </>
  );
};

export const AnimationModal: React.FC = () => {
  return (
    <ModalWrapper name="animation">
      {({ modal }) => <AnimationModalBody entity={modal.data} />}
    </ModalWrapper>
  );
};
