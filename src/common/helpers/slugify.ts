import slugify from 'slugify';

export function createSlug(text: string, options?: { counter?: number; replacement?: string }): string {
  if (options?.counter > 0) {
    text = `${text}-${options?.counter}`;
  }

  return slugify(text, {
    replacement: options?.replacement || '-',
    lower: true,
    strict: true,
    locale: 'en',
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  });
}

export function toSnakeCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function toCamelCase(input: string): string {
  return input
    .replace(/^\s+|\s+$/g, '') // Trim leading and trailing spaces
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0 || match.trim() === '') return ''; // Skip spaces or non-words
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

export function snakeToNormalWords(input: string): string {
  return input
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export function camelToNormalWords(input: string): string {
  //make first letter capital
  input = input.charAt(0).toUpperCase() + input.slice(1);
  return input
    .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
}
export function snakeToCamelCase(input: string): string {
  return input
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()) // Convert each letter after an underscore to uppercase
    .replace(/^([a-z])/, (_, firstLetter) => firstLetter.toLowerCase()); // Make the first letter lowercase
}

export function camelToSnakeCase(input: string): string {
  return input
    .replace(/([A-Z])/g, '_$1') // Add an underscore before each capital letter
    .toLowerCase(); // Convert the entire string to lowercase
}
