import type React from "react"
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { filterIndexState } from "./states/state";
import Checkbox from "./Checkbox";

type checkProps = {
    index: number,
}

const moving = keyframes`
    
`

const Picker = styled.div`
    display: none;
    position: absolute;
    width: 0; 
    height: 0; 
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 1rem solid #F8F9FA;
    top: 16.1rem;
    z-index: 1000;

    &.Focus {
        display: block;
    }
    &.flatform {
        margin-left: -30rem;
    }
    &.genre {
        margin-left: 0rem;
    }
    &.day {
        margin-left: 30rem;
    }
`

const Container = styled.div`
    display: grid;
    position: absolute; 
    visibility: hidden;
    background-color: #F8F9FA;
    width: 40rem;
    height: 7rem;
    top: 17rem;
    box-shadow: 0rem 0rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
    border: 0.1rem solid var(--border_grey);
    border-radius: 0.4rem;
    grid-template-columns: repeat(auto-fill, 20%);
    grid-auto-rows: 0.5rem;
    gap: 1.5rem 1.25%;

    &.Focus {
        visibility: visible;
    }
`

const CheckboxContainer:React.FC<checkProps> = ({ index }) => {
    const filterIndex = useRecoilValue(filterIndexState);
    const titles = ['flatform', 'genre', 'day'];
    const filterContents = [
        ['네이버', '레진', '탑툰', '카카오페이지', '왈랄랄루', '왈랄랄루', '왈랄랄루'],
        ['스릴러', '일상', '로맨스', '드라마', '개그', '공포', '왈랄랄루', '왈랄랄루', '왈랄랄루', '왈랄랄루', '왈랄랄루'],
        ['월', '화', '수', '목', '금', '토', '일']
    ] 

    return (
        <>
            <Picker className={filterIndex === index ? `Focus ${titles[index]}` : ''}/>
            <Container className={filterIndex === index ? 'Focus' : ''}>
                {filterContents[index].map((element, index) => {
                    return <Checkbox key={index}>{element}</Checkbox>
                })}
            </Container>    
        </>
    )
}

export default CheckboxContainer;