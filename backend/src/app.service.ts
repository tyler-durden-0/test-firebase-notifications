import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  async generateNotification(payload: any): Promise<any> {
    return admin
      .messaging()
      .sendToDevice(payload?.fcmToken, { data: { text: payload.text } });
  }
}
