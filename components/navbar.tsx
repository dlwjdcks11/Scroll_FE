import type React from "react";
import styled, { ThemeProvider } from "styled-components";
import ThemeButton from "./themeButton";
import { theme } from "../styles/theme/theme"
import { useRecoilValue } from "recoil";
import { themeIdxState } from "./states/state";

const StyledNav = styled.nav`
    width: 100%;
    height: 4rem;
    background-color: ${({ theme }) => theme.bg};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: black;
`;

const Title = styled.div`
    display: inline;
    margin-right: auto;
    margin-left: 2rem;
`;

const Navbar: React.FC = ({ children }) => {
    const themeIdx = useRecoilValue(themeIdxState);

    return (
        <ThemeProvider theme={theme[themeIdx]}>
            <StyledNav>
                <Title>
                    {children}
                </Title>
                {theme.map((value, index) => { return <ThemeButton value={index} key={value.name}/>; })}
            </StyledNav>
        </ThemeProvider>
    );
}

export default Navbar;