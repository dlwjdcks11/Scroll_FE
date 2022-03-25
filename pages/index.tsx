import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import FilterLayout from '../components/FilterLayout';
import { currentThemeState, filterDataState, filterIndexState, prevFilterIndexState, showLoginState, showRegisterState } from '../components/states/state';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { darkTheme, lightTheme } from '../styles/theme/theme';
import WebtoonLink from '../components/WebtoonLink';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Suspense, useEffect, useState } from 'react';
import { checkCookies, getCookie } from 'cookies-next';

const loading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const DimmedPage = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 999;
`

const Main = styled.main`
    background-color: transparent;
    transition: all 0.5s ease;
`

const Center = styled.div`
    display: flex;
    width: 62.5rem;
    flex-direction: column;
    align-items: center;
    margin: auto;
    background-color: transparent;
    transition: all 0.5s ease;
`

const Images = styled.div`
    display: grid;
    width: 100%;
    margin-top: 2rem;
    grid-template-columns: repeat(auto-fill, 15%);
    grid-auto-rows: 15rem;
    gap: 0.5rem 2%;
`

const Spinner = styled.div`
    color: var(--primary);
    font-size: 12px;
    text-indent: -99999rem;
    margin: 55px auto;
    position: relative;
    width: 10rem;
    height: 10rem;
    box-shadow: inset 0 0 0 1rem;
    transform: translateZ(0);

    &, :before, :after {
        border-radius: 50%;
    }
    :before, :after {
        content: '';
        position: absolute;
        background-color: ${({ theme }) => theme.bgColor};
        animation-name: ${loading};
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease;
        animation-fill-mode: backwards;
    }
    :before {
        width: 5.2rem;
        height: 10.2rem;
        border-radius: 10.2rem 0 0 10.2rem;
        top: -0.1rem;
        left: -0.1rem;
        transform-origin: 5.1rem 5.1rem;
        animation-delay: 1.5s;
    }
    :after {
        width: 5.2rem;
        height: 10.2rem;
        border-radius: 0 10.2rem 10.2rem 0;
        top: -0.1rem;
        left: 4.9rem;
        transform-origin: 0.1rem 5.1rem;
    }
`

const Home:NextPage = () => {
    const [webtoons, setWebtoons] = useState([]);
    const filterData = useRecoilValue(filterDataState);
    const filterIndex = useRecoilValue(filterIndexState);
    const showLogin = useRecoilValue(showLoginState);
    const showRegister = useRecoilValue(showRegisterState);
    const resetFilterIndex = useResetRecoilState(filterIndexState);
    const resetPrevFilterIndex = useResetRecoilState(prevFilterIndexState);
    const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    if (typeof window === 'object')
        document.querySelector('body').style.backgroundColor = theme.bgColor;

    const offDimmed = () => {
        resetFilterIndex();
        resetPrevFilterIndex();
    }

    useEffect(() => {
        const theme = localStorage.getItem('isDark') === 'DARK' ? true : false;
        setCurrentTheme(theme);
    }, [])

    useEffect(() => {
        const token = checkCookies('token') ? getCookie('token') : '';
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.URL + '/webtoon', {
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                    },    
                    body: JSON.stringify({
                        token: token,
                        ...filterData
                    }),
                })
                const result = await response.json();
                const { webtoon } = result;
                setWebtoons(webtoon);
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [filterData])

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Scroll | Home</title>
            </Head>
            {showLogin ? <LoginForm/> : null}
            {showRegister ? <RegisterForm/> : null}
            {filterIndex !== -1 ? <DimmedPage onClick={offDimmed}/> : null}
            <Header>
                Scroll
            </Header>
            <Main>
                <Center>
                    <FilterLayout/>
                    <Images>
                        {webtoons && webtoons.map((value, index) => { 
                            return <WebtoonLink 
                                key={index}
                                id={value.webtoonid} 
                                title={value.title} 
                                thumbnail={value.thumbnail} 
                                link={value.link}
                                author={value.author}
                                bookmark={value.bookmark}
                            /> 
                        })}
                    </Images>
                </Center>
            </Main>
        </ThemeProvider>
    );
}

export default Home;