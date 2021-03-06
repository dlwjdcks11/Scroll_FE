import React, { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { currentThemeState, recentlyWatchedState, showFavoriteState, showLoginState, showRegisterState } from "./states/state";
import { lighten } from "polished"
import { checkCookies, getCookie, removeCookies } from "cookies-next";

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

const LogoutButton = styled(Button)`
    margin-right: 0.5rem;
    background-color: var(--primary);
    border: 0.1rem solid var(--primary);
    color: #F1F3F6;
`

const RecentlyWatchedContent = styled.p`
    :hover {
        cursor: pointer;
    }
`

const DropdownContents:React.FC = () => {
    const [recent, setRecent] = useState([]);
    const recentlyWatched = useRecoilValue(recentlyWatchedState);
    const isLogin = checkCookies('token');
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

    const logout = async () => {
        const token = getCookie('token');

        try {
            const response = await fetch(process.env.URL + '/account/logout', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application-json',
                },
                body: JSON.stringify({
                    token: token,
                })
            });
            const result = await response.json();
    
            if (result.success) {
                removeCookies('token');
            }
            else {
                alert(result.message);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const moveToWebtoon = async (webtoonid, link, e) => {
        e.stopPropagation();
        
        if (typeof window !== 'undefined') {
            try {
                const response = await fetch(process.env.URL + '/webtoon/click', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        webtoonID: webtoonid,
                    })
                })
                const result = await response.json();
    
                if (result.success) {
                    window.open(link);
                }
                else {
                    alert(result.message);
                }
            }
            catch(e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        const getTitles = async () => {
            try {
                const response = await fetch(process.env.URL + '/webtoon/history');
                const result = await response.json();

                if (result.success) {
                    const { webtoon } = result;
                    setRecent(webtoon);
                }
                else {
                    console.log(result);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        getTitles();
    }, [recentlyWatched])

    console.log('recent: ', recent);

    return (
        <ThemeProvider theme={theme}>
            <DropdownContainer onClick={stopPropagation}>
                <Menu>
                    {isLogin ? 
                        <>
                            <MenuTitle>????????????</MenuTitle>
                            <input type="checkbox" style={{ margin: '0.8rem 0.5rem 0 1rem' }} onChange={checkFavorite} checked={showFavorite}/>
                            <span>??????????????? ??????</span>
                        </> 
                        : null}
                </Menu>
                <RecentlyWatched>
                    <MenuTitle>?????? ??? ??????</MenuTitle>
                    {recent && recent.map((element, index) => {
                        return <RecentlyWatchedContent key={index} onClick={e => moveToWebtoon(element.webtoonid, element.link, e)}>
                                    {element.title}
                                </RecentlyWatchedContent>
                    })}
                </RecentlyWatched>
                <ButtonContainer>
                    {isLogin ? 
                        <LogoutButton onClick={logout}>????????????</LogoutButton> :
                        <>
                            <LoginButton onClick={showLogin}>?????????</LoginButton>
                            <RegisterButton onClick={showRegister}>????????????</RegisterButton>
                        </>
                    }
                </ButtonContainer>
            </DropdownContainer>
        </ThemeProvider>
    )
}

export default DropdownContents;