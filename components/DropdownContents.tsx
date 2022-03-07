import type React from "react"
import styled from "styled-components";

const DropdownContainer = styled.div`
    position: absolute;
    display: flex;
    background-color: white;
    width: 13rem;
    right: 0.7rem;
    top: 4.5rem;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.4rem;
    flex-direction: column;
`

const MenuTitle = styled.h2`
    margin: 1rem 1rem 0.1rem 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.1rem solid var(--grey);
`

const Menu = styled.div`
    
`

const RecentlyWatched = styled.div`
    > p {
        margin: 1rem 0 1rem 1rem;
    }
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`

const Button = styled.div`
    display: flex;
    border-radius: 0.4rem;
    width: 5rem;
    height: 1.5rem;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
`

const LoginButton = styled(Button)`
    margin-right: 0.5rem;
    background-color: var(--yellow);
    border: 0.1rem solid var(--yellow);
    color: #F1F3F6;
`

const RegisterButton = styled(Button)`
    background-color: #F1F3F5;
    border: 0.1rem solid var(--yellow);
    color: var(--yellow);
`

const DropdownContents:React.FC = () => {
    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    const checkFavorite = () => {
        
    }

    return (
        <DropdownContainer onClick={stopPropagation}>
            <Menu>
                <MenuTitle>메뉴</MenuTitle>
                <input type="checkbox" style={{ margin: '1rem 0.5rem 0 1rem' }} onChange={checkFavorite}/><span>즐겨찾기만 보기</span>
            </Menu>
            <RecentlyWatched>
                <MenuTitle>최근 본 만화</MenuTitle>
                <p>왈랄랄루</p>
                <p>왈랄랄루</p>
                <p>왈랄랄루</p>
                <p>왈랄랄루</p>
                <p>왈랄랄루</p>
            </RecentlyWatched>
            <ButtonContainer>
                <LoginButton>로그인</LoginButton>
                <RegisterButton>회원가입</RegisterButton>
            </ButtonContainer>
        </DropdownContainer>
    )
}

export default DropdownContents;