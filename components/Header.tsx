import { darken, lighten } from "polished";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import DropdownContents from "./DropdownContents";
import SearchBar from "./SearchBar";
import { currentThemeState } from "./states/state";
import ThemeToggleButton from "./ThemeToggleButton";

const StyledHeader = styled.header`
    width: 100%;
    height: 4rem;
    background-color: transparent;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    color: black;
    transition: all 0.5s ease;
    border-bottom: 0.1rem solid var(--border_grey);
`;

const Title = styled.div`
    display: inline;
    margin-right: auto;
    margin-left: 2rem;
    color: var(--primary);
    font-family: 'NanumSquareRoundExtraBold';
    font-size: 24px;
`;

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const DropdownButton = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;

    :before {
        content: '\\2807';   
        font-size: 30px;
        margin: 0 0 0 0.8rem;
        color: ${({ theme }) => theme.textColor}
    }

    :hover {
        background-color: ${({ theme }) => theme.isDark ? lighten(0.2, theme.bgColor) : darken(0.04, theme.bgColor)};
        cursor: pointer;
    }
`;

const Header: React.FC = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    const showContents = () => {
        setIsVisible(!isVisible);
    }

    return (
        <ThemeProvider theme={theme}>
            <StyledHeader>
                <Title>
                    {children}
                </Title>
                <MenuContainer>
                    <SearchBar/>
                    <ThemeToggleButton/>
                    <DropdownButton onClick={showContents}>
                        {isVisible ? <DropdownContents/> : null}
                    </DropdownButton>
                </MenuContainer>
            </StyledHeader>
        </ThemeProvider>
    );
}

export default Header;