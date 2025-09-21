import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/utils/firebase.utils';

export const updateUserScoreIfHigher = async (newScore) => {
    const user = auth.currentUser;
    if (!user) {
        return;
    }

    const userDocRef = doc(db, 'users', user.uid);

    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
        const currentScore = docSnap.data().score || 0;

        if (newScore > currentScore) {
            await setDoc(userDocRef, { score: newScore }, { merge: true });
        }
    } else {
        await setDoc(userDocRef, { score: newScore }, { merge: true });
    }
};
