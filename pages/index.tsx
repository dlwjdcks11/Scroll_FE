import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Navbar from '../components/navbar';
import WebtoonLink from '../components/webtoonLink';

type movie = {
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
    results: movie[];
}

const MainContainer = styled.main`
    width: 80%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 19%);
    grid-auto-rows: 23rem;
    gap: 1.5rem 1.25%;
`;

const Home:NextPage<ParamMovie> = ({ results }) => {
    return (
        <>
            <Head>
                <title>Scroll | Home</title>
            </Head>
            <Navbar>
                Scroll
            </Navbar>
            <MainContainer>
                {results.map((value, index) => { return <WebtoonLink key={index} path={value.poster_path} title={value.original_title}/> })}
            </MainContainer>
        </>
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