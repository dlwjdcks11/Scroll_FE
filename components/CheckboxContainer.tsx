import type React from "react"
import styled, { css, keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { filterIndexState, prevFilterIndexState } from "./states/state";
import Checkbox from "./Checkbox";

type checkProps = {
    index: number,
}

type pickerProps = {
    prev: number,
    current: number,
}

const moving = (prev, current) => keyframes`
    0% {
        margin-left: ${(prev - 1) * 30}rem;
    }
    100% {
        margin-left: ${(current - 1) * 30}rem;
    }
`

const Picker = styled.div<pickerProps>`
    display: none;
    position: absolute;
    width: 0; 
    height: 0; 
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 1rem solid #F8F9FA;
    margin-left: ${props => (props.current - 1) * 30}rem;
    top: 13.1rem;
    z-index: 1000;

    ${props => props.prev !== -1 && css<pickerProps>`
        animation-name: ${props => moving(props.prev, props.current)};
        animation-duration: 0.3s;
        animation-iteration-count: 1;
        animation-direction: alternate;
        animation-timing-function: ease;
        animation-fill-mode: backwards;
    `}
    
    &.Focus {
        display: block;
    }
`

const Container = styled.div`
    display: grid;
    position: absolute; 
    visibility: hidden;
    background-color: #F8F9FA;
    width: 40rem;
    height: 7rem;
    top: 14rem;
    box-shadow: 0rem 0rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
    border: 0.1rem solid var(--border_grey);
    border-radius: 0.4rem;
    grid-template-columns: repeat(auto-fill, 19%);
    grid-auto-rows: 0.5rem;
    gap: 1.5rem 1.25%;

    &.Focus {
        visibility: visible;
    }
`

const CheckboxContainer:React.FC<checkProps> = ({ index }) => {
    const filterIndex = useRecoilValue(filterIndexState);
    const prevFilterIndex = useRecoilValue(prevFilterIndexState);
    const filterContents = [
        ['네이버', '레진', '탑툰', '카카오페이지', '왈랄랄루', '왈랄랄루', '왈랄랄루'],
        ['스릴러', '일상', '로맨스', '드라마', '개그', '공포', '왈랄랄루', '왈랄랄루', '왈랄랄루', '왈랄랄루', '왈랄랄루'],
        ['월', '화', '수', '목', '금', '토', '일']
    ];

    return (
        <>
            <Picker className={(filterIndex === index && filterIndex !== -1) ? 'Focus' : ''} prev={prevFilterIndex} current={filterIndex}/>
            <Container className={filterIndex === index ? 'Focus' : ''}>
                {filterContents[index].map((element, index) => {
                    return <Checkbox key={index} id={String(index)}>{element}</Checkbox>
                })}
            </Container>    
        </>
    )
}

export default CheckboxContainer;