import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import ProfileIcon from '../../assets/profileIcon';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import ProfileIconSmall from '../../assets/profileIconSmall';
import ProfileStars from '../../assets/stars';

const ProfileWrapper = styled(Button) <{ $isOpen: boolean, $theme: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color:  ${props => (props.$theme === 'dark' ? '#000000' : '#ffffff')};;
  padding: 20px 20px;
  width: 354px;
  gap: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;

  height: ${props => (props.$isOpen ? '430px' : '183px')};
  transition: height 0.8s ease;

  &:hover {
    background-color:  ${props => (props.$theme === 'dark' ? '#000000 !important' : '#ffffff !important')};
    color: #fff !important;
  }

  .content-wrapper{
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: -5px;
  }

  .vertical-line {
    width: 0;
    height: 150px;
    border: 1px solid #acacac

  }
`;

const ConnectedButtonWrapper = styled(Button) < { $isOpen: boolean, $theme: string } > `
  width: 100%;
  max-width: 180px;
  height: 143px;
  border-radius: 70px;
  border: none;
  background-color:transparent !important;
  color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
  align-items: center;
  box-shadow: none;
  transition: background-color 0.8s ease;

  .anticon-caret-down{
    color: lightgray !important;
  }

  &:hover {
    background-color:  #acacac !important;
    color: #fff !important;
  }
`;


const StyledMenu = styled(Menu) <{ $theme: string }>`
 background-color: #F9F9F9 !important;
  margin-top: 30px !important;
  margin-left: -50px !important;
  width: 260px;
  border-radius: 25px !important;
  padding: 0;
   

  .ant-dropdown-menu-item{
    padding: 0 15px !important;
    font-family: 'Lexend';
    font-size: 16px;
    font-weight: 400;

    .basic-info{
      display: flex;
      align-items: center;
      justify-content: space-between;

      span{
        font-family: 'Lexend';
        font-size: 16px;
        font-weight: 400;
      }

      .basic-info-details{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.4rem
      }
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 260px;
  }
`;

const ProfileConnectedButton1 = ({ theme }: { theme: string }) => {
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
    <ProfileWrapper $isOpen={isDropdownOpen} $theme={theme}>
      <div className='content-wrapper'>
        <div className="vertical-line"></div>
        <Dropdown
          overlay={menu}
          trigger={['hover']}
          onVisibleChange={toggleDropdown}
          visible={isDropdownOpen}
        >
          <ConnectedButtonWrapper $isOpen={isDropdownOpen} $theme={theme} >
            <ProfileIcon />
            {isDropdownOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </ConnectedButtonWrapper>
        </Dropdown>
      </div>
    </ProfileWrapper>
  );
};

export default ProfileConnectedButton1;
