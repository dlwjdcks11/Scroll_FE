import React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentThemeState, recentlyWatchedState, showFavoriteState, showLoginState } from "./states/state";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { useState } from "react";
import Star from '/public/star.svg';
import { checkCookies, getCookie } from "cookies-next";

// type info = {
//     id: number;
//     title: string;
//     thumbnail: string,
//     link: string;
//     author: string[];
//     bookmark: boolean;
// }

// type thumbnailProp = {
//     url: string;
// }

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Thumbnail = styled.div`
    background-repeat: no-repeat;
    background-size: 9rem 9rem;
    width: 9rem;
    min-height: 9rem;
    border-radius: 0.4rem;

    ${props => props.url && css`
        background-image: ${props.url !== '' ? `url(${props.url})` : `url(/noImage.jpg)`};
    `}
`

const InfoContainer = styled.div`
    display: flex;
    width: 100%;
`

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 7.5rem;
    text-decoration: none;
    margin: 0 0 1rem 0;

    :hover {
        cursor: pointer;
    }
`;

const IconContainer = styled.div`
    display: flex;
    margin: 0.3rem 0 0 0.7rem;
`;

const WebtoonTitle = styled.p`
    margin: 0.3rem 0 0.1rem 0.2rem;
    color: ${({ theme }) => theme.textColor};
`;

const AuthorInfo = styled.p`
    margin: 0.2rem 0 0 0.2rem;
    max-height: 1rem;
    color: grey;
    font-size: 12px;
`;

const WebtoonLink = (props) => {
    const webtoonID = props.id;
    const setRecentlyWatched = useSetRecoilState(recentlyWatchedState);
    const setShowLogin = useSetRecoilState(showLoginState);
    const showFavorite = useRecoilValue(showFavoriteState);
    const [star, setStar] = useState(props.bookmark);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    const starStyle = {
        width: '1rem',
        height: '1rem',
        fill: star ? `var(--primary)` : 'lightgrey',
    }

    const moveToWebtoon = async (e) => {
        e.stopPropagation();
        
        if (typeof window !== 'undefined') {
            try {
                const response = await fetch(process.env.URL + '/webtoon/click', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        webtoonID: webtoonID,
                    })
                })
                const result = await response.json();
    
                if (result.success) {
                    window.open(props.link);
                    setRecentlyWatched(props.title);
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

    const selectFavorite = async (e) => {
        e.stopPropagation();

        if (!checkCookies('token')) {
            alert('먼저 로그인을 진행해 주세요.');
            setShowLogin(true);
            return;
        }
        
        const method = star ? 'DELETE' : 'POST';
        const token = getCookie('token');

        try {
            const response = await fetch(process.env.URL + '/myLibrary', {
                method: method,
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    token: token,
                    webtoonID: webtoonID,
                }),
            })
            const result = await response.json();

            if (result.success) {
                setStar(!star);
            }
            else {
                alert(result.meesage);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        showFavorite ? (
            star ? 
            <ThemeProvider theme={theme}>
                    <LinkContainer>
                        <Thumbnail url={props.thumbnail}/>
                        <InfoContainer>
                            <DetailContainer onClick={moveToWebtoon}>
                                <WebtoonTitle>
                                    {props.title}
                                </WebtoonTitle>
                                <AuthorInfo>
                                    {props.author}
                                </AuthorInfo>  
                            </DetailContainer>
                            <IconContainer onClick={selectFavorite}>
                                <Star style={starStyle}/>
                            </IconContainer>
                        </InfoContainer>
                    </LinkContainer>
            </ThemeProvider> : null
        ) :
        <ThemeProvider theme={theme}>
                <LinkContainer>
                    <Thumbnail url={props.thumbnail}/>
                    <InfoContainer>
                        <DetailContainer onClick={moveToWebtoon}>
                            <WebtoonTitle>
                                {props.title}
                            </WebtoonTitle>
                            <AuthorInfo>
                                {props.author}
                            </AuthorInfo>  
                        </DetailContainer>
                        <IconContainer onClick={selectFavorite}>
                            <Star style={starStyle}/>
                        </IconContainer>
                    </InfoContainer>
                </LinkContainer>
        </ThemeProvider>
    )
}

export default WebtoonLink;