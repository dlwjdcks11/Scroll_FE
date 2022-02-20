import type { FunctionComponent } from "react";
import styled, { ThemeProvider } from "styled-components";
import ThemeButton from "./themeButton";
import { theme } from "../styles/theme/theme"
import { useRecoilValue } from "recoil";
import themeState from "./states/state";

const StyledNav = styled.nav`
    width: 100%;
    height: 4rem;
    background-color: ${({ theme }) => theme.bg};
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`; // 추후 background-color 재설정 필요

const Navbar: FunctionComponent = ({ children }) => {
    const themeIdx = useRecoilValue(themeState);

    return (
        <ThemeProvider theme={theme[themeIdx]}>
            <StyledNav>
                {children}
                {theme.map((value, index) => {
                    return (
                        <ThemeButton value={index} key={value.name}>
                            {value.bg}
                        </ThemeButton>
                    );
                })}
            </StyledNav>
        </ThemeProvider>
    );
}

export default Navbar;