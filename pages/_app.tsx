import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <RecoilRoot>
            <Component {...pageProps}/>
        </RecoilRoot>
    ) // 전역으로 보여야 할 요소가 있다면 여기다가 써줘도 된다.
}

export default App;