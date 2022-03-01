import React from "react"
import styled from "styled-components";
import CheckboxContainer from "./CheckboxContainer";
import Filter from "./Filter";

const FilterContainer = styled.div`
    width: 45rem;
    height: 8rem;
    margin-top: 3rem;
    border: 0.1rem solid var(--border_grey);
    border-radius: 0.4rem;
    background-color: #F8F9FA;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0rem 0rem 0.5rem 0.1rem rgba(0, 0, 0, 0.2);

    > div:not(:last-child) > p {
        border-right: 0.1rem solid var(--border_grey);
    }
`

const FilterLayout:React.FC = () => {
    const contents = ['플랫폼', '장르', '요일'];

    return (
        <>
            <FilterContainer>
                {contents.map((content, index) => { 
                    return (
                        <React.Fragment key={index}>
                            <Filter index={index}>{content}</Filter> 
                            <CheckboxContainer index={index}></CheckboxContainer>  
                        </React.Fragment>
                    )
                })}
            </FilterContainer>  
        </>
    )
}

export default FilterLayout;