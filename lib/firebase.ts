/**
 * Inicialización perezosa (lazy) de Firebase.
 *
 * Perezosa a propósito: el SDK no se carga ni se conecta hasta que el usuario
 * realmente pulsa el botón de pago. El Hero y el test no pagan ese peso.
 *
 * CREDENCIALES: no toques este archivo. Crea `web/.env.local` con las variables
 * `NEXT_PUBLIC_FIREBASE_*` (ver .env.local.example). Si faltan, `isFirebaseConfigured()`
 * devuelve false y el embudo degrada con gracia en lugar de romperse.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Colección donde viven los leads. El backend de Python lee de aquí. */
export const LEADS_COLLECTION = 'leads';

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}

let cachedApp: FirebaseApp | null = null;
let cachedDb: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
  if (cachedApp) return cachedApp;
  cachedApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return cachedApp;
}

export function getDb(): Firestore {
  if (cachedDb) return cachedDb;
  cachedDb = getFirestore(getFirebaseApp());
  return cachedDb;
}
