import {
  componentName,
  createComponent,
  defaultTransform,
  generateEntity,
  getState,
  setEntity,
  Transform,
} from '@arekrado/canvas-engine';
import { generateTree } from '../src/ui/activityView/entityList/EntityList';

describe('generateTree', () => {
  it('should return empty array when list is empty', () => {
    expect(generateTree(getState({}))).toEqual([]);
  });

  it('should return flat array when transforms dont have any parent', () => {
    const e1 = generateEntity({ name: 'e1' });
    const e2 = generateEntity({ name: 'e2' });

    const v1 = setEntity({ state: getState({}), entity: e1 });
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
    const e2 = generateEntity({ name: 'e2' });
    const e1 = generateEntity({ name: 'e1' });

    // const e1 = generateEntity({ parentId: e2.id });

    let state = setEntity({ state: getState({}), entity: e1 });
    state = setEntity({ state, entity: e2 });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e1, parentId: e2 }),
    });

    expect(generateTree(state)).toEqual([
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
    const e4 = generateEntity({ name: 'e4' });
    const e3 = generateEntity({ name: 'e3' });
    const e2 = generateEntity({ name: 'e2' });
    const e1 = generateEntity({ name: 'e1' });
    const e5 = generateEntity({ name: 'e5' });
    const e6 = generateEntity({ name: 'e6' });
    const e7 = generateEntity({ name: 'e7' });
    const e9 = generateEntity({ name: 'e9' });
    const e8 = generateEntity({ name: 'e8' });

    let state = setEntity({ state: getState({}), entity: e1 });
    state = setEntity({ state, entity: e2 });
    state = setEntity({ state, entity: e3 });
    state = setEntity({ state, entity: e4 });
    state = setEntity({ state, entity: e5 });
    state = setEntity({ state, entity: e6 });
    state = setEntity({ state, entity: e7 });
    state = setEntity({ state, entity: e8 });
    state = setEntity({ state, entity: e9 });

    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e3, parentId: e4 }),
    });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e2, parentId: e3 }),
    });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e1, parentId: e2 }),
    });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e5, parentId: e1 }),
    });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e6, parentId: e1 }),
    });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e7, parentId: e3 }),
    });
    state = createComponent<Transform, any>({
      state,
      data: defaultTransform({ entity: e8, parentId: e9 }),
    });

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

    expect(generateTree(state)).toEqual([
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
