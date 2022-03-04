import { darken } from "polished";
import type React from "react"
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
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
    width: 17rem;
    height: 6rem;
    border-radius: 0.4rem;
    color: #212529;

    > p {
        display: flex;
        align-items: center;
        margin: 0 0 0 1.5rem;
        height: 2rem;
    }
    
    &.center > p {
        border-right: 0.1rem solid var(--border_grey);
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
    const resetFilterIndex = useResetRecoilState(filterIndexState);
    const resetPrevFilterIndex = useResetRecoilState(prevFilterIndexState);

    const showCheckboxes = () => { 
        if (filterIndex === index) {
            resetFilterIndex();
            resetPrevFilterIndex();
        }
        else {
            if (filterIndex === -1) {
                setFilterIndex(index);
            }
            else {
                setPrevFilterIndex(filterIndex);
                setFilterIndex(index);
            }
        }
    }
    
    return (
        <ClickSection onClick={showCheckboxes} className={index !== 2 ? 'center' : ''}>
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