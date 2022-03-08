import React from "react"
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { currentThemeState, showLoginState } from "./states/state";
import { lighten } from "polished";

const DimmedDiv = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 1001;
    justify-content: center;
    align-items: center;
`

const FormContainer = styled.div`
    display: flex;
    width: 25rem;
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    border: none;
    border-radius: 0.4rem;
    flex-direction: column;
    align-items: center;
`

const CloseButton = styled.div`
    margin: 0.3rem auto 0 0.5rem;
    width: fit-content;
    color: ${({ theme }) => theme.textColor};

    :after {
        content: '\\00d7';
        font-size: 32px;
    }

    :hover {
        cursor: pointer;
    }
`

const Title = styled.p`
    font-family: 'NanumSquareRoundExtraBold';
    font-size: 24px;
    color: var(--primary);
`

const Form = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
`

const Input = styled.input`
    width: 100%;
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    height: 2rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 0.4rem;
    border-bottom: 0.1rem solid var(--border_grey);

    :focus {
        outline: none;
    }

    ::placeholder {
        color: lightgrey;
    }

    :focus+.underline {
        transform: scale(1);
    }
`;

const Underline = styled.span`
    background-color: var(--primary);
    display: inline-block;
    width: 100%;
    height: 0.1rem;
    transform: scale(0, 1);
    transition: all 0.2s linear;
`

const Submit = styled.input`
    font-family: 'NanumSquareRoundBold';
    width: 5rem;
    height: 2rem;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--primary);
    color: #F1F3F5;
    margin: 1rem 0 0 auto;
`

const LoginForm:React.FC = () => {
    const setShowLogin = useSetRecoilState(showLoginState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    const closeLogin = () => {
        setShowLogin(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <DimmedDiv>
                <FormContainer>
                    <CloseButton onClick={closeLogin}/>
                    <Title>
                        Scroll 로그인
                    </Title>
                    <Form>
                        <Input placeholder="ID" id={'id'} autoComplete={'off'}/>
                        <Underline className={'underline'}/>
                        <Input placeholder="PW" id={'pw'} autoComplete={'off'}/>
                        <Underline className={'underline'}/>
                        <Submit type="submit" value={'로그인'}/>
                    </Form>
                </FormContainer>
            </DimmedDiv>
        </ThemeProvider>
    )
}

export default LoginForm;