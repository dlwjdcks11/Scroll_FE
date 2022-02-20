import { FunctionComponent, ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import themeState from "./states/state";

type ParamProps = {
    children: ReactNode;
    value: number;
}

const StyledButton = styled.button`
    background-color: red;
    height: 1rem;
    width: 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
`;

const ThemeButton: FunctionComponent<ParamProps> = ({ children, value }) => {
    const setTheme = useSetRecoilState(themeState);
    const onclick = (e) => {
        const target = e.target as HTMLButtonElement;
        setTheme(Number(target.value));
    }

    return (
        <StyledButton onClick={onclick} value={value}>{children}</StyledButton>
    );
}

export default ThemeButton;