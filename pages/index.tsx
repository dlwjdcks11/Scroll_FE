import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Header from '../components/Header';
import FilterLayout from '../components/FilterLayout';
import { currentThemeState, filterIndexState, prevFilterIndexState, showLoginState, showRegisterState } from '../components/states/state';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { darkTheme, lightTheme } from '../styles/theme/theme';
import WebtoonLink from '../components/WebtoonLink';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

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
    gap: 1.5rem 2%;
`

const Home:NextPage = () => {
    const filterIndex = useRecoilValue(filterIndexState);
    const showLogin = useRecoilValue(showLoginState);
    const showRegister = useRecoilValue(showRegisterState);
    const resetFilterIndex = useResetRecoilState(filterIndexState);
    const resetPrevFilterIndex = useResetRecoilState(prevFilterIndexState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    if (typeof window === 'object')
        document.querySelector('body').style.backgroundColor = theme.bgColor;

    const offDimmed = () => {
        resetFilterIndex();
        resetPrevFilterIndex();
    }

    return (
        <>
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
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                        <WebtoonLink/>
                    </Images>
                </Center>
            </Main>
        </>
    );
}

export default Home;