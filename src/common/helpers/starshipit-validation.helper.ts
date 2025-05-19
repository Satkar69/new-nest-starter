import { timingSafeEqual } from 'crypto';

export async function validateWebhook(rawBody: any, headerSignature: string): Promise<boolean> {
  //to change to github env file
  const secret = 'fuMECnA+UDjyp5wNt3+1pZRaxEzn3Ev3DOEPzvOMlCE=';

  const rawBodyString = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);

  const encoder = new TextEncoder();
  const payloadData = encoder.encode(rawBodyString);

  if (headerSignature.startsWith('sha256=')) {
    headerSignature = headerSignature.slice(7);
  }

  const keyData = encoder.encode(secret);

  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, payloadData);
  const computedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const computedBuffer = Buffer.from(computedSignature, 'hex');
  const headerBuffer = Buffer.from(headerSignature, 'hex');

  if (computedBuffer.length !== headerBuffer.length) {
    console.log('Buffer lengths differ. Validation failed.');
    return false;
  }

  const isValid = timingSafeEqual(computedBuffer, headerBuffer);
  return isValid;
}

export function validateOrderNumber(orderNumber: string): boolean {
  const regex = /^FM\d+$/;
  return regex.test(orderNumber);
}
