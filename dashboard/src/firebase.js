import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCaZVsG8KiAK7I_IqhBuadlELo0VUim4Mg',
  authDomain: 'fileupload-33fc8.firebaseapp.com',
  projectId: 'fileupload-33fc8',
  storageBucket: 'fileupload-33fc8.appspot.com',
  messagingSenderId: '964295942781',
  appId: '1:964295942781:web:d84e056d9a96b7e6454714',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
