import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const $Header = styled.div`
  background-color: #d988b9;
  /* height: 80px; */
  font-size: 68px;
  font-weight: 700;
  text-align: center;
`;

const $LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Header = () => {
  return (
    <>
      <$Header>
        <$LinkStyle to={'/'}>
          <span>CHOOZING</span>
        </$LinkStyle>
        {/* <img src=""></img> */}
      </$Header>
      <Outlet />
    </>
  );
};

export default Header;
