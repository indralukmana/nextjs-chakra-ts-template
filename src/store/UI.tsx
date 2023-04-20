import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const desktopModeAtom = atom(false);
desktopModeAtom.debugLabel = 'desktopModeAtom';

const sidebarAtom = atomWithStorage('sidebar', true);
sidebarAtom.debugLabel = 'sidebarAtom';

export { desktopModeAtom, sidebarAtom };
