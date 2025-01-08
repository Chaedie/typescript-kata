// ! 1. ReadOnly

export type Point = {
  x: number;
  y: number;
};

// export type ReadonlyPoint = {
//   readonly x: number;
//   readonly y: number;
// };

export type ReadonlyPoint = Readonly<Point>;

export const origin: ReadonlyPoint = {
  x: 0,
  y: 0,
};

// @ts-expect-error because x, y is readonly
origin.x = 100;

// ! 2. [Key in DataTypes]: number

type DataTypes = "x" | "y";

export type DataMap = {
  // [key in "x" | "y"]: number;

  // [key in DataTypes]: number;

  // [key in keyof Point]: number;

  [key in keyof Point]: Point[key];
};

const data: DataMap = {
  x: 0,
  y: 0,

  // @ts-expect-error z is not in DataTypes
  z: 0,
};
