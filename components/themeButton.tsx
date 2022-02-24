import React from "react";
import { useSetRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { themeIdxState } from "./states/state";
import { theme } from "../styles/theme/theme";

type ParamProps = {
    value: number;
}

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.bg};
    height: 1rem;
    width: 1rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
`;

const ThemeButton: React.FC<ParamProps> = ({ value }) => {
    const setThemeIdx = useSetRecoilState(themeIdxState);
    const onclick = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        setThemeIdx(Number(target.value));
    }

    return (
        <ThemeProvider theme={theme[value]}>
            <StyledButton onClick={onclick} value={value}/>
        </ThemeProvider>
    );
}

export default ThemeButton;