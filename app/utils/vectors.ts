export type Vector = {
  x: number;
  y: number;
};

export const createVector = (x: number, y: number): Vector => {
  return {
    x: x,
    y: y,
  };
};

export const angle = (vector: Vector): number => {
  return Math.atan2(vector.y, vector.x);
};

export const add = (vector1: Vector, vector2: Vector): Vector => {
  return {
    x: vector1.x + vector2.x,
    y: vector1.y + vector2.y,
  };
};

export const subtract = (vector1: Vector, vector2: Vector): Vector => {
  return {
    x: vector1.x - vector2.x,
    y: vector1.y - vector2.y,
  };
};

export const multiply = (vector1: Vector, vector2: Vector): Vector => {
  return {
    x: vector1.x * vector2.x,
    y: vector1.y * vector2.y,
  };
};

export const divide = (vector1: Vector, vector2: Vector): Vector => {
  return {
    x: vector1.x / vector2.x,
    y: vector1.y / vector2.y,
  };
};

export const dot = (vector1: Vector, vector2: Vector): number => {
  return vector1.x * vector2.x + vector1.y * vector2.y;
};

export const magnitude = (vector: Vector): number => {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

export const toString = (vector: Vector): string => {
  return `(${vector.x}, ${vector.y})`;
};

export const fromAngle = (angle: number, magnitude: number): Vector => {
  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle),
  };
};
