import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferenceService {

  generateCustomReference(): string {
    const prefix = 'MS-';
    const timestamp = Date.now().toString(36); // Convert timestamp to a base-36 string
    const randomString = this.generateRandomString(6); // Generate a random alphanumeric string of length 6
    return `${prefix}${timestamp}-${randomString}`;
  }

  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
