export {
  debugEntity,
  debugSystem,
} from './system/debug/debug';

// TODO
// - enable/disable collider contours
// - entity list should be navigated by keyboard, https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
// - entity list should display systems which names are similar to components assigned to entity
// - position should be always show as vector 3d

// - add component "debugData" - uses can add it to entity to see more details, eg, they will can set custom name
// type DebugData = Component<{displayName: 'player'}>