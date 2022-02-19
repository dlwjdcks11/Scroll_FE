import { atom, selector } from 'recoil';

const themeState = atom({
    key: 'themeState',
    default: '',
});

export default themeState;