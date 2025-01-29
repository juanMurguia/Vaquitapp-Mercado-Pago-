import admin from "firebase-admin";

// Validar que la variable de entorno existe
if (!process.env.FIREBASE_CONNECTION) {
  throw new Error(
    "🔥 FIREBASE_CONNECTION is not set in environment variables."
  );
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION);
} catch (error) {
  throw new Error("🔥 Invalid JSON in FIREBASE_CONNECTION: " + error.message);
}

// Inicializar Firebase solo si no está ya inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("se inicia firebase");
}

const firestore = admin.firestore();
export { firestore };
