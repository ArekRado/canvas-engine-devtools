import {
  generateEntity,
  initialState,
  setEntity,
} from '@arekrado/canvas-engine';
import { generateTree } from '../src/ui/EntityList';

describe('generateTree', () => {
  it('should return empty array when list is empty', () => {
    expect(generateTree(initialState)).toEqual([]);
  });

  it('should return flat array when transforms dont have any parent', () => {
    const e1 = generateEntity('e1');
    const e2 = generateEntity('e2');

    const v1 = setEntity({ state: initialState, entity: e1 });
    const v2 = setEntity({ state: v1, entity: e2 });

    expect(generateTree(v2)).toEqual([
      {
        entity: e1,
        children: [],
      },
      {
        entity: e2,
        children: [],
      },
    ]);
  });

  it('should return tree when transforms have parent', () => {
    const e2 = generateEntity('e2');
    const e1 = generateEntity('e1', { parentId: e2.id });

    const v1 = setEntity({ state: initialState, entity: e1 });
    const v2 = setEntity({ state: v1, entity: e2 });

    expect(generateTree(v2)).toEqual([
      {
        children: [
          {
            children: [],
            entity: e1,
          },
        ],
        entity: e2,
      },
    ]);
  });

  it('should return tree when transforms have parent - deep example', () => {
    const e4 = generateEntity('e4');
    const e3 = generateEntity('e3', { parentId: e4.id });
    const e2 = generateEntity('e2', { parentId: e3.id });
    const e1 = generateEntity('e1', { parentId: e2.id });
    const e5 = generateEntity('e5', { parentId: e1.id });
    const e6 = generateEntity('e6', { parentId: e1.id });
    const e7 = generateEntity('e7', { parentId: e3.id });
    const e9 = generateEntity('e9');
    const e8 = generateEntity('e8', { parentId: e9.id });

    const v1 = setEntity({ state: initialState, entity: e1 });
    const v2 = setEntity({ state: v1, entity: e2 });
    const v3 = setEntity({ state: v2, entity: e3 });
    const v4 = setEntity({ state: v3, entity: e4 });
    const v5 = setEntity({ state: v4, entity: e5 });
    const v6 = setEntity({ state: v5, entity: e6 });
    const v7 = setEntity({ state: v6, entity: e7 });
    const v8 = setEntity({ state: v7, entity: e8 });
    const v9 = setEntity({ state: v8, entity: e9 });

    const data = [
      {
        entity: { id: '1' },
        data: { parent: { id: '2' } },
      },
      {
        entity: { id: '2' },
        data: { parent: { id: '3' } },
      },
      {
        entity: { id: '3' },
        data: { parent: { id: '4' } },
      },
      {
        entity: { id: '4' },
        data: {},
      },
      {
        entity: { id: '5' },
        data: { parent: { id: '1' } },
      },
      {
        entity: { id: '6' },
        data: { parent: { id: '1' } },
      },
      {
        entity: { id: '7' },
        data: { parent: { id: '3' } },
      },
      {
        entity: { id: '8' },
        data: { parent: { id: '9' } },
      },
      {
        entity: { id: '9' },
        data: {},
      },
    ];

    expect(generateTree(v9)).toEqual([
      {
        children: [
          {
            children: [
              {
                children: [
                  {
                    children: [
                      {
                        children: [],
                        entity: e5,
                      },
                      {
                        children: [],
                        entity: e6,
                      },
                    ],
                    entity: e1,
                  },
                ],
                entity: e2,
              },
              {
                children: [],
                entity: e7,
              },
            ],
            entity: e3,
          },
        ],
        entity: e4,
      },
      {
        children: [
          {
            children: [],
            entity: e8,
          },
        ],
        entity: e9,
      },
    ]);
  });
});
