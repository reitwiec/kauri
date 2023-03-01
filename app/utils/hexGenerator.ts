import {add, angle, createVector, fromAngle, subtract, Vector} from './vectors';

type _quadBezier = {
  controlPoint: Vector;
  to: Vector;
};

type _line = {
  to: Vector;
};

const getQPath = (config: _quadBezier) => {
  return `Q${config.controlPoint.x} ${config.controlPoint.y} ${config.to.x} ${config.to.y}`;
};

const getLPath = (config: _line) => {
  return `L${config.to.x} ${config.to.y}`;
};

const getMPath = (point: Vector) => {
  return `M${point.x} ${point.y}`;
};

type command = {
  key: string;
  config: any;
};
const createPath = (commands: command[]) => {
  let path = '';
  commands.forEach(command => {
    switch (command.key) {
      case 'M':
        path += getMPath(command.config);
        break;
      case 'Q':
        path += getQPath(command.config);
        break;
      case 'L':
        path += getLPath(command.config);
        break;
      case 'Z':
        path += 'Z';
    }
  });
  return path;
};

const getPath = (height: number, width: number, radius: number) => {
  let a: Vector, b: Vector, c: Vector, d: Vector, e: Vector, f: Vector;
  a = createVector(width / 2, 0);
  b = createVector(width, height / 4);
  c = createVector(width, (height * 3) / 4);
  d = createVector(width / 2, height);
  e = createVector(0, (height * 3) / 4);
  f = createVector(0, height / 4);

  let right: Vector = fromAngle(angle(subtract(b, a)), radius);
  let left: Vector = fromAngle(angle(subtract(f, a)), radius);
  let level: Vector = createVector(0, radius);
  return createPath([
    {
      key: 'M',
      config: add(a, left),
    },
    {
      key: 'Q',
      config: {
        controlPoint: a,
        to: add(a, right),
      },
    },
    {
      key: 'L',
      config: {
        to: subtract(b, right),
      },
    },
    {
      key: 'Q',
      config: {
        controlPoint: b,
        to: add(b, level),
      },
    },
    {
      key: 'L',
      config: {
        to: subtract(c, level),
      },
    },
    {
      key: 'Q',
      config: {
        controlPoint: c,
        to: add(c, left),
      },
    },
    {
      key: 'L',
      config: {
        to: subtract(d, left),
      },
    },
    {
      key: 'Q',
      config: {
        controlPoint: d,
        to: subtract(d, right),
      },
    },
    {
      key: 'L',
      config: {
        to: add(e, right),
      },
    },
    {
      key: 'Q',
      config: {
        controlPoint: e,
        to: subtract(e, level),
      },
    },
    {
      key: 'L',
      config: {
        to: add(f, level),
      },
    },
    {
      key: 'Q',
      config: {
        controlPoint: f,
        to: subtract(f, left),
      },
    },
    {
      key: 'Z',
      config: undefined,
    },
  ]);
};

export const hex = (length: number, radius: number) => {
  const height = length * 2;
  const width = (height * Math.sqrt(3)) / 2;
  const viewBox = `0 0 ${width} ${height}`;
  const path = getPath(height, width, radius);
  const circumference =
    4 * Math.sqrt(((height / 4) * height) / 4 + ((width / 2) * width) / 2) +
    height;
  return {
    height,
    width,
    viewBox,
    path,
    circumference,
  };
};
