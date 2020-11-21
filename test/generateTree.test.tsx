import { generateTree } from '../src/ui/EntityList';

describe('generateTree', () => {
  it('should return empty array when list is empty', () => {
    expect(generateTree([])).toEqual([]);
  });

  it('should return flat array when transforms dont have any parent', () => {
    const data: any = [
      {
        entity: { id: '1' },
        data: {},
      },
      {
        entity: { id: '2' },
        data: {},
      },
    ];

    expect(generateTree(data)).toEqual([
      {
        entity: { id: '1' },
        children: [],
      },
      {
        entity: { id: '2' },
        children: [],
      },
    ]);
  });

  it('should return tree when transforms have parent', () => {
    const data: any = [
      {
        entity: { id: '1' },
        data: {
          parent: { id: '2' },
        },
      },
      {
        entity: { id: '2' },
        data: {},
      },
    ];

    expect(generateTree(data)).toEqual([
      {
        children: [
          {
            children: [],
            entity: {
              id: '1',
            },
          },
        ],
        entity: {
          id: '2',
        },
      },
    ]);
  });

  it('should return tree when transforms have parent - deep example', () => {
    const data: any = [
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

    expect(generateTree(data)).toEqual([
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
                        entity: {
                          id: '5',
                        },
                      },
                      {
                        children: [],
                        entity: {
                          id: '6',
                        },
                      },
                    ],
                    entity: {
                      id: '1',
                    },
                  },
                ],
                entity: {
                  id: '2',
                },
              },
              {
                children: [],
                entity: {
                  id: '7',
                },
              },
            ],
            entity: {
              id: '3',
            },
          },
        ],
        entity: {
          id: '4',
        },
      },
      {
        children: [
          {
            children: [],
            entity: {
              id: '8',
            },
          },
        ],
        entity: {
          id: '9',
        },
      },
    ]);
  });
});
