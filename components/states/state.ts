import { atom, selector } from 'recoil';

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

export const loginState = atom({
    key: 'loginState',
    default: false,
})

export const filterDataState = atom({
    key: 'filterDataState',
    default: {
        platform: [],
        genre: [],
        weekday: [],
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
            const platform = filterData.platform;
            let newPlatform = []

            if (platform.includes(newState)) {
                newPlatform = platform.filter(v => v !== newState);
            }
            else {
                newPlatform = [...platform, newState];
            }

            newData = {
                ...filterData,
                platform: newPlatform,
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
            const weekday = filterData.weekday;
            let newWeekday = []

            if (weekday.includes(newState)) {
                newWeekday = weekday.filter(v => v !== newState);
            }
            else {
                newWeekday = [...weekday, newState];
            }

            newData = {
                ...filterData,
                day: newWeekday,
            }
        }

        set(filterDataState, newData);
    }
})