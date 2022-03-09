import React, { useState } from "react"
import { useResetRecoilState, useRecoilValue } from "recoil";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme/theme";
import { currentThemeState, showRegisterState } from "./states/state";
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

const passed = keyframes`
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(0, -0.2rem);
    }
    100% {
        transform: translate(0, 0);
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

const IdCheckContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const IdDuplicateCheckButton = styled.input`
    font-family: 'NanumSquareRoundBold';
    width: fit-content;
    height: 1.7rem;
    margin-left: 0.5rem;
    border: 0.1rem solid var(--primary);
    border-radius: 0.4rem;
    background-color: transparent;
    color: var(--primary);

    :hover {
        cursor: pointer;
    }
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

    &.passed {
        border-bottom: 0.1rem solid var(--passed);
        color: var(--passed);
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

    &.passed {
        color: var(--passed);
        animation-name: ${passed};
    }

    &.denied {
        color: var(--denied);
        animation-name: ${vibrate};
    }
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
// 03/09 TODO: 중복확인 누르고 바뀌었을 떄 예외처리, 디자인 다시보기, 비밀번호/확인 state 설정, 정규표현식
const RegisterForm:React.FC = () => {
    const [idState, setIdState] = useState(-1);
    const [pwState, setPwState] = useState(false);
    const resetRegisterLogin = useResetRecoilState(showRegisterState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    const idStateArray = [
        '사용 가능한 아이디 입니다.',
        '이미 존재하는 아이디 입니다.',
        '아이디는 N자 이하의 영문, 숫자로만 이루어져야 합니다.',
        '아이디 중복확인을 진행해 주세요.'
    ]

    const closeRegister = () => {
        resetRegisterLogin();
    }

    const showIdState = () => {
        const newId = idState + 1;
        setIdState(newId % 4);
    }

    return (
        <ThemeProvider theme={theme}>
            <DimmedDiv>
                <FormContainer>
                    <CloseButton onClick={closeRegister}/>
                    <Title>
                        Scroll 회원가입
                    </Title>
                    <Form>
                        <IdCheckContainer>
                            <Input placeholder='아이디' id='id' autoComplete='off' className={idState === 0 ? 'passed' : 'denied'}/>
                            <IdDuplicateCheckButton type='button' value='중복확인' onClick={showIdState}/>
                        </IdCheckContainer>
                        {idState !== -1 ? 
                            <ShowState className={idState === 0 ? 'passed' : 'denied'} key={idState}>
                                {idStateArray[idState]}
                            </ShowState> 
                        : null}
                        <Input placeholder='비밀번호' id='pw' autoComplete='off'/>
                        <Input placeholder='비밀번호 확인' id='pwCheck' autoComplete='off'/>
                        <Input placeholder='이메일' id='email' autoComplete='off'/>
                        <Input placeholder='닉네임' id='nickname' autoComplete='off'/>
                        <Submit type='submit' value='회원가입'/>
                    </Form>
                </FormContainer>
            </DimmedDiv>
        </ThemeProvider>
    )
}

export default RegisterForm;