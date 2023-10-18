import React, { useEffect, useRef, useState } from 'react';
import clonedeep from 'lodash.clonedeep';
import styled from 'styled-components';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const $Container = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background-color: #dfccfb;
`;

const $UpperPlace = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;
const $UpperLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const $ButtonPlace = styled.div`
  width: 50%;
  display: flex;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const $CustomButton = styled.button`
  height: 30px;
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

const $CustomButton2 = styled.button`
  width: 40%;
  height: 30px;
  font-size: 15px;
  background-color: #867a97;
  border-radius: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #d6e2eb;
  cursor: pointer;
  &:hover {
    color: #51585d;
    background-color: #efe9ab;
  }
`;

const $Users = styled.button`
  font-size: 20px;
  border-radius: 50%;
  background-color: #fe79d4;
  color: white;
  border: 0.2px #f1c8ee solid;
  cursor: pointer;
`;

const $UserInput = styled.input.attrs((props) => ({ type: 'number' }))`
  text-align: center;
  font-size: 40px;
  background-color: transparent;
  border: none;
  width: 70px;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px #007bff;
  }
`;

const $AddInput = styled.input`
  border-radius: 5px;
  border-style: none;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px #007bff;
  }
`;

const $Destination = styled.input`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background-color: transparent;
  border: 0px;
  text-align: center;
  font-size: 20px;
