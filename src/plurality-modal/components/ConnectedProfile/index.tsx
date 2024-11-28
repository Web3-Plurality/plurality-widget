import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import ProfileIcon from '../../assets/profileIcon';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import ProfileIconSmall from '../../assets/profileIconSmall';
import ProfileStars from '../../assets/stars';

const ConnectedButtonWrapper = styled(Button) <{ $isOpen: boolean, $theme: string }>`
  width: 180px;
  /* height: 50px; */
  border-radius: 70px;
  border: none;
  /* background-color: #acacac !important; */
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
  /* border: 1px solid gray; */

  .anticon-caret-down,  .anticon-caret-up {
    color: lightgray !important;
  }

  &:hover {
    background-color: #acacac !important;
    /* background-color: ${props => (props.$theme === 'dark' ? '#000000 !important' : '#ffffff !important')}; */
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
  /* padding: 0; */

  .ant-dropdown-menu-item {
    padding: 0 15px !important;
    font-family: 'Lexend';
    font-size: 16px;
    font-weight: 400;

    .basic-info {
      display: flex;
      align-items: center;
      justify-content: space-between;

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

const ProfileConnectedButton = ({ theme }: { theme: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menu = (
    <StyledMenu $theme={theme}>
      <Menu.Item key="1">
        <div className='basic-info'>
          <div className='basic-info-details'>
            <ProfileIconSmall />
            <span>John Doe</span>
          </div>
          <div className='stars'>
            <ProfileStars />
            <ProfileStars />
            <ProfileStars />
            <ProfileStars />
          </div>
        </div>
      </Menu.Item>
      <hr />
      <Menu.Item key="2" style={{ marginTop: '10px' }}>
        <span>Profile</span>
      </Menu.Item>
      <Menu.Item key="3" style={{ marginTop: '10px' }}>
        <span>Wallet</span>
      </Menu.Item>
      <Menu.Item key="4" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <span>Settings</span>
      </Menu.Item>
      <hr />
      <Menu.Item key="5" style={{ marginTop: '10px', marginBottom: '10px' }}>
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
          <ProfileIcon />
          {isDropdownOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </ConnectedButtonWrapper>
      </Dropdown>
    </div>
  );
};

export default ProfileConnectedButton;