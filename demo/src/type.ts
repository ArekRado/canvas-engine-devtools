import { InitialState } from '@arekrado/canvas-engine';

// Utils

// State

// type Components = {
//   box: Dictionary<Box>;
//   ai: Dictionary<AI>;
//   game: Dictionary<Game>;
//   marker: Dictionary<Marker>;
//   background: Dictionary<Background>;
//   logo: Dictionary<Logo>; // todo remove?
// };

// type Systems =
//   | System<Box, AnyStateForSystem>
//   | System<AI, AnyStateForSystem>
//   | System<Game, AnyStateForSystem>
//   | System<Marker, AnyStateForSystem>
//   | System<Background, AnyStateForSystem>
//   | System<Logo, AnyStateForSystem>;

export type State = InitialState<any, AnalyserNode>;
