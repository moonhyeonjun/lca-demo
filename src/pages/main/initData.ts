export const initNodes = [
  {
    id: '1',
    type: 'preManufacturing',
    data: { label: 'preManufacturing' },
    position: { x: 150, y: 150 },
    style: {
      width: 120,
      height: 100,
    },
  },
  {
    id: '2',
    type: 'manufacturing',
    data: { label: 'manufacturing' },
    position: { x: 150, y: 400 },
    style: {
      width: 120,
      height: 100,
    },
  },
  {
    id: '3',
    type: 'use',
    data: { label: 'use' },
    position: { x: 400, y: 400 },
    style: {
      width: 120,
      height: 100,
    },
  },
  {
    id: '4',
    type: 'dispose',
    data: { label: 'dispose' },
    position: { x: 400, y: 150 },
    style: {
      width: 120,
      height: 100,
    },
  },
];

export const initEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
];
