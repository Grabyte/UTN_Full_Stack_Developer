// Importa los servicios necesarios
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ¡Este es el import que faltaba!

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Analytics (opcional)
const analytics = getAnalytics(app);

// Inicializa Firestore (¡importante para tu contador de victorias!)
const db = getFirestore(app);

// Exporta los servicios que necesites
export { db, analytics }; // Exporta db para usarlo en otros archivos