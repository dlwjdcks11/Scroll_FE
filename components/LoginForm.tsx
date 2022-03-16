import React, { useState } from "react"
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled, { ThemeProvider, keyframes } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { currentThemeState, showLoginState } from "./states/state";
import { lighten } from "polished";

const vibrate = keyframes`
    0%, 20%, 40%, 60%, 80%, 100% {
        transform: translate(0, 0);
    }
    10%, 50%, 90% {
        transform: translate(0.1rem, 0);
    }
    30%, 70% {
        transform: translate(-0.1rem, 0);
    }
`

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
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => lighten(0.2, theme.bgColor)};
    height: 2rem;
    margin-top: 0.5rem;
    border: none;
    border-bottom: 0.1rem solid var(--border_grey);
    transition: all 0.2s linear;

    :focus {
        outline: none;
        border-bottom: 0.1rem solid var(--primary);
    }

    :focus::placeholder {
        color: var(--primary);
    }

    ::placeholder {
        color: lightgrey;
    }
`;

const ShowState = styled.p`
    font-size: 12px;
    margin: 0.5rem auto 0 0;
    transition: color 0.5s ease;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-timing-function: ease;

    &.denied {
        color: var(--denied);
        animation-name: ${vibrate};
    }
`;

const Submit = styled.input`
    font-family: 'NanumSquareRoundBold';
    width: 5rem;
    height: 2rem;
    border: none;
    border-radius: 0.4rem;
    background-color: var(--primary);
    color: #F1F3F5;
    margin: 1rem 0 0 auto;

    :hover {
        cursor: pointer;
    }
`;

const LoginForm:React.FC = () => {
    const [isCorrect, setIsCorrect] = useState(false);
    const resetShowLogin = useResetRecoilState(showLoginState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;

    const closeLogin = () => {
        resetShowLogin();
    }

    const submitValues = (e) => {
        if (typeof document !== 'undefined') {
            const id = e.target.id.value;
            const pw = e.target.pw.value;

            if (id !== 'admin' || pw !== '1234') { // response로 바꿔야 한다.
                e.preventDefault();
                setIsCorrect(true);
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <DimmedDiv>
                <FormContainer onSubmit={submitValues}>
                    <CloseButton onClick={closeLogin}/>
                    <Title>
                        Scroll 로그인
                    </Title>
                    <Form>
                        <Input placeholder='아이디' id='id' autoComplete='off'/>
                        <Input placeholder='비밀번호' id='pw' autoComplete='off'/>                         
                        {isCorrect ? <ShowState className='denied' key={Math.random()}>
                            사용자 정보가 틀렸습니다.
                        </ShowState> : null}
                        <Submit type='submit' value='로그인'/>
                    </Form>
                </FormContainer>
            </DimmedDiv>
        </ThemeProvider>
    )
}

export default LoginForm;