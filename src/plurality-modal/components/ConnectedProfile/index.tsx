import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import ProfileIcon from '../../assets/profileIcon';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import ProfileStars from '../../assets/profileStar';
import { User } from './../../types/payloadTypes';

const ConnectedButtonWrapper = styled(Button) <{ $isOpen: boolean, $theme: string }>`
  width: 180px;
  border-radius: 70px;
  border: none;
  background-color: ${props => (props.$theme === 'dark' ? '#000000 !important' : 'transparent !important')};
  color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: center;
  box-shadow: none;
  transition: background-color 0.8s ease;
  overflow: hidden;
  padding: 25px 10px !important;

  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .anticon-caret-down, .anticon-caret-up {
    color: lightgray !important;
  }

  &:hover {
    background-color: #acacac !important;
    color: #fff !important;
  }

  > svg:first-of-type {
    width: 50px;
    height: 60px;
  }
`;

const StyledMenu = styled(Menu) <{ $theme: string }>`
  background-color: #F9F9F9 !important;
  width: 270px;
  max-width: 100%;
  border-radius: 25px !important;

  span {
    color: #545454 !important;
  }

  .ant-dropdown-menu-item {
    padding: 0 15px !important;
    font-family: 'Lexend';
    font-size: 16px;
    font-weight: 400;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #F9F9F9 !important;
      color: #000;
    }

    .basic-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      span {
        font-family: 'Lexend';
        font-size: 16px;
        font-weight: 400;
      }

      .basic-info-details {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100;
  }
`;

const baseUrl = process.env.REACT_APP_WIDGET_BASE_URL || '*'

const ProfileConnectedButton = ({ theme, userData, handleClick }: { theme: string, userData: User, handleClick: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { profileIcon: icon, username: name, ratings } = userData

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    const iframe = document.getElementById('iframe') as HTMLIFrameElement;
    const isMetamaskConnected = localStorage.getItem('metamask')
    const connectedPlatform = isMetamaskConnected ? 'metamask' : 'lit'
    if (iframe?.contentWindow) {
      const messageId = `msg-${Date.now()}`;
      const payload = { id: messageId, type: 'logoutRequest', platform: connectedPlatform };
      iframe.contentWindow.postMessage(payload, baseUrl);
    }
  }

  const goToProfile = (step: string) => {
    const iframe = document.getElementById('iframe') as HTMLIFrameElement;
    if (iframe?.contentWindow) {
      const messageId = `msg-${Date.now()}`;
      const payload = { id: messageId, type: 'goToStep', step };
      iframe.contentWindow.postMessage(payload, baseUrl);
    }
    handleClick()
  }

  const renderRatings = () => {
    return Array.from({ length: ratings || 0 }, (_, i) => <ProfileStars key={i} />);
  }

  const menu = (
    <StyledMenu $theme={theme}>
      <Menu.Item key="1">
        <div className='basic-info'>
          <div className='basic-info-details'>
            <span>{name}</span>
          </div>
          <div className='stars'>
            {renderRatings()}
          </div>
        </div>
      </Menu.Item>
      <hr />
      <Menu.Item key="2" style={{ marginTop: '10px' }} onClick={() => goToProfile('profile')}>
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="3" style={{ marginTop: '10px' }} onClick={() => goToProfile('wallet')}>
        <span>Wallet</span>
      </Menu.Item>
      <Menu.Item key="4" style={{ marginTop: '10px', marginBottom: '10px' }} onClick={() => goToProfile('profileSettings')}>
        <span>Update</span>
      </Menu.Item>
      <hr />
      <Menu.Item key="5" style={{ marginTop: '10px', marginBottom: '10px' }} onClick={handleLogout}>
        <span>Logout</span>
      </Menu.Item>
    </StyledMenu>
  );

  return (
    <div className='content-wrapper'>
      <div className="vertical-line"></div>
      <Dropdown
        overlay={menu}
        trigger={['hover']}
        onVisibleChange={toggleDropdown}
        visible={isDropdownOpen}
        overlayClassName="custom-dropdown"
      >
        <ConnectedButtonWrapper $isOpen={isDropdownOpen} $theme={theme}>
          <div className='avatar'>
            {icon ? <img src={icon} alt='profile-icon' /> : <ProfileIcon />}
          </div>
          {isDropdownOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </ConnectedButtonWrapper>
      </Dropdown>
    </div>
  );
};

export default ProfileConnectedButton;
