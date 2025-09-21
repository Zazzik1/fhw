import { describe, it, vi, expect, beforeAll, beforeEach } from 'vitest';

const doc = vi.fn(() => ({ id: 'mockDocId' }));
const setDoc = vi.fn(() => Promise.resolve());
const dataMock = vi.fn(() => ({}));
const getDoc = vi.fn(() =>
    Promise.resolve({
        exists: () => true,
        data: dataMock,
    }),
);

vi.mock('firebase/firestore', () => {
    return {
        doc,
        setDoc,
        getDoc,
    };
});

type Auth = { currentUser?: Record<string, unknown> };
const auth: Auth = { currentUser: { uid: 'test-uid' } };

vi.mock('@/utils/firebase.utils', () => {
    return {
        auth,
        db: { app: 'mocked-db' },
    };
});

let updateUserScoreIfHigher: any;

beforeAll(async () => {
    ({ updateUserScoreIfHigher } = await import(
        '@/lib/updateUserScoreIfHigher'
    ));
});

beforeEach(() => {
    vi.clearAllMocks();
    auth.currentUser = { uid: 'test-uid' };
});

describe('updateUserScoreIfHigher', () => {
    it('should update the score if doc exists and the new score is higher than the current score', async () => {
        dataMock.mockReturnValueOnce({ score: 20 });
        await updateUserScoreIfHigher(22);
        expect(setDoc).toHaveBeenCalledWith(
            doc(),
            { score: 22 },
            { merge: true },
        );
    });
    it('should not update the score if doc exists and the new score is smaller than the current score', async () => {
        dataMock.mockReturnValueOnce({ score: 88 });
        await updateUserScoreIfHigher(74);
        expect(setDoc).not.toHaveBeenCalled();
    });
    it('should update the score if doc does not exist', async () => {
        getDoc.mockResolvedValueOnce({
            data: {},
            exists: () => false,
        } as unknown as Awaited<ReturnType<typeof getDoc>>);
        await updateUserScoreIfHigher(123);
        expect(setDoc).toHaveBeenCalledWith(
            doc(),
            { score: 123 },
            { merge: true },
        );
    });
    it('should not update the score if user does not exist', async () => {
        auth.currentUser = undefined;
        dataMock.mockReturnValueOnce({ score: 0 });
        await updateUserScoreIfHigher(999999);
        expect(setDoc).not.toHaveBeenCalled();
    });
    it('should reject the promise if getDoc throws an error', async () => {
        getDoc.mockRejectedValueOnce(new Error('something failed!!!11'));
        dataMock.mockReturnValueOnce({ score: 0 });
        expect(updateUserScoreIfHigher(999999)).rejects.toThrow(
            'something failed!!!11',
        );
        expect(setDoc).not.toHaveBeenCalled();
    });
    it('should reject the promise if setDoc throws an error', async () => {
        getDoc.mockRejectedValueOnce(new Error('nonono'));
        dataMock.mockReturnValueOnce({ score: 0 });
        expect(updateUserScoreIfHigher(999999)).rejects.toThrow('nonono');
        expect(setDoc).not.toHaveBeenCalled();
    });
});
