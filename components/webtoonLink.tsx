import type React from "react";
import styled, { css, ThemeProvider } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentThemeState, showFavoriteState, showLoginState } from "./states/state";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { useState } from "react";
import Star from '/public/star.svg';
import { checkCookies, getCookie } from "cookies-next";

type info = {
    id: number;
    title: string;
    thumbnail: string,
    link: string;
    author: string[];
    bookmark: boolean;
}

type thumbnailProp = {
    url: string;
}

const LinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Thumbnail = styled.div<thumbnailProp>`
    background-repeat: no-repeat;
    background-size: 9rem 13rem;
    width: 9rem;
    height: 13rem;
    border-radius: 0.4rem;

    ${props => props.url && css<thumbnailProp>`
        background-image: url(${props.url});
    `}
`

const InfoContainer = styled.div`
    display: flex;
    width: 100%;
`

const DetailContainer = styled.a`
    display: flex;
    flex-direction: column;
    width: 7.5rem;
    text-decoration: none;

    :hover {
        cursor: pointer;
    }
`;

const IconContainer = styled.div`
    display: flex;
    margin-top: 0.3rem;
`;

const WebtoonTitle = styled.p`
    margin: 0.3rem 0 0.1rem 0.5rem;
    max-height: 1rem;
    color: ${({ theme }) => theme.textColor};
`;

const AuthorInfo = styled.p`
    margin: 0.2rem 0 0 0.5rem;
    max-height: 1rem;
    color: grey;
    font-size: 12px;
`;

const WebtoonLink:React.FC<info> = (props) => {
    const webtoonId = props.id;
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
                    webtoonId: webtoonId,
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
                            <DetailContainer href={props.link}>
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
                        <DetailContainer href={props.link}>
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