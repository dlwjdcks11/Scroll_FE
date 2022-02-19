import type { FunctionComponent } from "react";
import styled, { ThemeProvider } from "styled-components";
import ThemeButton from "./themeButton";
import { theme } from "../styles/theme/theme"

const StyledNav = styled.nav`
    width: 100%;
    height: 4rem;
    background-color: #00D564;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`; // 추후 background-color 재설정 필요

const Navbar: FunctionComponent = ({ children }) => {
    return (
        <StyledNav>
            {children}
            <ThemeButton value="134">
                으악
            </ThemeButton>
        </StyledNav>
    );
}

export default Navbar;