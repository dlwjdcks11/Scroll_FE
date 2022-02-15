import type { FunctionComponent } from "react";
import css from 'styled-jsx/css';
import { lighten } from "polished";

export const style = css`
    nav {
        width: 100%;
        height: 3rem;
        background-color: ${lighten(0.2, '#00D564')};
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
`; // 추후 background-color 재설정 필요

const Buttonbar: FunctionComponent = ({ children }) => {
    return (
        <nav>
            {children}
            <style jsx>{style}</style>
        </nav>
    );
}

export default Buttonbar;