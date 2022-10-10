import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import * as firebase from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509certUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: 'https://news-ppt-default-rtdb.firebaseio.com/',
    });
  }
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token !== null && token != ' ') {
      this.defaultApp
        .auth()
        .verifyIdToken(token.replace('Bearer', ' '))
        .then(async (decodedToken) => {
          const user = {
            email: decodedToken.email,
          };
          req['user'] = user;
          next();
        })
        .catch((error) => {
          this.accesDenied(req.url, res);
        });
    } else {
      next();
    }
  }
  private accesDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timeStamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied',
    });
  }
}
