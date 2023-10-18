import styled from 'styled-components';
import { useRef, useEffect, useState } from 'react';

interface Team {
  name: string;
}

interface TeamNode {
  team: Team;
  left?: TeamNode;
  right?: TeamNode;
}

const $Container = styled.div`
  width: 100%;
  height: 90vh;
  max-height: 100%;
  background-color: purple;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const $ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
`;
const $Field = styled.div`
  width: 95vw;
  height: 450px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Tournament = (): any => {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [radi, setRadi] = useState(1);
  const [root, setRoot] = useState<TeamNode>({
    team: { name: 'Champion Team' },
  });
  const [copied, setCopied] = useState<number[]>([]);
  const [testCanvas, setTestCanvas] = useState<any>(null);
  const [testpath, setTestpath] = useState<any>(null);
  const [pathState, setPathState] = useState<any>([]);
  let testArr: any = [];
  let count = 0;
  let path1: any;
  let pathRecorder: any = [];
  const createTournament = (e: number): any => {
    let num = e;
    if (num == 4) setRadi(24);
    else if (num == 8) setRadi(20);
    else if (num == 16) setRadi(16);
    else if (num == 32) setRadi(12);
    else if (num == 64) setRadi(8);
    else if (num == 128) setRadi(4);

    let masterDepth = Math.log2(num);
    let idArr: number[] = [];
    for (let i = 1; i <= num * 2; i++) {
      idArr.push(i);
    }
    let copy: number[] = idArr.slice(0);
    setCopied(copy);
    function createBinaryTree(depth: number): any {
      if (depth === 0) {
        return { team: { name: idArr.shift() } };
      }

      return {
        team: { name: idArr.shift() },
        left: createBinaryTree(depth - 1),
        right: createBinaryTree(depth - 1),
      };
    }
    setRoot(createBinaryTree(masterDepth));
  };

  const drawGraph = (
    context: CanvasRenderingContext2D,
    node: TeamNode,
    x: number,
    y: number,
    horizontalSpacing: number,
    verticalSpacing: number,
    circleRadius: number,
  ) => {
    if (!node) return;

    // 왼쪽 자식 노드 그리기
    if (node.left) {
      const childX = x - horizontalSpacing;
      const childY = y + verticalSpacing;

      // 선 그리기
      context.beginPath();
      context.moveTo(x, y + circleRadius);
      context.lineTo(childX, childY - circleRadius);
      context.strokeStyle = 'gray'; // 파란색 선
      context.lineWidth = 2; // 선의 두께
      context.stroke();

      drawGraph(
        context,
        node.left,
        childX,
        childY,
        horizontalSpacing / 2,
        verticalSpacing,
        circleRadius,
      );
    }

    // 오른쪽 자식 노드 그리기
    if (node.right) {
      const childX = x + horizontalSpacing;
      const childY = y + verticalSpacing;

      // 선 그리기
      context.beginPath();
      context.moveTo(x, y + circleRadius);
      context.lineTo(childX, childY - circleRadius);
      context.strokeStyle = 'gray'; // 파란색 선
      context.lineWidth = 2; // 선의 두께
      context.stroke();

      drawGraph(
        context,
        node.right,
        childX,
        childY,
        horizontalSpacing / 2,
        verticalSpacing,
        circleRadius,
      );
    }

    // 현재 노드 그리기
    context.beginPath();
    context.arc(x, y, circleRadius, 0, Math.PI * 2);
    context.fillStyle = 'gray';
    context.fill();
    setTestCanvas(context);
    console.log(x);
    console.log(y);
    console.log(context.isPointInPath(x, y));

    // path1 = new Path2D();
    // path1.arc(x, y, circleRadius, 0, Math.PI * 2);
    // context.fillStyle = 'gray';
    // setTestpath(path1);
    // context.fill(path1);
    // console.log(path1);

    if (!node.left && !node.right) {
      let changer = testArr.shift();
      let obj = {
        name: changer,
        x: x,
        y: y,
      };
      context.font = `${radi}px Arial`;
      context.fillStyle = 'white';
      pathRecorder.push(obj);
      setPathState(pathRecorder);
      if (radi == 4) context.fillText(changer, x - 8, y + 3);
      else if (radi == 8) context.fillText(changer, x - 6, y + 3);
      else if (radi == 12) context.fillText(changer, x - 8, y + 3);
      else if (radi == 16) context.fillText(changer, x - 8, y + 3);
      else if (radi == 20) context.fillText(changer, x - 8, y + 3);
      else if (radi == 24) context.fillText(changer, x - 8, y + 3);
      setTestCanvas(context);
      console.log(context.isPointInPath(x, y));
    }
  };

  useEffect(() => {
    if (radi > 1) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setTestCanvas(context);
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          const horizontalSpacing = 350; // 가로 간격
          const verticalSpacing = 50; // 수직 간격
          const circleRadius = radi; // 노드 크기

          // // 화면 크기에 따라 그래프 크기 조절
          // canvas.width = windowSize.width - 20; // 화면 너비에서 20px 빼기
          // canvas.height = windowSize.height - 20; // 화면 높이에서 20px 빼기

          testArr = [];
          for (let i = 1; i <= copied.length; i++) {
            testArr.push(i);
          }
          drawGraph(
            context,
            root,
            canvas.width / 2,
            50,
            horizontalSpacing,
            verticalSpacing,
            circleRadius,
          );

          placeFinder(context);
        }
      }
    }
  }, [root]);

  const put = (event: any) => {
    console.log(event.pageX);
    console.log(event.pageY);
    console.log(pathState);
    console.log(testCanvas);
    console.log(pathState[0].x);
    if (testCanvas.isPointInPath(pathState[3].x, pathState[3].y)) {
      alert('in circle');
    } else {
      alert('out circle');
    }
  };

  const placeFinder = (ctx: any) => {};
  return (
    <$Container>
      <$ButtonBox>
        <h4>인원수 기준으로 생성</h4>
        <div>
          <button
            onClick={() => {
              createTournament(4);
            }}
          >
            4
          </button>
          <button
            onClick={() => {
              createTournament(8);
            }}
          >
            8
          </button>
          <button
            onClick={() => {
              createTournament(16);
            }}
          >
            16
          </button>
          <button
            onClick={() => {
              createTournament(32);
            }}
          >
            32
          </button>
          <button
            onClick={() => {
              createTournament(64);
            }}
          >
            64
          </button>
          <button
            onClick={() => {
              createTournament(128);
            }}
          >
            128
          </button>
        </div>
        <button>n강 기준으로 생성 </button>
      </$ButtonBox>
      <$Field>
        <canvas onClick={put} ref={canvasRef} width={1400} height={500} />
      </$Field>
    </$Container>
  );
};

export default Tournament;
