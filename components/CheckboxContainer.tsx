import type React from "react"
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { filterIndexState } from "./states/state";

type checkProps = {
    index: number,
}

const Container = styled.div`
    position: absolute;
    display: flex;
    width: 30rem;
    height: 7rem;
    box-shadow: 0rem 0rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);
    border: 0.1rem solid var(--border_grey);
    border-radius: 0.4rem;

    &.Focus {
        top: 16rem;
        visibility: visible;
        background-color: white;
    }
    &.Unfocus {
        visibility: hidden;
    }
`

const CheckboxContainer:React.FC<checkProps> = ({ index }) => {
    const filterIndex = useRecoilValue(filterIndexState);
    const filterContents = [
        ['네이버', '레진', '탑툰', '카카오페이지'],
        ['스릴러', '일상', '로맨스', '드라마', '개그', '공포'],
        ['월', '화', '수', '목', '금', '토', '일']
    ] // 나중에 getStaticProps

    return (
        filterIndex === index ? 
            <Container className={'Focus'}>
                {filterContents[filterIndex].map((element, index) => {
                    return (
                        <>
                            <input key={index} type="checkbox"/><span>{element}</span>
                        </>
                    )
                })}
            </Container> 
            : <Container className={'Unfocus'}/>
    )
}

export default CheckboxContainer;