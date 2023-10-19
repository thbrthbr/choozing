import styled from 'styled-components';
import react, { useEffect, useState, useRef } from 'react';
import Crown from '../img/crown.png';
import Picker from '../img/picker.png';
import axios from 'axios';
import { toPng } from 'html-to-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';

const imageContext = require.context(
  '../img/sample',
  false,
  /\.(jpg|jpeg|png|webp)$/,
);
const categoryData = imageContext.keys().map(imageContext);

const $TierContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const $TierBox = styled.div`
  width: 80vw;
  min-height: 20vh;
`;

const $TierThread = styled.div`
  display: flex;
  height: 20vh;
  border: 1px black solid;
  overflow-x: auto;
  background-color: white;
  &::-webkit-scrollbar {
    width: 2px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const $TierSet = styled.div`
  display: flex;
  flex-direction: column;
`;

const $TierLine = styled.div`
  width: 100%;
  min-height: 20vh;
  border: 1px black solid;
  background-color: white;
  /* flex-wrap: wrap; */
  display: flex;
`;

const $TierHead = styled.div<{ props: any; color: any }>`
  background-color: ${(props: any) => {
    return props.props[props.color % 7];
  }};
  width: 120px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $TierContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  background-color: white;
  /* border: 1px solid red; */
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

