import { Entity } from '@arekrado/canvas-engine';
import {
  Animation as AnimationType,
  Keyframe,
} from '@arekrado/canvas-engine/dist/component';
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
    type: 'Number',
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

  const setAnimationData = (data: Partial<AnimationType['data']>): void =>
    appState.dispatch({
      type: 'SetAnimationComponent',
      payload: {
        ...component,
        data: {
          ...component.data,
          ...data,
        },
      },
    });

  const selectedKeyframe = component.data.keyframes[keyframeIndex];

  const setKeyframe = (data: Partial<Keyframe>): void =>
    setAnimationData({
      keyframes: component.data.keyframes.map((keyframe, i) =>
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
      keyframes: [...component.data.keyframes, emptyKeyframe],
    });

  const animationLength = component.data.keyframes.reduce(
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
            label={'name'}
            value={name}
            onChange={() => {}}
            disabled={true}
          />

          <Input
            containerClassName="col-span-12 grid grid-cols-12"
            labelClassName="col-span-4"
            inputClassName="col-span-8"
            type="checkbox"
            label="isPlaying"
            checked={component.data.isPlaying}
            onChange={() => {
              setAnimationData({ isPlaying: !component.data.isPlaying });
            }}
          />

          <Input
            containerClassName="col-span-12 grid grid-cols-12"
            labelClassName="col-span-4"
            inputClassName="col-span-8"
            label={'currentTime'}
            type="number"
            value={component.data.currentTime}
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
            label='property'
            options={[]}
            value={''}
            onChange={() => {}}
          />

          <div className="col-span-4"> {'isFinished'} </div>
          <div className="col-span-8">
            {component.data.isFinished ? 'true' : 'false'}
          </div>

          <div className="col-span-4"> {'wrapMode'} </div>
          <div className="col-span-8">{component.data.wrapMode}</div>
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

              <div className="grid grid-cols-12 my-1">
                <div className="col-span-4">valueRange</div>
                {selectedKeyframe.valueRange.type === 'Number' && (
                  <Vector
                    containerClassName="col-span-8 flex"
                    id="valueRange"
                    name="valueRange"
                    value={selectedKeyframe.valueRange.value}
                    onChange={(value) =>
                      setKeyframe({
                        valueRange: {
                          type: 'Number',
                          value,
                        },
                      })
                    }
                  />
                )}

                {selectedKeyframe.valueRange.type === 'Vector2D' && (
                  <Vector
                    containerClassName="col-span-4"
                    id="valueRange[0]"
                    name="valueRange[0]"
                    value={selectedKeyframe.valueRange.value[0]}
                    onChange={(value) =>
                      setKeyframe({
                        valueRange: {
                          type: 'Vector2D',
                          value: [
                            value,
                            selectedKeyframe.valueRange.value[1] as Vector2D,
                          ],
                        },
                      })
                    }
                  />
                )}

                {selectedKeyframe.valueRange.type === 'Vector2D' && (
                  <Vector
                    containerClassName="col-span-4"
                    id="valueRange[1]"
                    name="valueRange[1]"
                    value={selectedKeyframe.valueRange.value[1]}
                    onChange={(value) =>
                      setKeyframe({
                        valueRange: {
                          type: 'Vector2D',
                          value: [
                            selectedKeyframe.valueRange.value[0] as Vector2D,
                            value,
                          ],
                        },
                      })
                    }
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex h-20 bg-gray-700 bg-opacity-75 relative overflow-hidden">
        {component.data.keyframes.map((keyframe, index) => (
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
            {keyframe.valueRange.type === 'Number' && (
              <>
                {keyframe.timingFunction}
                <br />
                {keyframe.valueRange.value[0]}
                {' - '}
                {keyframe.valueRange.value[1]}
              </>
            )}
            {keyframe.valueRange.type === 'Vector2D' && (
              <>
                {keyframe.timingFunction}
                <br />
                <Vector
                  id="valueRange.value[0]"
                  name="valueRange.value[0]"
                  value={keyframe.valueRange.value[0]}
                  onChange={() => {}}
                />
                {' - '}
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
              (component.data.currentTime * 100.0) / animationLength
            }%)`,
          }}
        >
          <div className="ml-1 overflow-hidden w-10">
            {msToTime(component.data.currentTime)}
          </div>
          <div className="absolute border-l border-red-500 h-full" />
        </div>
      </div>
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

// open Reshape;

// let wrapModeToString = (wrapMode: Type.wrapMode) =>
//   switch (wrapMode) {
//   | Type.Once => "Once"
//   | Type.Loop => "Loop"
//   | Type.PingPong => "PingPong"
//   | Type.ClampForever => "ClampForever"
//   };

// let timingFunctionToString = (timingFunction: Type.timingFunction) =>
//   switch (timingFunction) {
//   | Type.Linear => "Linear"
//   | Type.EaseInQuad => "EaseInQuad"
//   | Type.EaseOutQuad => "EaseOutQuad"
//   | Type.EaseInOutQuad => "EaseInOutQuad"
//   | Type.EaseInCubic => "EaseInCubic"
//   | Type.EaseOutCubic => "EaseOutCubic"
//   | Type.EaseInOutCubic => "EaseInOutCubic"
//   | Type.EaseInQuart => "EaseInQuart"
//   | Type.EaseOutQuart => "EaseOutQuart"
//   | Type.EaseInOutQuart => "EaseInOutQuart"
//   | Type.EaseInQuint => "EaseInQuint"
//   | Type.EaseOutQuint => "EaseOutQuint"
//   | Type.EaseInOutQuint => "EaseInOutQuint"
//   | Type.CubicBezier(_, _, _, _) => "CubicBezier"
//   };

// let componentList: Belt.List.t(Select.selectOption) = [
//   {value: "FieldFloat", text: "Field Float", disabled: false},
//   {value: "FieldVector", text: "Field Vector", disabled: false},
//   {
//     value: "TransformLocalPosition",
//     text: "Transform.localPosition",
//     disabled: false,
//   },
// ];

// let parseFloat = s => switch (Belt.Float.fromString(s)) {
// | Some(value) => value
// | None => 0.0
// };

// let componentEntitiesList =
//     (appState: Type.state, component: Type.animatedComponent)
//     : Belt.List.t(Select.selectOption) => {
//   let selectOption =
//     switch (component) {
//     | FieldFloat(_) =>
//       Belt.Map.String.mapWithKey(appState.fieldFloat, (key, _) =>
//         (
//           {
//             value: key,
//             text: Uuid_Util.humanFriendlyEntity(key),
//             disabled: false,
//           }: Select.selectOption
//         )
//       )
//     | FieldVector(_) =>
//       Belt.Map.String.mapWithKey(appState.fieldVector, (key, _) =>
//         (
//           {
//             value: key,
//             text: Uuid_Util.humanFriendlyEntity(key),
//             disabled: false,
//           }: Select.selectOption
//         )
//       )
//     | TransformLocalPosition(_) =>
//       Belt.Map.String.mapWithKey(appState.transform, (key, _) =>
//         (
//           {
//             value: key,
//             text: Uuid_Util.humanFriendlyEntity(key),
//             disabled: false,
//           }: Select.selectOption
//         )
//       )
//     // | _ => {
//     //   Js.log("Wrong switch option");
//     //   Belt.Map.String.empty
//     // }
//     };

//   selectOption->Belt.Map.String.valuesToArray->Belt.List.fromArray;
// };

// let getComponentEntity = (component: Type.animatedComponent): string =>
//   switch (component) {
//   | FieldFloat(entity, _) => entity
//   | FieldVector(entity, _) => entity
//   | TransformLocalPosition(entity) => entity
//   };

// let mapTextToComponent = (component: string): Type.animatedComponent =>
//   switch (component) {
//   | "FieldFloat" => FieldFloat("", "")
//   | "FieldVector" => FieldVector("", "")
//   | "TransformLocalPosition" => TransformLocalPosition("")
//   | _ =>
//     Js.log("Wrong switch option");
//     FieldFloat("", "");
//   };

// let mapComponentToText = (component: Type.animatedComponent): string =>
//   switch (component) {
//   | FieldFloat(_) => "FieldFloat"
//   | FieldVector(_) => "FieldVector"
//   | TransformLocalPosition(_) => "TransformLocalPosition"
//   };

// let msToTime = ms => {
//   let seconds = mod_float(ms / 1000.0, 60.0);
//   let minutes = mod_float(ms / (1000.0 *. 60.0), 60.0);

//   let formattedMinutes =
//     minutes < 10.0
//       ? "0" ++ Js.Float.toFixed(minutes) : Js.Float.toFixed(minutes);

//   let formattedSeconds =
//     seconds < 10.0
//       ? "0" ++ Js.Float.toFixed(seconds) : Js.Float.toFixed(seconds);

//   formattedMinutes ++ ":" ++ formattedSeconds;
// };

// [@react.component]
// let make = (~name: Type.entity) => {
//   let (appState, appDispatch) = React.useContext(App_Context.context);
//   let (_, modalDispatch) = React.useContext(Modal_Context.context);
//   let (editorState, _) = React.useContext(Editor_Context.context);

//   let (keyframeIndex, setKeyframeIndex) = React.useState(() => (-1));

//   let animation =
//     Animation_Component.get(
//       ~state=appState,
//       ~name,
//       ~entity=editorState.selectedEntity,
//     );

//   let modalBody =
//     switch (animation) {
//     | None => ("Animation doesn't exist")
//     | Some(animation) =>
//       let animationLength =
//         Belt.List.reduce(animation.keyframes, 0.0, (sum, keyframe) =>
//           keyframe.duration +. sum
//         );

//       let selectedKeyframe =
//         Belt.List.get(animation.keyframes, keyframeIndex);

//       let setKeyframeDuration = (keyframe: Reshape.Type.keyframe, event) =>
//         appDispatch(
//           App_Context.SetAnimationKeyframe(
//             editorState.selectedEntity,
//             name,
//             keyframeIndex,
//             {...keyframe, duration: parseFloat(ReactEvent.Form.target(event)##value)},
//           ),
//         );

//       let setKeyframeValueRange = (keyframe, valueRange) =>
//         appDispatch(
//           App_Context.SetAnimationKeyframe(
//             editorState.selectedEntity,
//             name,
//             keyframeIndex,
//             {...keyframe, valueRange},
//           ),
//         );

//       let setIsPlaying = isPlaying =>
//         appDispatch(
//           App_Context.SetAnimation(
//             editorState.selectedEntity,
//             name,
//             {...animation, isPlaying},
//           ),
//         );

//       let setCurrentTime = event =>
//         appDispatch(
//           App_Context.SetAnimation(
//             editorState.selectedEntity,
//             name,
//             {...animation, currentTime: parseFloat(ReactEvent.Form.target(event)##value)},
//           ),
//         );

//       let addKeyframe = () => {
//         appDispatch(
//           App_Context.SetAnimationKeyframes(
//             editorState.selectedEntity,
//             name,
//             Belt.List.add(
//               animation.keyframes,
//               Animation_Component.emptyKeyframe(10.0),
//             ),
//           ),
//         );

//         setKeyframeIndex(_ => Belt.List.length(animation.keyframes));
//       };

//       let setAnimationComponent =
//           (~component, ~componentEntity, ~animationName) => {
//         let animatedComponent =
//           switch (component) {
//           | Type.FieldFloat(_, name) =>
//             Type.FieldFloat(componentEntity, name)
//           | Type.FieldVector(_, name) =>
//             Type.FieldVector(componentEntity, name)
//           | Type.TransformLocalPosition(_) =>
//             Type.TransformLocalPosition(componentEntity)
//           };

//         appDispatch(
//           App_Context.SetAnimationComponent(
//             editorState.selectedEntity,
//             animationName,
//             animatedComponent,
//           ),
//         );

//         ();
//       };

//       <>
//         <div className="grid grid-cols-12 gap-1 my-1">
//           <div className="col-span-6 grid grid-cols-12 gap-1">
//             <Input
//               containerClassName="col-span-12 grid grid-cols-12"
//               labelClassName="col-span-4"
//               inputClassName="col-span-8"
//               label={("name")}
//               value=name
//               onChange={() => {}}
//               disabled=true
//             />

//             <Checkbox
//               containerClassName="col-span-12 grid grid-cols-12"
//               labelClassName="col-span-4"
//               inputClassName="col-span-8"
//               label={("isPlaying")}
//               value={animation.isPlaying}
//               onChange={() => {setIsPlaying(!animation.isPlaying)}}
//             />

//             <Input
//               containerClassName="col-span-12 grid grid-cols-12"
//               labelClassName="col-span-4"
//               inputClassName="col-span-8"
//               label={("currentTime")}
//               type="number"
//               value={(animation.currentTime)}
//               onChange={setCurrentTime}
//               max={(animationLength)}
//               min="0"
//             />

//             <div className="col-span-4"> {("component")} </div>
//             <div className="col-span-4">
//               <Select
//                 options=componentList
//                 value={mapComponentToText(animation.component)}
//                 onChange={component =>
//                   setAnimationComponent(
//                     ~component=mapTextToComponent(component),
//                     ~componentEntity="",
//                     ~animationName=name,
//                   )
//                 }
//               />
//             </div>
//             <div className="col-span-4">
//               <Select
//                 options={componentEntitiesList(appState, animation.component)}
//                 value={getComponentEntity(animation.component)}
//                 onChange={componentEntity =>
//                   setAnimationComponent(
//                     ~component=animation.component,
//                     ~componentEntity,
//                     ~animationName=name,
//                   )
//                 }
//               />
//             </div>

//             <div className="col-span-4"> {("isFinished")} </div>
//             <div className="col-span-8">
//               {(animation.isFinished ? "true" : "false")}
//             </div>

//             <div className="col-span-4"> {("wrapMode")} </div>
//             <div className="col-span-8">
//               {(wrapModeToString(animation.wrapMode))}
//             </div>
//           </div>
//           <div className="col-span-6 grid grid-cols-12 gap-1 my-1">
//             <Button className="col-span-12" onClick={() => {addKeyframe()}}>
//               {("Add keyframe")}
//             </Button>
//             {switch (selectedKeyframe) {
//              | None => React.null
//              | Some(keyframe) =>
//                 <>
//                  <div className="col-span-4">
//                    {("duration")}
//                  </div>
//                  <div className="col-span-8">
//                    <Input
//                      value={(keyframe.duration)}
//                      onChange={setKeyframeDuration(keyframe)}
//                    />
//                  </div>
//                  <div className="col-span-4">
//                    {("timingFunction")}
//                  </div>
//                  <div className="col-span-8"> {("Linear")} </div>
//                  <div className="col-span-4">
//                    {("valueRange")}
//                  </div>
//                  <div className="col-span-8">
//                    {switch (keyframe.valueRange) {
//                     | Float(value) =>
//                       <Vector
//                         value
//                         onChange={value => {setKeyframeValueRange(keyframe, Float(value))}}
//                       />
//                     | Vector((v1, v2)) =>
//                       <>
//                         <Vector
//                           value={v1} onChange={value => {
//                           setKeyframeValueRange(keyframe, Vector((value, v2)));
//                         }} />
//                         <Vector
//                           value={v2} onChange={value => {
//                           setKeyframeValueRange(keyframe, Vector((v1, value)));
//                         }} />
//                       </>
//                     }}
//                  </div>
//                </>
//              }}
//           </div>
//         </div>
//         <div
//           className="flex h-20 bg-gray-700 bg-opacity-75 relative overflow-hidden">
//           {Belt.List.mapWithIndex(
//              animation.keyframes, (index, keyframe: Type.keyframe) =>
//              <button
//                key={Belt.Int.toString(index)}
//                className={
//                  (index === keyframeIndex ? "border-white" : "border-black")
//                  ++ " flex flex-wrap items-center justify-center border overflow-hidden"
//                 }
//                style={ReactDOMRe.Style.make(
//                  ~flex=
//                    (
//                      keyframe.duration *. animationLength / 100.0,
//                    ),
//                  (),
//                )}
//                onClick={() => {setKeyframeIndex(_ => index)}}
//               >
//                {switch (keyframe.valueRange) {
//                 | Float((from, to_)) =>
//                   <>
//                     {(
//                        timingFunctionToString(keyframe.timingFunction),
//                      )}
//                     <br />
//                     {((from))}
//                     {(" - ")}
//                     {((to_))}
//                   </>
//                 | Vector((from, to_)) =>
//                   <>
//                     {(
//                        timingFunctionToString(keyframe.timingFunction),
//                      )}
//                     <br />
//                     <Vector value=from onChange={() => {}} />
//                     {(" - ")}
//                     <Vector value=to_ onChange={() => {}} />
//                   </>
//                 }}
//              </button>
//            )
//            ->Array.of_list
//            ->React.array}
//           <div
//             className="absolute w-full h-full flex flex-col justify-between pointer-events-none"
//             style={ReactDOMRe.Style.make(
//               ~transform=
//                 "translate("
//                 ++ (
//                      animation.currentTime *. 100.0 / animationLength,
//                    )
//                 ++ "%)",
//               (),
//             )}>
//             <div className="ml-1 overflow-hidden w-10">
//               {(msToTime(animation.currentTime))}
//             </div>
//             <div className="absolute border-l border-red-500 h-full" />
//           </div>
//         </div>
//         // <div className="ml-1 overflow-hidden w-10">{(Js.Float.toFixedWithPrecision(animation.value, ~digits=2))}</div>
//       </>;
//     };

//   <Modal
//     id="animationModal"
//     render={(modal: Modal_Context.modal) => modalBody}
//   />;
// };
