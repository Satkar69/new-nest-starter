import * as fs from 'fs';
export async function deleteFile(filePath: string) {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error(`Error deleting file: ${filePath}`);
    console.error(error);
  }
}
