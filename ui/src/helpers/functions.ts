export function getLastItem<T>(array: Array<T>): T|null {
  return array[array.length - 1]
}
