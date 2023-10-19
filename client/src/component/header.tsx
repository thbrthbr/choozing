import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const $Header = styled.div`
  background-color: #dfccfb;
  /* height: 80px; */
  font-size: 68px;
  font-weight: 700;
  text-align: center;
  font-family: 'DNFBitBitv2';
`;

const $LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Header = () => {
  // let colorChange = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  // let logoText = useRef<any>(null);
  // let [color, setColor] = useState(false);
  // let count = 0;
  // setInterval(() => {
  //   if (logoText.current)
  //     logoText.current.children[count % 8].style.color = 'white';
  //   setColor(!color);
  // }, 2000);
  return (
    <>
      <$Header>
        <$LinkStyle to={'/'}>
          <span>
            <span>C</span>
            <span>H</span>
            <span>O</span>
            <span>O</span>
            <span>Z</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </span>
        </$LinkStyle>
        {/* <img src=""></img> */}
      </$Header>
      <Outlet />
    </>
  );
};

export default Header;
