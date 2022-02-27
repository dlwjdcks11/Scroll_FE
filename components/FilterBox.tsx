import type React from "react"
import { useState } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { filterDisplay } from "../styles/theme/theme";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translate(0, -20%);
    }
    to {
        opacity: 1;
        transform: translate(0, 0);
    }
`

const Dropdown = styled.div`
    display: flex;
    width: 50rem;
    height: 1.3rem;
    background-color: lightgrey;
    box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.2);
    justify-content: center;
    align-items: center;

    :hover {
        cursor: pointer;
    }
`

const Arrow = styled.i`
    border: solid black;
    border-width: 0 0.15rem 0.15rem 0;
    display: inline-block;
    padding: 0.2rem;
    transform: ${({ theme }) => theme.state ? `rotate(-135deg)` : `rotate(45deg)`};
`

const DropdownContents = styled.div`
    display: ${({ theme }) => theme.state ? 'block' : 'none' };
    position: relative;
    width: 50rem;
    background-color: #DDDDDD;
    box-shadow: 0 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.2);
    margin-top: 0.5rem;
    animation: ${fadeIn} 0.5s linear;
`;

const FilterContainer = styled.p`
    display: flex;
    flex-direction: column;
    margin: 0 0 0.5rem 0.5rem;
`

const FilterTitle = styled.p`
    font-size: 16px;
    font-weight: 1000;
`

const FilterBox:React.FC = () => {
    const [display, setDisplay] = useState(false);

    const showDropdown = () => {
        setDisplay(!display);
        filterDisplay.state = display;
    }

    return ( // filter components화, div gridbox화
        <ThemeProvider theme={filterDisplay}>            
            <Dropdown onClick={showDropdown}>
                <Arrow/>
            </Dropdown>
            <DropdownContents>
                <FilterContainer>
                    <FilterTitle>
                        연재 날짜
                    </FilterTitle>
                </FilterContainer>
                <FilterContainer>
                    <FilterTitle>
                        장르
                    </FilterTitle>
                </FilterContainer>
            </DropdownContents>
        </ThemeProvider>
    )
}

export default FilterBox;