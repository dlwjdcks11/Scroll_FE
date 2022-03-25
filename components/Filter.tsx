import { darken } from "polished";
import React from "react"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filterDataState, filterIndexState, prevFilterIndexState } from "./states/state";

type filterProps = {
    children: React.ReactNode,
    index: number,
};

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
        height: 3rem;
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
    block-size: fit-content;

    &.overflow {
        font-size: 12px;
    }
`

const Filter:React.FC<filterProps> = ({ children, index }) => {
    const titleArray = ['platform', 'genre', 'weekday'];
    const filterData = useRecoilValue(filterDataState);
    const [filterIndex, setFilterIndex] = useRecoilState(filterIndexState);
    const setPrevFilterIndex = useSetRecoilState(prevFilterIndexState)
    const resetFilterIndex = useResetRecoilState(filterIndexState);
    const resetPrevFilterIndex = useResetRecoilState(prevFilterIndexState);
    const sortedData = filterData[titleArray[index]]; // 요일 정리 필요

    const showCheckboxes = () => { 
        if (filterIndex === index) {
            resetFilterIndex();
            resetPrevFilterIndex();
        }
        else {
            if (filterIndex !== -1) {
                setPrevFilterIndex(filterIndex);
            }
            setFilterIndex(index);
        }
    }
    
    return (
        <ClickSection onClick={showCheckboxes} className={index !== 2 ? 'center' : ''}>
            <FilterTitle>
                {children}
            </FilterTitle>
            <FilterExplanation>
                {sortedData && sortedData.length === 0 ? '선택 사항 없음' : 
                    sortedData.map(element => {
                        return element + ' ';
                    })
                }
            </FilterExplanation>
        </ClickSection>
    )
}

export default Filter;