`;

const DEFAUTL_USERS = 5;
const DEFAUTL_LINE_WIDTH = 3;
const DEFAUTL_LINE_COLOR = 'black';

const colorDatabase = [
  'red',
  'orange',
  'yellow',
  'green',
  'black',
  'purple',
  'pink',
];

const center = (array: any) =>
  array.sort((a: any, b: any) => a - b).at(Math.floor(array.length / 2));

const sort = (arr: any) => {
  const _arr = clonedeep(arr);
  _arr.map((arg: any) => {
    arg.sort((a: any, b: any) => a.y - b.y);
    return arg;
  });
  return _arr;
};

let limiter: any = {};

const Ladders = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const addList = useRef<any>(null);

  const [ctx, setCtx] = useState<any>();
  const [isDrawing, setIsDrawing] = useState(false);

  const [users, setUsers] = useState(DEFAUTL_USERS);

  const [data, setData] = useState<any>([]);
  const [bridgeData, setBridgeData] = useState<any>([]);
  const [sortedData, setSortedData] = useState<any>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [jebi, setJebi] = useState<any>([]);
  const [modal, setModal] = useState(false);
  const [inputs, setInputs] = useState([1]);
  const [inputArr, setInputArr] = useState<any>([]);
  const [applied, setApplied] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    // jebi.map((x: any) => (prizeRef.current.children[x].value = '당첨'));
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const startTouchPoint = useRef<any>(null);
  const prizeRef = useRef<any>(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.7;

      const context = canvas.getContext('2d');
      context.fillStyle = '#dfccfb';
      // context.strokeStyle = 'red';
      // context.lineJoin = 'round';
      // context.lineWidth = 3;
      contextRef.current = context;

      setCtx(context);
    }
  }, []);

  const init = () => {
    if (!ctx) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const { width, height } = canvas;
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.restore();
    }
  };

  const drawBaseLine = () => {
    setApplied(true);
    setWidth(window.innerWidth);
    init();
    setBridgeData([]);
    const canvas: any = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    console.log(width);
    console.log(height);
    const _arr = [];

    for (let i = 0; i < users; i++) {
      let startPosX = (i / users) * width + ((1 / users) * width) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = DEFAUTL_LINE_WIDTH;
      ctx.strokeStyle = DEFAUTL_LINE_COLOR;
      ctx.moveTo(startPosX, 0);
      ctx.lineTo(startPosX, height);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
      let arr = [
        { x: startPosX, y: 0 },
        { x: startPosX, y: height },
      ];
      limiter[startPosX] = 0;
      _arr.push(arr);
    }
    console.log(_arr);
    setData(_arr);
  };

  function drawBridge() {
    const canvas: any = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;

    if (!ctx) return;

    for (let i = 0; i < users; i++) {
      let startPosX = (i / users) * width + ((1 / users) * width) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = DEFAUTL_LINE_WIDTH;
      ctx.strokeStyle = DEFAUTL_LINE_COLOR;
      ctx.moveTo(startPosX, 0);
      ctx.lineTo(startPosX, height);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    if (bridgeData.length < 1) return;
    bridgeData.forEach((item: any) => {
      let { startBridge, endBridge } = item;
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = DEFAUTL_LINE_WIDTH;
      ctx.strokeStyle = DEFAUTL_LINE_COLOR;
      ctx.moveTo(startBridge.x, startBridge.y);
      ctx.lineTo(endBridge.x, endBridge.y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    });
  }

  const getTargetIndex = (x: any) => {
    const diff = data.map((d: any) => Math.abs(d[0].x - x));
    const closest = Math.min(...diff);
    return diff.findIndex((d: any) => d === closest);
  };

  const fillIn = () => {
    if (applied == true) {
      let arr = [];
      for (let i in limiter) {
        arr.push(i);
      }
      for (let j = 0; j < arr.length - 1; j++) {
        let num = 2;
        let fin = 0;
        for (let i = 0; i < num; i++) {
          let obj1 = {
            offsetX: +arr[j],
            offsetY: Math.random() * 1500,
          };
          let obj2 = {
            offsetX: +arr[j + 1],
            offsetY: Math.random() * 1500,
          };
          startDrawing2(obj1);
          let isDone = finishDrawing2(obj2);
          if (!isDone) {
            num++;
          } else {
            fin++;
            if (fin >= 3) {
              break;
            }
          }
        }
      }
      for (let i in limiter) {
        limiter[i] = 0;
      }
    } else {
      alert('먼저 사다리를 시작해주세요');
    }
  };

  const startDrawing2 = (nativeEvent: any) => {
    if (data.length < 1) return;
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX);
    console.log(offsetY);
    const targetIndex = getTargetIndex(offsetX);
    startTouchPoint.current = { targetIndex, x: offsetX, y: offsetY };
  };

  const finishDrawing2 = (nativeEvent: any) => {
    if (data.length < 1) return;
    setIsDrawing(false);
    const { offsetX, offsetY } = nativeEvent;
    const targetIndex = getTargetIndex(offsetX);

    const _startTouch = startTouchPoint.current;
    const _endTouch = { targetIndex, x: offsetX, y: offsetY };
    let startTouch = _startTouch;
    let endTouch = _endTouch;

    if (_startTouch.targetIndex > _endTouch.targetIndex) {
      startTouch = _endTouch;
      endTouch = _startTouch;
    }

    const startTargetX = data[startTouch.targetIndex][0].x;
    const maxS = Math.max(startTargetX, endTouch.x, startTouch.x);
    const minS = Math.min(startTargetX, endTouch.x, startTouch.x);
    const centerS = center([startTargetX, endTouch.x, startTouch.x]);
    const xRatioS = (maxS - centerS) / (maxS - minS);
    const startYLen =
      startTouch.x - startTargetX >= 0
        ? (endTouch.y - startTouch.y) / xRatioS
        : (endTouch.y - startTouch.y) * xRatioS;
    const startY = endTouch.y - startYLen;

    const endTargetX = data[endTouch.targetIndex][0].x;
    const maxE = Math.max(endTargetX, endTouch.x, startTouch.x);
    const minE = Math.min(endTargetX, endTouch.x, startTouch.x);
    const centerE = center([endTargetX, endTouch.x, startTouch.x]);
    const xRatioE = (centerE - minE) / (maxE - minE);
    const endYLen =
      endTouch.x - endTargetX >= 0
        ? (endTouch.y - startTouch.y) * xRatioE
        : (endTouch.y - startTouch.y) / xRatioE;
    const endY = endYLen + startTouch.y;

    if (
      startY < 1 ||
      startY > window.innerHeight - 250 ||
      endY < 1 ||
      endY > window.innerHeight - 250
    ) {
      init();
      drawBridge();
      return;
    }

    if (endTouch.targetIndex - startTouch.targetIndex !== 1) {
      init();
      drawBridge();
      return true;
    }

    if (limiter[startTargetX] >= 3) {
      console.log(limiter);
      init();
      drawBridge();
      return true;
    }

    limiter[startTargetX] += 1;
    console.log(limiter);

    const linkId = new Date().getTime() * Math.random();
    const newBridge = {
      startBridge: {
        targetIndex: startTouch.targetIndex,
        x: startTargetX,
        y: startY,
        linkId,
        linkIndex: endTouch.targetIndex,
      },
      endBridge: {
        targetIndex: endTouch.targetIndex,
        x: endTargetX,
        y: endY,
        linkId,
        linkIndex: startTouch.targetIndex,
      },
    };
    setBridgeData((prev: any) => {
      return [...prev, newBridge];
    });

    return true;
  };

  const startDrawing = ({ nativeEvent }: any) => {
    if (data.length < 1) return;
    setIsDrawing(true);
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX);
    console.log(offsetY);
    const targetIndex = getTargetIndex(offsetX);
    startTouchPoint.current = { targetIndex, x: offsetX, y: offsetY };
  };

  const finishDrawing = ({ nativeEvent }: any) => {
    if (data.length < 1) return;
    setIsDrawing(false);
    const { offsetX, offsetY } = nativeEvent;
    console.log(offsetX);
    console.log(offsetY);
    const targetIndex = getTargetIndex(offsetX);

    const _startTouch = startTouchPoint.current;
    const _endTouch = { targetIndex, x: offsetX, y: offsetY };
    let startTouch = _startTouch;
    let endTouch = _endTouch;

    if (_startTouch.targetIndex > _endTouch.targetIndex) {
      startTouch = _endTouch;
      endTouch = _startTouch;
    }

    const startTargetX = data[startTouch.targetIndex][0].x;
    const maxS = Math.max(startTargetX, endTouch.x, startTouch.x);
    const minS = Math.min(startTargetX, endTouch.x, startTouch.x);
    const centerS = center([startTargetX, endTouch.x, startTouch.x]);
    const xRatioS = (maxS - centerS) / (maxS - minS);
    const startYLen =
      startTouch.x - startTargetX >= 0
        ? (endTouch.y - startTouch.y) / xRatioS
        : (endTouch.y - startTouch.y) * xRatioS;
    const startY = endTouch.y - startYLen;

    const endTargetX = data[endTouch.targetIndex][0].x;
    const maxE = Math.max(endTargetX, endTouch.x, startTouch.x);
    const minE = Math.min(endTargetX, endTouch.x, startTouch.x);
    const centerE = center([endTargetX, endTouch.x, startTouch.x]);
    const xRatioE = (centerE - minE) / (maxE - minE);
    const endYLen =
      endTouch.x - endTargetX >= 0
        ? (endTouch.y - startTouch.y) * xRatioE
        : (endTouch.y - startTouch.y) / xRatioE;
    const endY = endYLen + startTouch.y;

    if (
      startY < 1 ||
      startY > window.innerHeight ||
      endY < 1 ||
      endY > window.innerHeight
    ) {
      init();
      drawBridge();
      return;
    }

    if (endTouch.targetIndex - startTouch.targetIndex !== 1) {
      init();
      drawBridge();
      return;
    }
    const linkId = new Date().getTime() * Math.random();
    const newBridge = {
      startBridge: {
        targetIndex: startTouch.targetIndex,
        x: startTargetX,
        y: startY,
        linkId,
        linkIndex: endTouch.targetIndex,
      },
      endBridge: {
        targetIndex: endTouch.targetIndex,
        x: endTargetX,
        y: endY,
        linkId,
        linkIndex: startTouch.targetIndex,
      },
    };
    setBridgeData((prev: any) => {
      return [...prev, newBridge];
    });
  };

  const drawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    if (ctx) {
      const startTouch = startTouchPoint.current;
      if (!isDrawing) return;

      init();
      drawBridge();

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startTouch.x, startTouch.y);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };
  const clearContext = () => {
    const canvas: any = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setData([]);
    setBridgeData([]);
    setSortedData([]);
    setApplied(false);
    console.clear();
  };

  useEffect(() => {
    if (bridgeData.length < 1) return;
    init();
    drawBridge();

    const temp = clonedeep(data);

    bridgeData.forEach(({ startBridge, endBridge }: any) => {
      temp[startBridge.targetIndex].push(startBridge);
      temp[endBridge.targetIndex].push(endBridge);
    });

    // setSortedData(sort(temp, 'y'));
    setSortedData(sort(temp));
  }, [bridgeData]);

  const tracePath = (idx: any) => {
    if (sortedData.length < 1) return;
    init();
    drawBridge();
    const path = [];
    let currentLine = idx;
    let nodeIdx = 0;
    const usedBridge = new Set();
    let breakPoint = 0; // 무한 루프 방지

    while (breakPoint < 1000) {
      if (sortedData[currentLine].length === nodeIdx) break;
      const node = sortedData[currentLine][nodeIdx];
      path.push({ i: currentLine, x: node.x, y: node.y });

      if (!node.linkId) {
        nodeIdx++;
      } else if (usedBridge.has(node.linkId)) {
        const start = path[path.length - 2].i;
        const end = currentLine;

        if (start !== end) nodeIdx++;
        else {
          currentLine = node.linkIndex;
          nodeIdx = sortedData[currentLine].findIndex(
            (el: any) => node.linkId === el.linkId,
          );
        }
      } else {
        currentLine = node.linkIndex;
        nodeIdx = sortedData[currentLine].findIndex(
          (el: any) => node.linkId === el.linkId,
        );
        usedBridge.add(node.linkId);
      }
      breakPoint++;
    }

    for (let i = 0; i < path.length - 1; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = DEFAUTL_LINE_WIDTH;
      ctx.strokeStyle = 'blue';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 5;

      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i + 1].x, path[i + 1].y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  const tracePath2 = (idx: any) => {
    if (sortedData.length < 1) return;
    // init();
    // drawBridge();
    const path = [];
    let currentLine = idx;
    let nodeIdx = 0;
    const usedBridge = new Set();
    let breakPoint = 0; // 무한 루프 방지

    while (breakPoint < 1000) {
      if (sortedData[currentLine].length === nodeIdx) break;
      const node = sortedData[currentLine][nodeIdx];
      path.push({ i: currentLine, x: node.x, y: node.y });

      if (!node.linkId) {
        nodeIdx++;
      } else if (usedBridge.has(node.linkId)) {
        const start = path[path.length - 2].i;
        const end = currentLine;

        if (start !== end) nodeIdx++;
        else {
          currentLine = node.linkIndex;
          nodeIdx = sortedData[currentLine].findIndex(
            (el: any) => node.linkId === el.linkId,
          );
        }
      } else {
        currentLine = node.linkIndex;
        nodeIdx = sortedData[currentLine].findIndex(
          (el: any) => node.linkId === el.linkId,
        );
        usedBridge.add(node.linkId);
      }
      breakPoint++;
    }

    for (let i = 0; i < path.length - 1; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.lineWidth = DEFAUTL_LINE_WIDTH;
      ctx.strokeStyle = colorDatabase[idx % 7];
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 5;

      ctx.moveTo(path[i].x, path[i].y);
      ctx.lineTo(path[i + 1].x, path[i + 1].y);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  const result = (num: number) => {
    for (let i = 0; i < num; i++) {
      tracePath2(i);
    }
  };

  const jebiPick = () => {
    inputReset();
    // console.log(Array.from(prizeRef.current.children));
    Array.from(prizeRef.current.children).forEach((x: any) => (x.value = ''));
    setJebi([]);
    let prompt2: any = prompt('당첨 개수를 정해주세요');
    if (prompt2) {
      if (!isNaN(+prompt2)) {
        if (+prompt2 <= prizeRef.current.children.length) {
          let arr = Array.from(
            { length: prizeRef.current.children.length },
            (v, i) => i,
            0,
          );
          arr.sort(() => Math.random() - 0.5);
          console.log(arr);
          let temp = [];
          for (let i = 0; i < +prompt2; i++) {
            let num = arr.shift();
            console.log(num);
            if (num !== undefined) {
              temp.push(num);
            }
          }
          setJebi(temp);
        } else {
          alert('당첨 개수는 전체 유저 수보다 작아야 합니다');
        }
      } else {
        alert('숫자만 입력할 수 있습니다');
      }
    }
  };

  const modalOn = (e: any) => {
    // if (e.target == e.currentTarget)
    setJebi([]);
    setModal(!modal);
  };

  const prizePick = () => {
    let inputArrRef: any = addList.current;
    if (!inputArrRef) return;
    let tempArr = [];
    for (let i = 0; i < inputArrRef.children.length - 2; i++) {
      tempArr.push(inputArrRef.children[i].children[0].value);
    }
    console.log(tempArr);
    setInputArr(tempArr);
    setModal(!modal);
  };

  const cancelInputAdd = (key: any) => {
    if (inputs.length > 1) {
      let copy = inputs.slice(0);
      let copy2 = [];
      copy.pop();
      for (let i = 0; i < inputArr.length; i++) {
        if (i !== key) {
          copy2.push(inputArr[i]);
        }
      }
      setInputs(copy);
      setInputArr(copy2);
    }
  };

  // const inputChange = (e: any) => {
  //   let copy = inputArr.slice(0);
  //   console.log(e.key);
  //   // for (let i = 0; i < copy.length; i++) {
  //   //   if (i == e.target.key) {
  //   //     copy[i] == e.target.value;
  //   //   }
  //   // }
  //   setInputArr(copy);
  // };

  const inputReset = () => {
    setInputArr([]);
    setInputs([1]);
  };

  useEffect(() => {
    if (addList) {
      console.log(addList.current);
      if (addList.current)
        addList.current.children[
          addList.current.children.length - 3
        ].children[0].focus();
    }
  }, [inputs]);

  // useEffect(()=> {
  //   fillIn()
  // }, [data])

  return (
    <$Container>
      {modal && (
        <div
          ref={addList}
          style={{
            transform: 'translate(-50%, -70%)',
            width: '400px',
            height: '400px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px',
            // justifyContent: 'center',
          }}
          onClick={(e) => modalOn(e)}
        >
          {inputs.map((x, i) => {
            return (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  margin: '10px',
                }}
              >
                <$AddInput
                  value={inputArr[i]}
                  placeholder="enter 클릭시 항목추가..."
                  onKeyUp={(e) => {
                    // 다음 input으로 focus 넘기기 추가
                    if (e.key == 'Enter') {
                      if (inputs.length >= users) {
                        alert('유저 수 이상으로 추가할 수 없습니다');
                        return;
                      }
                      setInputs([...inputs, 1]);
                    }
                  }}
                  onChange={(e) => {
                    const copy = [...inputArr];
                    copy[i] = e.target.value;
                    setInputArr(copy);
                  }}
                ></$AddInput>
                <button
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={() => cancelInputAdd(i)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            );
          })}
          <$CustomButton2 onClick={prizePick}>확인</$CustomButton2>
          <$CustomButton2 onClick={inputReset}>리셋</$CustomButton2>
        </div>
      )}
      <$UpperPlace>
        <$UpperLeft>
          <label htmlFor="user-count">
            <h3>참가자는 몇 명?</h3>
          </label>
          <$UserInput
            type="number"
            id="user-count"
            value={users}
            onChange={(e) => {
              const { value } = e.target;
              if (+value < 0) return;
              setUsers(+value < 10 ? +value : 10);
            }}
          />
        </$UpperLeft>
        <$ButtonPlace>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <$CustomButton onClick={drawBaseLine}>CREATE</$CustomButton>
            <$CustomButton onClick={fillIn}>START</$CustomButton>
          </div>
          {/* <$CustomButton onClick={clearContext}></$CustomButton> */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <$CustomButton onClick={jebiPick}>당첨정하기</$CustomButton>
            <$CustomButton onClick={modalOn}>항목정하기</$CustomButton>
          </div>
        </$ButtonPlace>
      </$UpperPlace>
      {/* <button onClick={() => result(+users)}>result</button> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          // border: '1px solid black',
          marginLeft: ((1 / users) * window.innerWidth * 0.8) / 2,
          marginRight: ((1 / users) * window.innerWidth * 0.8) / 2,
        }}
      >
        {Array.from({ length: users }, (v, i) => i + 1).map((u) => (
          <$Users key={Date.now() * u} onClick={() => tracePath(u - 1)}>
            {u}
          </$Users>
        ))}
      </div>
      <canvas
        style={{ display: 'block', backgroundColor: '#dfccfb' }}
        ref={canvasRef}
        // onMouseDown={startDrawing}
        // onMouseMove={drawing}
        // onMouseUp={finishDrawing}
      ></canvas>

      <div
        ref={prizeRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          // border: '1px solid black',
          marginLeft: ((1 / users) * window.innerWidth * 0.6) / 2,
          marginRight: ((1 / users) * window.innerWidth * 0.6) / 2,
        }}
      >
        {Array.from({ length: users }, (v, i) => i + 1).map((u, idx) => {
          return jebi.includes(u - 1) ? (
            <$Destination
              key={Date.now() * u}
              value="WIN!"
              style={{ maxWidth: 43 }}
              readOnly
            />
          ) : inputArr.length > 0 ? (
            <$Destination
              key={Date.now() * u}
              value={inputArr[idx]}
              style={{ maxWidth: 43 }}
              readOnly
            />
          ) : (
            <$Destination
              key={Date.now() * u}
              style={{ maxWidth: 43 }}
              readOnly
            />
          );
        })}
      </div>
      <br></br>
    </$Container>
  );
};

export default Ladders;
