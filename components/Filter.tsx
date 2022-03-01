import { darken } from "polished";
import type React from "react"
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filterIndexState } from "./states/state";

type FilterProps = {
    children: React.ReactNode,
    index: number,
}

const ClickSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #F8F9FA;
    width: 15rem;
    height: 8rem;
    border-radius: 0.4rem;
    color: #212529;

    > p {
        display: flex;
        align-items: center;
        margin: 0 0 0 1.5rem;
        height: 3rem;
    }

    :hover {
        cursor: pointer;
        background-color: ${darken(0.02, '#F8F9FA')};
    }
`

const FilterTitle = styled.p`
    font-size: 20px;
`

const FilterExplanation = styled.p`
    font-size: 16px;
    color: grey;
`

const Filter:React.FC<FilterProps> = ({ children, index }) => {
    const setFilterIndex = useSetRecoilState(filterIndexState);

    const onclick = () => { 
        setFilterIndex(index);
    }
    
    return (
        <ClickSection onClick={onclick}>
            <FilterTitle>
                {children}
            </FilterTitle>
            <FilterExplanation>
                Contents
            </FilterExplanation>
        </ClickSection>
    )
}

export default Filter;