import React, { useState } from "react";
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
    border-bottom: 0.1rem solid var(--border_grey);
`;

const Title = styled.div`
    display: inline;
    margin-right: auto;
    margin-left: 2rem;
    color: var(--yellow);
    font-family: 'NanumSquareRoundExtraBold';
    font-size: 24px;
`;

const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 2rem;

    > div {
        margin: 0 0 0 0.6rem;
    }
`

const DropdownButton = styled.div`
    width: 1.5rem;

    :before {
        content: '\\2807';   
        font-size: 24px;
        margin-left: 0.1rem;
    }

    :hover {
        cursor: pointer;
    }
`;

const DropdownContents = styled.div`
    position: absolute;
    background-color: white;
    width: 13rem;
    height: 30rem;
    right: 0.7rem;
    top: 4.5rem;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.4rem;
`

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