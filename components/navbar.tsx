import type { FunctionComponent } from "react";
import css from 'styled-jsx/css';

export const style = css`
    nav {
        width: 100%;
        height: 4rem;
        background-color: #00D564;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
`; // 추후 background-color 재설정 필요

const Navbar: FunctionComponent = ({ children }) => {
    return (
        <nav>
            {children}
            <style jsx>{style}</style>
        </nav>
    );
}

export default Navbar;