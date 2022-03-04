import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import FilterLayout from '../components/FilterLayout';
import { currentThemeState, filterIndexState } from '../components/states/state';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { darkTheme, lightTheme } from '../styles/theme/theme';
import WebtoonLink from '../components/WebtoonLink';

const DimmedPage = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
`

const Main = styled.main`
    background-color: ${({ theme }) => theme.bgColor};
    transition: all 0.5s ease;
`

const Center = styled.div`
    display: flex;
    width: 62.5rem;
    flex-direction: column;
    align-items: center;
    margin: auto;
    background-color: ${({ theme }) => theme.bgColor};
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
    const resetFilterIndex = useResetRecoilState(filterIndexState);
    
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    const offDimmed = () => {
        resetFilterIndex();
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Scroll | Home</title>
            </Head>
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
        </ThemeProvider>
    );
}

export default Home;