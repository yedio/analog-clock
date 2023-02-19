import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ToolTip from './ToolTip';

export default function Clock() {
  const clockArr = Array(12)
    .fill(undefined)
    .map((v, i) => i + 1);

  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  const hourAngle = (hour + min / 60) * 30;
  const minAngle = min * 6;
  const secAngle = sec * 6;

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'OPEN',
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    dispatch({
      type: 'MOVE',
      payload: { x, y, text: new Date().toLocaleTimeString() },
    });
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: 'CLOSE',
    });
  };

  return (
    <ClockWrap
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
    >
      <HourHand hourAngle={hourAngle} />
      <MinHand minAngle={minAngle} />
      <SecHand secAngle={secAngle} />
      <ClockCenter />

      {clockArr.map((num: number, idx: number) => (
        <ClockNum key={idx} className={`num_${num}`}>
          {num}
        </ClockNum>
      ))}

      <ToolTip />
    </ClockWrap>
  );
}

const ClockWrap = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  outline: 10px solid ${({ theme }) => theme.color.main};
`;

const ClockCenter = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.color.dark};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Hand = styled.div`
  position: absolute;
  transform-origin: bottom;
`;

const HourHand = styled(Hand)<{ hourAngle: number }>`
  width: 6px;
  height: 60px;
  top: 30%;
  left: 49%;
  background: ${({ theme }) => theme.color.dark};
  transform: ${props => `rotate(${props.hourAngle}deg)`};
`;

const MinHand = styled(Hand)<{ minAngle: number }>`
  width: 4px;
  height: 80px;
  top: 22.5%;
  left: 49%;
  background: ${({ theme }) => theme.color.dark};
  transform: ${props => `rotate(${props.minAngle}deg)`};
`;

const SecHand = styled(Hand)<{ secAngle: number }>`
  width: 2px;
  height: 118px;
  top: 10.5%;
  left: 50%;
  background: red;
  transform: ${props => `rotate(${props.secAngle}deg)`};
`;

const ClockNum = styled.span`
  position: absolute;
  font-size: 24px;
  text-align: center;

  &.num_1 {
    top: 10%;
    right: 26%;
  }

  &.num_2 {
    top: 25%;
    right: 10%;
  }

  &.num_3 {
    right: 10px;
    top: 46%;
  }

  &.num_4 {
    right: 30px;
    top: 67%;
  }

  &.num_5 {
    right: 78px;
    top: 82%;
  }

  &.num_6 {
    bottom: 10px;
    left: 48%;
  }

  &.num_7 {
    left: 80px;
    top: 82%;
  }

  &.num_8 {
    left: 30px;
    top: 67%;
  }

  &.num_9 {
    left: 10px;
    top: 46%;
  }

  &.num_10 {
    top: 25%;
    left: 10%;
  }

  &.num_11 {
    top: 10%;
    left: 26%;
  }

  &.num_12 {
    top: 10px;
    left: 46%;
  }
`;
