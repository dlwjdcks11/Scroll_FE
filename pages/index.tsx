import type { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Buttonbar from '../components/buttonbar';

const Home:NextPage = () => {
    return (
        <>
            <Head>
                <title>Scroll | Home</title>
            </Head>
            <Navbar>
                hello, world!
            </Navbar>
            <Buttonbar>
                buttons
            </Buttonbar>
        </>
    );
}

export default Home;