import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const deleteImageByUrl = (imageUrl: string) => {
  const imageRef = ref(storage, imageUrl);
  deleteObject(imageRef)
    .then(() => {
      console.log("Image deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting image:", error);
    });
};

export const handleUploadStorage = async (file: File, path: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file) {
        throw new Error("No File Provided!");
      }
      const imgRef = ref(storage, `${path}${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);

      resolve(url);
    } catch (error) {
      reject(error);
    }
  });
};
