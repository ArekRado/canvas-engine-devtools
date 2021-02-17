import { defaultData, Entity, Guid } from '@arekrado/canvas-engine'

import walk1 from '../asset/walkAnimation/walk1.png'
import walk2 from '../asset/walkAnimation/walk2.png'
import walk3 from '../asset/walkAnimation/walk3.png'
import walk4 from '../asset/walkAnimation/walk4.png'
import walk5 from '../asset/walkAnimation/walk5.png'
import walk6 from '../asset/walkAnimation/walk6.png'
import walk7 from '../asset/walkAnimation/walk7.png'
import walk8 from '../asset/walkAnimation/walk8.png'
import walk9 from '../asset/walkAnimation/walk9.png'

const speed = 100

export const walkAnimation = (entityId: Guid) =>
  defaultData.animation({
    entityId: entityId,
    isPlaying: true,
    wrapMode: 'loop',
    keyframes: [
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk1,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk2,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk3,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk4,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk5,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk6,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk7,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk8,
        },
      },
      {
        duration: speed,
        timingFunction: 'Linear',
        valueRange: {
          type: 'string',
          value: walk9,
        },
      },
    ],
    property: {
      path: 'src',
      component: 'sprite',
      entityId,
    },
  })
