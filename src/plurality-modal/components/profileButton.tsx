import React from 'react'
import { Button } from 'antd';
import styled from 'styled-components';

const SocialButtonWrapper = styled(Button)`
    min-width: 180px;
    height: 40px;
    border-radius: 10px;
    border: none;
    background-color: #ACACAC;
    color: #fff;
    margin-top: 0.5rem;
    transition: background-color 0.8s ease;
    
    &:hover {
        background-color: #000000 !important;
        color: #fff !important
    }

    /* @media (max-width: 420px) {
        min-width: calc(100% + 30px);
    }

    @media (max-width: 370px) {
        min-width: calc(100% - 30px); 
    }

    @media (max-width: 340px) {
        min-width: calc(100% - 50px);
        padding: 0 10px;
    }

    @media (max-width: 320px) {
        min-width: 100%;
    } */
`;

const ProfileButton = ({ handleClick }: { handleClick: () => void }) => {
    return (
        <SocialButtonWrapper
            type="default"
            onClick={handleClick}
        >
            <span>Connect Metamask</span>
        </SocialButtonWrapper>
    )
}

export default ProfileButton;
