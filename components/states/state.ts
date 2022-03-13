import { atom, selector } from 'recoil';

const getTheme = async() => {
    if (typeof window !== 'undefined') {
        const theme:string = window.localStorage.getItem('isDark');
        console.log(theme);

        if (theme === 'DARK')
            return true;
        else
            return false;
    }
}

export const currentThemeState = atom({
    key: 'currentThemeState',
    default: false,
})

export const prevFilterIndexState = atom({
    key: 'prevFilterIndexState',
    default: -1,
})

export const filterIndexState = atom({
    key: 'filterIndexState',
    default: -1,
})

export const showFavoriteState = atom({
    key: 'showFavoriteState',
    default: false,
})

export const showLoginState = atom({
    key: 'showLoginState',
    default: false,
})

export const showRegisterState = atom({
    key: 'showRegisterState',
    default: false,
})

export const filterDataState = atom({
    key: 'filterDataState',
    default: {
        flatform: [],
        genre: [],
        day: [],
    }
})

export const filterDataSelector = selector({
    key: 'filterDataSelector',
    get: ({ get }) => get(filterDataState),
    set: ({ get, set }, newState) => {
        const filterData = get(filterDataState);
        const filterIndex = get(filterIndexState);
        let newData = {};

        if (filterIndex === 0) {
            const flatform = filterData.flatform;
            let newFlatform = []

            if (flatform.includes(newState)) {
                newFlatform = flatform.filter(v => v !== newState);
            }
            else {
                newFlatform = [...flatform, newState];
            }

            newData = {
                ...filterData,
                flatform: newFlatform,
            }
        }
        else if (filterIndex === 1) {
            const genre = filterData.genre;
            let newGenre = []

            if (genre.includes(newState)) {
                newGenre = genre.filter(v => v !== newState);
            }
            else {
                newGenre = [...genre, newState];
            }

            newData = {
                ...filterData,
                genre: newGenre,
            }
        }
        else if (filterIndex === 2) {
            const day = filterData.day;
            let newDay = []

            if (day.includes(newState)) {
                newDay = day.filter(v => v !== newState);
            }
            else {
                newDay = [...day, newState];
            }

            newData = {
                ...filterData,
                day: newDay,
            }
        }

        set(filterDataState, newData);
    }
})