import type React from "react";
import Image from "next/image";
import styled, { ThemeProvider } from "styled-components";
import { useRecoilValue } from "recoil";
import { themeIdxState } from "./states/state";
import { theme } from "../styles/theme/theme";

const SearchContainer = styled.form`
    display: flex;
    width: 25rem;
    height: 2rem;
    border: 0.1rem solid ${({ theme }) => theme.first};
    border-radius: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    align-items: center;
`

const SearchImage = styled.label`
    margin: 0 0.5rem;
    align-items: center;
    justify-content: center;
`

const SearchSection = styled.input`
    width: 100%;
    border: none;

    :focus {
        outline: none;
    }

    ::placeholder {
        color: ${({ theme }) => theme.first};
    }
`

const SubmitButton = styled.button`
    display: none;
`

const SearchBar:React.FC = () => {
    const themeIdx = useRecoilValue(themeIdxState);
    
    return (
        <ThemeProvider theme={theme[themeIdx]}>
            <SearchContainer>
                <SearchImage htmlFor="search">
                    <Image
                        src="/search.png"
                        width={20}
                        height={20}
                        layout="fixed"
                    />
                </SearchImage>
                <SearchSection type="text" placeholder="Search"/>
                <SubmitButton type="submit" id="search" name="search"/>
            </SearchContainer>
        </ThemeProvider>
    )
}

export default SearchBar;