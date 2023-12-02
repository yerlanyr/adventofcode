/**
 * @type {[separator, dataDefinition] | [dataDefinition, separator, dataDefinition] | String | Number} DataDefinition
 * @param {DataDefinition} dataDefinition 
 * @param {String} contents 
 * @returns
 */
export function parseByDefinition(dataDefinition, contents) {
  if (dataDefinition === String) {
    return contents;
  }
  if (dataDefinition === Number) {
    return +contents;
  }
  if (!Array.isArray(dataDefinition)) {
    throw Error('Unexpected type of ' + JSON.stringify(dataDefinition, undefined, ' '));
  }
  if (dataDefinition.length === 3) {
    const [a, b] = contents.split(dataDefinition[1]);
    return [parseByDefinition(dataDefinition[0], a), parseByDefinition(dataDefinition[2], b)];
  }
  if (dataDefinition.length === 2) {
    const arr = contents.split(dataDefinition[0]);
    return arr.map(item => parseByDefinition(dataDefinition[1], item));
  }
}
