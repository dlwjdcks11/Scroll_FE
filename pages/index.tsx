import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';

const Home:NextPage = () => {
    return (
        <>
            <Head>
                <title>Scroll | Home</title>
            </Head>
            <Navbar>
                hello, world!
            </Navbar>
        </>
    );
}

export default Home;