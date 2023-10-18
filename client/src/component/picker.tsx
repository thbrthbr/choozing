import styled, { keyframes, css } from 'styled-components';
import { useRef, useState, useEffect, useInsertionEffect } from 'react';
import JSConfetti from 'js-confetti';
import crown from '../img/crown.png';

const $MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  background-color: #dfccfb;
  min-height: 100vh;
  height: 100%;
`;

const $CustomButton = styled.button`
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

const $CustomInput = styled.input`
  width: 60px;
  text-align: center;
  border: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px #007bff;
  }
`;

const Picker = () => {
  const [start, setStart] = useState<any>('');
  const [end, setEnd] = useState<any>('');
  const [theNumber, setTheNumber] = useState(10000);
  const [test, setTest] = useState(false);
  const [jsConfetti, setJsConfetti] = useState<any>(null);
  const [prevent, setPrevent] = useState(true);
  const [result, setResult] = useState('');

  const pick = () => {
    setResult('');
    if (prevent) {
      setPrevent(false);
      setTimeout(() => {
        setPrevent(true);
      }, 4000);
      if (isNaN(+start) || isNaN(+end)) {
        setStart('');
        setEnd('');
        alert('숫자만 입력할 수 있습니다');
        return;
      }
      let min = Math.min(start, end);
      let max = Math.max(start, end);
      if (max > 4000) {
        alert('4000 이하의 숫자까지 가능합니다');
        return;
      }
      if (min < 0) {
        alert('0 이상의 숫자부터 가능합니다');
        return;
      }
      let numberArr: number[] = [];
      for (let i = min; i <= max; i++) {
        numberArr.push(i);
      }

      let speed = setInterval(() => {
        const num = numberArr[Math.floor(Math.random() * numberArr.length)];
        setTheNumber(() => num);
      }, 20);

      setTimeout(() => {
        clearInterval(speed);
        setTest(!test);
      }, 3030);
    }
  };

  useEffect(() => {
    if (test) {
      setTest(false);
      setResult(theNumber + '번이 뽑혔습니다!');
      confetti();
    }
  }, [test]);

  useEffect(() => {
    setJsConfetti(new JSConfetti());
  }, []);

  const confetti = () => {
    jsConfetti.addConfetti({
      confettiColors: ['#CAB0FF', '#a88383', '#d20808', '#ffea00'],
      confettiNumber: 500,
    });
  };

  return (
    <$MainContainer>
      <img
        src={crown}
        style={{ width: '50px', margin: '20px 0px 0px 0px' }}
      ></img>

      <div style={{ fontSize: '140px', marginTop: '-40px', height: '170px' }}>
        {theNumber === 10000 ? 0 : theNumber}
      </div>
      {result}
      <h2>시작숫자를 넣어주세요</h2>
      <$CustomInput
        type="text"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      ></$CustomInput>
      <h2>끝숫자를 넣어주세요</h2>
      <$CustomInput
        type="text"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      ></$CustomInput>
      <br></br>
      <$CustomButton onClick={pick}>GO</$CustomButton>
    </$MainContainer>
  );
};

export default Picker;
