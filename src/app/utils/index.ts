export function mergeUniqueByProperty<T>(array1: T[], array2: T[], property: keyof T) {
  return [...array1, ...array2].filter((obj, index, self) =>
    index === self.findIndex((item) => item[property] === obj[property])
  );
}
