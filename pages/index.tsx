import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
import Header from '../components/Header';
import FilterLayout from '../components/FilterLayout';
import { currentThemeState } from '../components/states/state';
import { useRecoilValue } from 'recoil';
import { darkTheme, lightTheme } from '../styles/theme/theme';

type Movie = {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}

type ParamMovie = {
    results: Movie[];
}

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
    height: 50rem;
    transition: all 0.5s ease;
`

const Images = styled.div`
    margin-top: -1rem;
    width: 100%;
    height: 20rem;
    background-color: grey;
`

const Home:NextPage<ParamMovie> = ({ results }) => {
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Scroll | Home</title>
            </Head>
            <Header>
                Scroll
            </Header>
            <Main>
                <Center>
                    <FilterLayout/>
                    <Images>

                    </Images>
                </Center>
            </Main>
        </ThemeProvider>
    );
}

export const getStaticProps = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`);
    const { results } = await res.json(); 

    return {
        props: {
            results, 
        },
    }
}

export default Home;