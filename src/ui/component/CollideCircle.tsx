import { CollideCircle as CollideCircleType } from '@arekrado/canvas-engine/dist/component';
import React, { useContext } from 'react';
import { AppContext } from '../../context/app';
import { Input } from '../common/Input';
import { Vector } from '../common/Vector';

type CollideCircleProps = {
  component: CollideCircleType;
};
export const CollideCircle: React.FC<CollideCircleProps> = ({ component }) => {
  // const appState = useContext(AppContext);

  // const setCollideCircleData = (
  //   data: Partial<CollideCircleType['data']>
  // ): void =>
  //   appState.dispatch({
  //     type: 'SetCollideCircleComponent',
  //     payload: {
  //       ...component,
  //       data: {
  //         ...component.data,
  //         ...data,
  //       },
  //     },
  //   });

  return (
    <div>
      <div className="grid grid-cols-12 gap-1 mb-3">
        <div className="col-span-4"> radius </div>
        <div className="col-span-8">
          <Input value={component.data.radius} onChange={() => {}} />
        </div>
        <div className="col-span-4"> position </div>
        <div className="col-span-8">
          <Vector
            name="position"
            id="position"
            value={component.data.position}
            onChange={() => {}}
          />
        </div>
        {component.data.collisions.length > 0 && <div> Collisions </div>}
        {component.data.collisions.map((collisionType) => {
          if (collisionType.type === 'box') {
            return `Box - ${collisionType.entity.name}`;
          }

          if (collisionType.type === 'circle') {
            return `Circle - ${collisionType.entity.name}`;
          }

          return '-';
        })}
      </div>
    </div>
  );
};

// [@react.component]
// let make = (~items: Belt.Map.String.t(Reshape.Type.component.data)) => {
//   let (_, appDispatch) = React.useContext(App_Context.context);
//   let (_, modalDispatch) = React.useContext(Modal_Context.context);
//   let (editorState, _) = React.useContext(Editor_Context.context);

//   items
//   ->Belt.Map.String.toArray
//   ->Belt.Array.map(((key, collideCircle)) =>
//       <React.Fragment key>
//         <div className="flex justify-between mt-3">
//           <div className="text-white"> {React.string("Collide box")} </div>
//           <Button onClick={_ => {modalDispatch(OpenModal(key, None))}}>
//             {React.string("x")}
//           </Button>
//           <Confirm_Modal
//             id=key
//             title={React.string(
//               "Are you sure you want to remove collide circle?",
//             )}
//             onAccept={_ =>
//               appDispatch(
//                 RemoveCollideCircle(editorState.selectedEntity, key),
//               )
//             }
//           />
//         </div>
//         <div className="grid grid-cols-12 gap-1 mb-3">
//           <div className="col-span-4"> {React.string("radius")} </div>
//           <div className="col-span-8">
//             <Input
//               value={Belt.Float.toString(collideCircle.radius)}
//               onChange={_ => {()}}
//             />
//           </div>
//           <div className="col-span-4"> {React.string("position")} </div>
//           <div className="col-span-8">
//             <Vector
//               value={collideCircle.position}
//               onChange={_ => {()}}
//             />
//           </div>
//           {Belt.List.length(collideCircle.collisions) > 0
//              ? <div> {React.string("Collisions:")} </div> : React.null}
//           {Belt.List.map(
//              collideCircle.collisions, (collisionType: Reshape.Type.collideType) =>
//              switch (collisionType) {
//              | Box(entity) =>
//                <Entity
//                  key=entity
//                  entity={
//                    "Box(" ++ Reshape.Uuid_Util.humanFriendlyEntity(entity) ++ ")"
//                  }
//                  humanFriendlyEntity=false
//                />
//              | Circle(entity) =>
//                <Entity
//                  key=entity
//                  entity={
//                    "Circle(" ++ Reshape.Uuid_Util.humanFriendlyEntity(entity) ++ ")"
//                  }
//                  humanFriendlyEntity=false
//                />
//              }
//            )
//            ->Array.of_list
//            ->React.array}
//         </div>
//       </React.Fragment>
//     )
//   ->React.array;
// };