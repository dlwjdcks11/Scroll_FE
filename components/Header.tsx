import type React from "react";
import { useRecoilValue } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import SearchBar from "./SearchBar";
import { currentThemeState } from "./states/state";
import ThemeToggleButton from "./ThemeToggleButton";

const StyledHeader = styled.header`
    width: 100%;
    height: 4rem;
    background-color: ${({ theme }) => theme.bgColor};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: black;
    transition: all 0.5s ease;
`;

const Title = styled.div`
    display: inline;
    margin-right: auto;
    margin-left: 2rem;
    color: var(--yellow);
    font-family: 'NanumSquareRoundExtraBold';
    font-size: 24px;
`;

const Header: React.FC = ({ children }) => {
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={theme}>
            <StyledHeader>
                <Title>
                    {children}
                </Title>
                <SearchBar/>
                <ThemeToggleButton/>
            </StyledHeader>
        </ThemeProvider>
    );
}

export default Header;