const Tiermaker = () => {
  const colorDatabase = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'navy',
    'purple',
  ];
  const [tierList, setTierList] = useState<any>([
    { id: 'new:' + Date.now(), contentArr: [] },
  ]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [previousPlace, setPreviousPlace] = useState('');
  const [showTest, setShowTest] = useState(false);
  const [testArr, setTestArr] = useState<any>([]);
  const [imgSet, setImgSet] = useState<any>([]);

  const draggingItemIndex = useRef(null);
  const draggingOverItemIndex = useRef(null);
  const elementRef = useRef<any>(null);

  const addTier = () => {
    setTierList([...tierList, { id: 'new:' + Date.now(), contentArr: [] }]);
    // setColorCount(colorCount + 1);
  };

  const subTier = (key: any) => {
    const copy = [];
    let dyingList = [];
    for (let i = 0; i < tierList.length; i++) {
      if (i !== key) copy.push(tierList[i]);
      else {
        console.log(tierList[i]);
        for (let j = 0; j < tierList[i].contentArr.length; j++) {
          dyingList.push(tierList[i].contentArr[j].id);
        }
      }
    }
    const saver = [];
    for (let i = 0; i < tierList.length; i++) {
      for (let j = 0; j < tierList[i].contentArr.length; j++) {
        if (dyingList.includes(tierList[i].contentArr[j].id))
          saver.push({
            img: tierList[i].contentArr[j].src,
            id: tierList[i].id,
          });
      }
    }
    setImgSet([...saver, ...imgSet]);
    setTierList(copy);
  };

  const exportElementAsPNG = () => {
    toPng(elementRef.current).then((image) => {
      const link = window.document.createElement('a');
      link.download = 'test.png';
      link.href = image;
      link.click();
    });
  };

  const elementSub = (e: any) => {
    // 요소 삭제는 우클릭 & 모바일에선 꾹 누르기
    e.preventDefault();
    let id = e.currentTarget.id;
    let src = e.currentTarget.src;
    let source = src.split('/');
    let sourceStr = source.splice(3);
    sourceStr = '/' + sourceStr.join('/');

    let save = [];
    for (let i = 0; i < tierList.length; i++) {
      let save2 = [];
      for (let j = 0; j < tierList[i].contentArr.length; j++) {
        if (tierList[i].contentArr[j].id != id)
          save2.push(tierList[i].contentArr[j]);
      }
      save.push({ id: tierList[i].id, contentArr: save2 });
    }

    setImgSet([{ img: sourceStr, id }, ...imgSet]);
    setTierList(save);
  };

  // const onDragEnd = (e: any) => {
  //   // console.log(e.target);
  // };

  // const dragEnter = (e: any) => {
  //   // console.log(e.currentTarget);
  //   // console.log(e.key);
  // };

  const back = (e: any) => {
    let isExsist = [];
    for (let i = 0; i < imgSet.length; i++) {
      isExsist.push(imgSet[i].id);
    }
    if (!isExsist.includes(selectedItem.id)) {
      setImgSet([{ id: selectedItem.id, img: selectedItem.src }, ...imgSet]);
    }
    let bigOne = [];
    let set = tierList.slice(0);
    for (let i = 0; i < set.length; i++) {
      let smallOne = [];
      for (let j = 0; j < set[i].contentArr.length; j++) {
        if (set[i].contentArr[j].id == selectedItem.id) {
          continue;
        } else {
          smallOne.push(set[i].contentArr[j]);
        }
      }
      bigOne.push({ id: set[i].id, contentArr: smallOne });
    }
    setTierList(bigOne);
  };

  const drop = (e: any) => {
    let newData = tierList.slice(0);
    let set = [];
    let changed = false;
    // let movedOne = selectedItem;
    for (let i = 0; i < newData.length; i++) {
      // 드롭하는 티어를 티어리스트에서 고르기
      if (newData[i].id == e.target.id) {
        for (let j = 0; j < newData[i].contentArr.length; j++) {
          // 같은 티어내에서 빈공간에 두는 제자리 이동
          if (newData[i].contentArr[j].id == selectedItem.id) return;
        }
        let save = [...newData[i].contentArr, selectedItem];
        let packager = { ...tierList[i], contentArr: save };
        set.push(packager);
      } else {
        // 드롭하는 티어가 아닌 경우
        // 드롭하는 티어도 아니며 요소 위에다 두는데 그 요소의 부모가 드롭하는 티어의 경우
        if (e.target.parentNode.id == newData[i].id) {
          let flag = true;
          for (let j = 0; j < newData[i].contentArr.length; j++) {
            // 같은 티어 내에서 어떠한 요소 위에 두는데 그게 자신이면 제자리 이동 아니면 서로 이동
            if (newData[i].contentArr[j].id == selectedItem.id) {
              // 이건 해당 티어에 자신이 존재하는지 찾는 것
              let cloner = [...newData[i].contentArr];
              let changer1 = -1;
              let changer2 = -1;
              for (let a = 0; a < cloner.length; a++) {
                if (cloner[a].id == e.target.id) changer1 = a;
                else if (cloner[a].id == selectedItem.id) changer2 = a;
              }
              if (changer1 !== -1 && changer2 !== -1) {
                const tmp = cloner[changer1];
                cloner[changer1] = cloner[changer2];
                cloner[changer2] = tmp;
              }
              let packager = { ...tierList[i], contentArr: cloner };
              set.push(packager);
              flag = false;
              changed = true;
            }
          }
          if (flag === true) {
            let save = [...newData[i].contentArr, selectedItem];
            let packager = { ...tierList[i], contentArr: save };
            set.push(packager);
          }
        } else {
          set.push(newData[i]);
        }
      }
    }
    let bigOne = [];
    for (let i = 0; i < set.length; i++) {
      let smallOne = [];
      for (let j = 0; j < set[i].contentArr.length; j++) {
        if (
          set[i].contentArr[j].id == selectedItem.id &&
          set[i].id == previousPlace &&
          changed == false
        ) {
          continue;
        } else {
          smallOne.push(set[i].contentArr[j]);
        }
      }
      bigOne.push({ id: set[i].id, contentArr: smallOne });
    }
    let set2 = [];
    for (let i = 0; i < imgSet.length; i++) {
      if (imgSet[i].id !== selectedItem.id) {
        set2.push(imgSet[i]);
      }
    }
    setImgSet(set2);
    setTierList(bigOne);
    setSelectedItem('');
    setPreviousPlace('');
  };

  // 한 세이브파일로 저장하는 작업

  const uploader = async (e: any) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('img-upload', e.target.files[i]);
    }
    let res = await axios({
      method: 'POST',
      url: 'http://localhost:8000/img_upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setImgSet([...res.data.data, ...imgSet]);
  };

  const sampleShow = () => {
    setImgSet(
      categoryData.map((x, i) => {
        return { img: x, id: i };
      }),
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#dfccfb',
      }}
    >
      <input
        style={{ display: 'none' }}
        type="file"
        id="img-upload"
        name="img-upload"
        onChange={uploader}
        multiple
      />
      <h1 style={{ textAlign: 'center' }}>
        자신만의 티어표를 만들어보세요{' '}
        <label htmlFor="img-upload" style={{ cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faChartSimple} />
          <span> click </span>
        </label>
        <span
          style={{ fontSize: '8px', cursor: 'pointer' }}
          onClick={sampleShow}
        >
          샘플보기
        </span>
      </h1>

      <$TierContainer>
        <$TierSet>
          <$TierBox>
            <div ref={elementRef}>
              {tierList.map((x: any, i: any) => {
                return (
                  <$TierLine>
                    <$TierHead props={colorDatabase} color={i}>
                      <input
                        value={tierList[i].id.split(':')[0]}
                        onChange={(e) => {
                          const copy = tierList.slice(0);
                          copy[i].id = e.target.value;
                          setTierList(copy);
                        }}
                        type="text"
                        style={{
                          width: '90%',
                          border: 'none',
                          textAlign: 'center',
                          backgroundColor: 'transparent',
                        }}
                      ></input>
                      <button
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                        onClick={() => subTier(i)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </$TierHead>
                    <$TierContents
                      key={i}
                      id={tierList[i].id}
                      onClick={(e) => {
                        console.log(e.target);
                      }}
                      onDrop={(e) => drop(e)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        drop(e);
                      }}
                    >
                      {x.contentArr.map((itemId: any) => {
                        return (
                          <img
                            src={itemId.src}
                            id={itemId.id}
                            style={{
                              width: '120px',
                              height: '120px',
                              cursor: 'pointer',
                            }}
                            onDragStart={(e: any) => {
                              setSelectedItem({
                                id: itemId.id,
                                src: itemId.src,
                              });
                              setPreviousPlace(e.currentTarget.parentNode.id);
                            }}
                            onTouchStart={(e: any) => {
                              setSelectedItem({
                                id: itemId.id,
                                src: itemId.src,
                              });
                              setPreviousPlace(e.currentTarget.parentNode.id);
                            }}
                            onContextMenu={elementSub}
                          ></img>
                        );
                      })}
                    </$TierContents>
                  </$TierLine>
                );
              })}
            </div>
            <$TierThread id={'thread'}>
              {imgSet.map((x: any) => {
                return (
                  <img
                    id={x.id}
                    style={{
                      width: '120px',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    src={x.img}
                    onDragStart={(e: any) => {
                      setSelectedItem({ id: x.id, src: x.img });
                      setPreviousPlace(e.currentTarget.parentNode.id);
                    }}
                    onTouchStart={(e: any) => {
                      setSelectedItem({ id: x.id, src: x.img });
                      setPreviousPlace(e.currentTarget.parentNode.id);
                    }}
                    onDrop={(e) => {
                      back(e);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      back(e);
                    }}
                    draggable
                  ></img>
                );
              })}
            </$TierThread>
          </$TierBox>
        </$TierSet>
        <$CustomButton onClick={addTier}>
          <FontAwesomeIcon icon={faPlus} />
        </$CustomButton>
        <$CustomButton onClick={exportElementAsPNG}>
          <FontAwesomeIcon icon={faSave} />
        </$CustomButton>
      </$TierContainer>
      <br></br>
      <br></br>
    </div>
  );
};

export default Tiermaker;
