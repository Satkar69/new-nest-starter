export async function fireAndForget<T = any>(promise: Promise<T>): Promise<any> {
  try {
    return await promise;
  } catch (error) {
    console.error('Error in fireAndForget:', error);
  }
}
