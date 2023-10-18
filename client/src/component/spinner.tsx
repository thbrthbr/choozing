import styled, { keyframes, css } from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import Roulette from '../img/roulette.png';

interface WheelData {
  option?: string;
  image?: ImageProps;
  style?: StyleType;
  optionSize?: number;
}

interface StyleType {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number | string;
  fontStyle?: string;
}

interface ImageProps {
  uri: string;
  offsetX?: number;
  offsetY?: number;
  sizeMultiplier?: number;
  landscape?: boolean;
}

const $ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #dfccfb;
  height: 90vh;
`;

const $CustomButton = styled.button`
  width: 70px;
  font-size: 20px;
  background-color: transparent;
  border-radius: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  &:hover {
    background-color: #efe9ab;
  }
`;

const $Upside = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 50px 0px 50px;
`;

const $BottomSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => {
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState<string>('0');
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const colorDataBase = [
    '#D2E0FB',
    '#F9F3CC',
    '#D7E5CA',
    '#8EACCD',
    '#EF9595',
    '#EFB495',
    '#EFD595',
    '#EBEF95',
  ];

  const add = () => {
    if (data.length == 0) {
      const prompt1 = prompt('첫번째 항목을 입력하세요');
      if (!prompt1) return;
      const prompt2 = prompt('두번째 항목을 입력하세요');
      if (prompt1 && prompt2) {
        let obj1 = {
          option: '1 ' + prompt1,
          style: {
            backgroundColor: colorDataBase[Math.floor(Math.random() * 8)],
          },
        };
        let obj2 = {
          option: '2 ' + prompt2,
          style: {
            backgroundColor: colorDataBase[Math.floor(Math.random() * 8)],
          },
        };
        setData([obj1, obj2]);
        setCount('3');
      }
    } else {
      const prompt1 = prompt('추가할 항목을 입력하세요');
      if (prompt1) {
        let obj = {
          option: count + ' ' + prompt1,
          style: {
            backgroundColor: colorDataBase[Math.floor(Math.random() * 8)],
          },
        };
        setData([...data, obj]);
        let next = +count + 1;
        setCount(String(next));
      }
    }
  };

  const del = () => {
    if (data.length <= 2) {
      alert('데이터는 2개 이상이어야 합니다');
    } else {
      let prompt1 = prompt('삭제할 항목의 번호를 기입해주세요');
      let survive = [];
      let idx = 1;
      for (let i = 0; i < data.length; i++) {
        let isIt = data[i].option.split(' ');
        if (isIt[0] !== prompt1) {
          let obj = {
            option: idx + ' ' + isIt[1],
            style: {
              backgroundColor: data[i].style.backgroundColor,
            },
          };
          survive.push(obj);
          idx++;
        }
      }
      setData(survive);
      let next = +count - 1;
      setCount(String(next));
    }
  };

  const spin = () => {
    if (data.length == 0) {
      alert('항목을 추가해주세요');
      return;
    }
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      console.log(newPrizeNumber);
      setMustSpin(true);
    }
  };
  const reset = () => {
    setData([]);
    setCount('0');
  };

  return (
    <$ContainerBox>
      <$Upside>
        {data.length > 1 ? (
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              alert(prizeNumber + 1 + '번이 선택되었습니다!');
              setMustSpin(false);
            }}
          />
        ) : (
          <img
            src={Roulette}
            style={{ cursor: 'pointer', width: '500px', height: '450px' }}
            onClick={add}
          ></img>
        )}
      </$Upside>
      <$BottomSide>
        <div>
          <$CustomButton onClick={spin}>돌리기</$CustomButton>
          <$CustomButton onClick={add}>추가</$CustomButton>
        </div>
        <div>
          <$CustomButton onClick={del}>삭제</$CustomButton>
          <$CustomButton onClick={reset}>리셋</$CustomButton>
        </div>
      </$BottomSide>
    </$ContainerBox>
  );
};

export default Spinner;
