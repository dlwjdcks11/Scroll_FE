import React, { useState } from "react"
import { useResetRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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

const CheckContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const DuplicateCheckButton = styled.input`
    font-family: 'NanumSquareRoundBold';
    width: fit-content;
    height: 1.7rem;
    margin-left: 0.5rem;
    margin-top: 0.7rem;
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
    margin-top: 0.7rem;
    border: none;
    border-bottom: 0.1rem solid var(--border_grey);
    transition: all 0.2s linear;
    padding: 0;

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

    :hover {
        cursor: pointer;
    }
    :active {
        background-color: black;
    }
`

const RegisterForm:React.FC = () => {
    const setShowRegister = useSetRecoilState(showRegisterState);
    const [idState, setIdState] = useState(-1);
    const [nicknameState, setNicknameState] = useState(-1);
    const [pwState, setPwState] = useState(-1);
    const [confirmPwState, setConfirmPwState] = useState(-1);
    const resetRegisterLogin = useResetRecoilState(showRegisterState);
    const currentTheme = useRecoilValue(currentThemeState);
    const theme = currentTheme ? darkTheme : lightTheme;
    const idStateArray = [
        '?????? ????????? ????????? ?????????.',
        '?????? ???????????? ????????? ?????????.',
        '???????????? ????????? ?????? ????????? ?????????.',
        '????????? ??????????????? ????????? ?????????.',
        '???????????? ?????? ?????? ???????????????.'
    ]
    const nicknameStateArray = [
        '?????? ????????? ????????? ?????????.',
        '?????? ???????????? ????????? ?????????.',
        '???????????? 2 ~ 10?????? ??????, ??????, ???????????? ??????????????? ?????????.',
        '????????? ??????????????? ????????? ?????????.',
        '???????????? ?????? ?????? ???????????????.'
    ]
    const pwStateArray = [
        '?????? ????????? ???????????? ?????????.',
        '??????????????? 4 ~ 20?????? ??????, ???????????? ??????????????? ?????????.',
        '??????????????? ?????? ?????? ???????????????.'
    ]
    const confirmPwStateArray = [
        '??????????????? ???????????????.',
        '??????????????? ???????????? ????????????.',
        '???????????? ????????? ???????????????.'
    ]

    const closeRegister = () => { // ?????? ??????
        resetRegisterLogin();
    }

    const checkId = async () => { // ????????? ???????????? ??????
        const idRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const id = (document.getElementById('id') as HTMLInputElement).value;

        if (id === '') {
            setIdState(4);
            return;
        }

        if (!idRegexp.test(id)) {
            setIdState(2); // ?????????????????? ??????
            return;
        }

        try {
            const response = await fetch(process.env.URL + '/account/doubleCheck', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify({
                    type: 'email',
                    value: id,
                })
            })
            const result = await response.json();

            if (result.success) {
                setIdState(0); // ?????? ??????        
            }
            else {
                setIdState(1);  
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const resetIdState = () => { // ????????? ?????? ?????? ????????? ?????? ??????
        setIdState(-1);
    }

    const checkNickname = async () => {
        const nicknameRegexp = /^[???-???a-zA-Z0-9]{2,10}$/;
        const nickname = (document.getElementById('nickname') as HTMLInputElement).value;

        if (nickname === '') {
            setNicknameState(4);
            return;
        }

        if (!nicknameRegexp.test(nickname)) {
            setNicknameState(2); // ?????????????????? ??????
            return;
        }

        try {
            const response = await fetch(process.env.URL + '/account/doubleCheck', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify({
                    type: 'nickname',
                    value: nickname,
                })
            })
            const result = await response.json();

            if (result.success) {
                setNicknameState(0); // ?????? ??????        
            }
            else {
                setNicknameState(1); 
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const resetNicknameState = () => { // ????????? ?????? ?????? ????????? ?????? ??????
        setNicknameState(-1);
    }

    const checkPw = (e) => {
        const pwRegexp = /^[A-Za-z0-9]{4,20}$/;
        const pw = e.target.value;

        setConfirmPwState(-1);

        if (pw === "") {
            setPwState(-1);
            return;
        }
            
        if (pwRegexp.test(pw))
            setPwState(0);
        else
            setPwState(1);
    }

    const confirmPw = (e) => {
        const pw = (document.getElementById('pw') as HTMLInputElement).value;
        const pwRegexp = /^[A-Za-z0-9]{4,20}$/;
        const confirmPw = e.target.value;

        if (confirmPw === "" || !pwRegexp.test(pw)) {
            setConfirmPwState(-1);
            return;
        }

        if (pw === confirmPw)
            setConfirmPwState(0);
        else 
            setConfirmPwState(1);
    }

    const register = async (e) => {
        if (typeof document !== 'undefined') {
            const id = (document.getElementById('id') as HTMLInputElement).value;
            const pw = (document.getElementById('pw') as HTMLInputElement).value;
            const nickname = (document.getElementById('nickname') as HTMLInputElement).value;

            if (idState === -1)
                setIdState(4);
            if (nicknameState === -1)
                setNicknameState(4);
            if (pwState === -1)
                setPwState(2);
            if (confirmPwState === -1 && pw !== '')
                setConfirmPwState(2);
            if (id !== '' && idState !== 0)
                setIdState(3);
            if (nickname !== '' && nicknameState !== 0)
                setNicknameState(3);
    
            if (idState === 0 && nicknameState === 0 && pwState === 0 && confirmPwState === 0) {
                try {
                    const response = await fetch(process.env.URL + '/account', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: id,
                            pw: pw,
                            nickname: nickname,
                        })
                    });
                    const result = await response.json();
    
                    console.log(result.success);
                    if (result.success) {
                        alert(result.message);
                        setShowRegister(false);
                    }
                    else {
                        alert(result.message);
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <DimmedDiv>
                <FormContainer>
                    <CloseButton onClick={closeRegister}/>
                    <Title>
                        Scroll ????????????
                    </Title>
                    <Form>
                        <CheckContainer>
                            <Input placeholder='?????????(?????????)' id='id' autoComplete='off' onChange={resetIdState}/>
                            <DuplicateCheckButton type='button' value='????????????' onClick={checkId}/>
                        </CheckContainer>
                        {idState !== -1 ? 
                            <ShowState className={idState === 0 ? 'passed' : 'denied'}>
                                {idStateArray[idState]}
                            </ShowState> 
                        : null}
                        <CheckContainer>
                            <Input placeholder='?????????' id='nickname' autoComplete='off' onChange={resetNicknameState}/>
                            <DuplicateCheckButton type='button' value='????????????' onClick={checkNickname}/>
                        </CheckContainer>
                        {nicknameState !== -1 ? 
                            <ShowState className={nicknameState === 0 ? 'passed' : 'denied'}>
                                {nicknameStateArray[nicknameState]}
                            </ShowState> 
                        : null}
                        <Input placeholder='????????????' id='pw' autoComplete='off' onChange={checkPw} maxLength={20}/>
                        {pwState !== -1 ? 
                            <ShowState className={pwState === 0 ? 'passed' : 'denied'}>
                                {pwStateArray[pwState]}
                            </ShowState> 
                        : null}
                        <Input placeholder='???????????? ??????' id='pwCheck' autoComplete='off' onChange={confirmPw} maxLength={20}/>
                        {confirmPwState !== -1 ? 
                            <ShowState className={confirmPwState === 0 ? 'passed' : 'denied'}>
                                {confirmPwStateArray[confirmPwState]}
                            </ShowState> 
                        : null}
                        <Submit type='button' value='????????????' onClick={register}/>
                    </Form>
                </FormContainer>
            </DimmedDiv>
        </ThemeProvider>
    )
}

export default RegisterForm;