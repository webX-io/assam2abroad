import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCGqygd7VJ79LW6jJFDkXt-_sWo2Z_yHCM",
  authDomain: "polar-grid-k8gvj.firebaseapp.com",
  projectId: "polar-grid-k8gvj",
  storageBucket: "polar-grid-k8gvj.firebasestorage.app",
  messagingSenderId: "629402740493",
  appId: "1:629402740493:web:7cb2d3371859980f1b7244"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-assam2abroad-814f9b6a-5b2c-4884-b7a1-e8a595cdd500");
export const auth = getAuth(app);

export interface Enquiry {
  id: string;
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  country: string;
  interestedProgram: string;
  message: string;
  createdAt: any; // Firestore Timestamp
  status: 'New' | 'Contacted';
}

/**
 * Submit a new enquiry to Firestore
 */
export async function addEnquiryToDb(data: {
  fullName: string;
  emailAddress: string;
  mobileNumber: string;
  country: string;
  interestedProgram: string;
  message: string;
}) {
  try {
    const colRef = collection(db, 'enquiries');
    await addDoc(colRef, {
      ...data,
      createdAt: Timestamp.now(),
      status: 'New'
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding enquiry to database: ", error);
    return { success: false, error };
  }
}

/**
 * Update enquiry status
 */
export async function updateEnquiryStatusInDb(id: string, status: 'New' | 'Contacted') {
  try {
    const docRef = doc(db, 'enquiries', id);
    await updateDoc(docRef, { status });
    return { success: true };
  } catch (error) {
    console.error("Error updating enquiry: ", error);
    return { success: false, error };
  }
}

/**
 * Delete an enquiry
 */
export async function deleteEnquiryFromDb(id: string) {
  try {
    const docRef = doc(db, 'enquiries', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting enquiry: ", error);
    return { success: false, error };
  }
}

/**
 * Set up real-time listener for enquiries
 */
export function listenToEnquiries(onUpdate: (enquiries: Enquiry[]) => void) {
  const colRef = collection(db, 'enquiries');
  const q = query(colRef, orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const enquiries: Enquiry[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      enquiries.push({
        id: doc.id,
        fullName: data.fullName || '',
        emailAddress: data.emailAddress || '',
        mobileNumber: data.mobileNumber || '',
        country: data.country || '',
        interestedProgram: data.interestedProgram || '',
        message: data.message || '',
        createdAt: data.createdAt,
        status: data.status || 'New'
      });
    });
    onUpdate(enquiries);
  }, (error) => {
    console.error("Error listening to enquiries: ", error);
  });
}

/**
 * Seed Admin account if needed, then login
 */
export async function loginAdminUser(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    // If user not found, and we are trying to login as admin, auto-create the account
    if (
      error.code === 'auth/user-not-found' || 
      error.code === 'auth/invalid-credential' || 
      error.message?.includes('user-not-found') ||
      error.message?.includes('INVALID_LOGIN_CREDENTIALS')
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
      } catch (createError) {
        console.error("Auto-create user failed:", createError);
        throw error;
      }
    }
    throw error;
  }
}

/**
 * Logout admin
 */
export async function logoutAdminUser() {
  await signOut(auth);
}
