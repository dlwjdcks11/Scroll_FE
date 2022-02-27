import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import FilterBox from '../components/FilterBox';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WebtoonLink from '../components/WebtoonLink';

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

const Navbar = styled.nav`
    display: flex;
    flex-direction: column;
    box-shadow: rgba(50, 50, 93, 0.25) 0em 0.5em 10em -0.5em;
    justify-content: center;
    align-items: center;
`;

const ImageContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 19%);
    grid-auto-rows: 10rem;
    gap: 2.5rem 1.25%;
`;

const Home:NextPage<ParamMovie> = ({ results }) => {
    return (
        <>
            <Head>
                <title>Scroll | Home</title>
            </Head>
            <Header>
                Scroll
            </Header>
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