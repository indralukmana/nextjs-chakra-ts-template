import { atom } from 'jotai';
import Parse from 'parse';

const currentUserAtom = atom<Parse.User | null>(null);
currentUserAtom.debugLabel = 'currentUserAtom';

export { currentUserAtom };
