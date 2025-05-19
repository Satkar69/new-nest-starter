/**
 * Transforms the input value(s) to boolean or boolean array.
 * @param value The input value, can be a string, boolean, or array of strings/booleans.
 * @returns The transformed boolean value or array of booleans.
 */
export function transformBooleanValue(value: any): boolean | boolean[] {
  if (Array.isArray(value)) {
    return value.map((v) => parseBoolean(v));
  } else {
    return parseBoolean(value);
  }
}

/**
 * Parses a single value to boolean.
 * @param value The input value, can be a string or boolean.
 * @returns The boolean representation of the input.
 */
export function parseBoolean(value: any): boolean {
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'true') return true;
    if (lower === 'false') return false;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return value;
}
