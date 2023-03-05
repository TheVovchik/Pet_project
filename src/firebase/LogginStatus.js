import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './config';
import { setInLocalStorage } from '../utils/localStorage';

const auth = getAuth(app);

export default async function LogginStatus(uid) {
  try {
    onAuthStateChanged(auth,
      user => {
        if (user) {
          if (user.uid === uid) {
            setInLocalStorage('signedIn', true);

            return;
          }
        }

        setInLocalStorage('signedIn', false);
      });
  } catch (error) {
    return error;
  }
}
