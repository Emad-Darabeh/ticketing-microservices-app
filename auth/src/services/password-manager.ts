import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export default class PasswordManager {
  static async toHash(plainPassword: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(plainPassword, salt, 64)) as Buffer;
    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, plainPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(plainPassword, salt, 64)) as Buffer;
    return buffer.toString('hex') === hashedPassword;
  }
}
