import { darken } from "polished";
import type React from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filterIndexState, prevFilterIndexState } from "./states/state";

type filterProps = {
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

const Filter:React.FC<filterProps> = ({ children, index }) => {
    const [filterIndex, setFilterIndex] = useRecoilState(filterIndexState);
    const setPrevFilterIndex = useSetRecoilState(prevFilterIndexState)

    const onclick = () => { 
        if (filterIndex === -1) {
            setFilterIndex(index);
        }
        else {
            setPrevFilterIndex(filterIndex);
            setFilterIndex(index);
        }
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