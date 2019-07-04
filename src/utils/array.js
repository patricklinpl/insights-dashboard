export const partition = (array, compare) => {
  return array.reduce(([pass, fail], element) => {
    return compare(element) ? [[...pass, element], fail] : [pass, [...fail, element]]
  }, [[], []])
}
