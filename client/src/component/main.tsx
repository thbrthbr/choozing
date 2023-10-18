import { DataStore } from './store';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import roulette from '../img/roulette.png';
import picker from '../img/picker.png';
import ladder from '../img/ladders.png';
import tier from '../img/tier.png';

const $MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #dfccfb;
  min-height: 100vh;
  /* height: 100%; */
`;

const $Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 50px;
`;

const $LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;

const $ContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const $Content = styled.div`
  width: 200px;
  height: 200px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  text-align: center;
`;
const $ContentImg = styled.div`
  height: 150px;
  border-style: solid;
  border-color: black;
  border-width: 1px;
  border-radius: 5px;
  margin: 10px;
  background-color: white;
`;

const $Name = styled.div`
  text-decoration: none;
`;

const Main = () => {
  const { temp } = DataStore();
  const ItemArr = [
    {
      url: '/ladders',
      name: '사다리타기',
      img: ladder,
    },
    {
      url: '/spinner',
      name: '돌림판',
      img: roulette,
    },
    // {
    //   url: '/tournament',
    //   name: '토너먼트',
    //   img: '',
    // },
    {
      url: '/picker',
      name: '랜덤숫자뽑기',
      img: picker,
    },
    {
      url: '/tiermaker',
      name: '티어메이커',
      img: tier,
    },
    // {
    //   url: '/prefer-worldcup',
    //   name: '이상형월드컵',
    //   img: '',
    // },
  ];
  return (
    <$MainContainer>
      <$Logo>
        <h2>CHOOZING</h2>
      </$Logo>
      <$ContentBox>
        {ItemArr.map((item) => {
          return (
            <$LinkStyle to={item.url}>
              <$Content>
                <$ContentImg>
                  <img
                    style={{
                      width: '100%',
                      maxHeight: '100%',
                      borderRadius: '5px',
                    }}
                    src={item.img}
                  ></img>
                </$ContentImg>
                <$Name>{item.name}</$Name>
              </$Content>
            </$LinkStyle>
          );
        })}
      </$ContentBox>
    </$MainContainer>
  );
};

export default Main;
