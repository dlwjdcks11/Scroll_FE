import type React from "react";
import Image from "next/image";
import styled from "styled-components";

const SearchContainer = styled.form`
    display: flex;
    width: 2.2rem;
    height: 2rem;
    border: 0.1rem solid var(--border_grey);
    border-radius: 0.4rem;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    align-items: center;
    transition: all 0.5s ease;

    :hover {
        width: 15rem;
    }
`

const SearchImage = styled.label`
    margin: 0 0.5rem;
    align-items: center;
    justify-content: center;
`

const SearchSection = styled.input`
    visibility: hidden;
    width: 100%;
    border: none;

    :focus {
        outline: none;
    }
`

const SubmitButton = styled.button`
    display: none;
`

const SearchBar:React.FC = () => {
    const onmouseenter = () => {
        document.getElementById('searchSection').style.visibility = 'visible';
        document.getElementById('searchSection').focus();
    }

    const onmouseleave = () => {
        document.getElementById('searchSection').style.visibility = 'hidden';
    }
    
    return (
        <SearchContainer onMouseEnter={onmouseenter} onMouseLeave={onmouseleave}>
            <SearchImage htmlFor="search">
                <Image
                    src="/search.png"
                    width={20}
                    height={20}
                    layout="fixed"
                />
            </SearchImage>
            <SearchSection id="searchSection" type="text" placeholder="Search"/>
            <SubmitButton type="submit" id="search" name="search"/>
        </SearchContainer>
    )
}

export default SearchBar;