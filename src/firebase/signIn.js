import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from './config';

const auth = getAuth(app);

export default async function signIn(email, password) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
