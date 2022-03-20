import React, { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { currentThemeState, showFavoriteState, showLoginState, showRegisterState } from "./states/state";
import { lighten } from "polished"

const DropdownContainer = styled.div`
    position: absolute;
    display: flex;
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    color: ${({ theme }) => theme.textColor};
    width: 13rem;
    right: 0.5rem;
    top: 4.5rem;
    box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 0.4rem;
    flex-direction: column;

    :hover {
        cursor: default;
    }
`

const MenuTitle = styled.h2`
    font-size: 20px;
    margin: 1rem 1rem 0.1rem 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.1rem solid var(--grey);
`

const Menu = styled.div`
    > input:hover {
        cursor: pointer;
    }
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

    :hover {
        cursor: pointer;
    }
`

const LoginButton = styled(Button)`
    margin-right: 0.5rem;
    background-color: var(--primary);
    border: 0.1rem solid var(--primary);
    color: #F1F3F6;
`

const RegisterButton = styled(Button)`
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    border: 0.1rem solid var(--primary);
    color: var(--primary);
`

const DropdownContents:React.FC = () => {
    const [titles, setTitles] = useState([]);
    const setShowLogin = useSetRecoilState(showLoginState);
    const setShowRegister = useSetRecoilState(showRegisterState);
    const [showFavorite, setShowFavorite] = useRecoilState(showFavoriteState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    const showLogin = () => {
        setShowLogin(true);
    }

    const showRegister = () => {
        setShowRegister(true);
    }

    const checkFavorite = () => {
        setShowFavorite(!showFavorite);
    }

    const getTitles = async () => {
        try {
            const response = await fetch(process.env.URL + '/webtoon/history', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            });
            const result = await response.json();
    
            if (result.success) {
    
            }
            else {
    
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getTitles();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <DropdownContainer onClick={stopPropagation}>
                <Menu>
                    <MenuTitle>메뉴</MenuTitle>
                    <input type="checkbox" style={{ margin: '0.8rem 0.5rem 0 1rem' }} onChange={checkFavorite} checked={showFavorite}/>
                    <span>즐겨찾기만 보기</span>
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
                    <LoginButton onClick={showLogin}>로그인</LoginButton>
                    <RegisterButton onClick={showRegister}>회원가입</RegisterButton>
                </ButtonContainer>
            </DropdownContainer>
        </ThemeProvider>
    )
}

export default DropdownContents;