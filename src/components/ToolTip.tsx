import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../types/reducer';

export default function ToolTip() {
  const tooltipInfo = useSelector((state: RootState) => state.tooltipReducer);

  return (
    <TooltipWrap
      className={tooltipInfo.open ? 'on' : ''}
      position={tooltipInfo.position}
    >
      <TooltipTextWrap>
        <TooltipText>{tooltipInfo.text}</TooltipText>
      </TooltipTextWrap>
    </TooltipWrap>
  );
}

const TooltipWrap = styled.div<{ position: { x: number; y: number } }>`
  display: none;
  position: fixed;
  width: fit-content;
  top: ${props => `${props.position.y + 25}px`};
  left: ${props => `${props.position.x - 5}px`};
  z-index: 10;

  &.on {
    display: inline-block;
  }
`;

const TooltipTextWrap = styled.div`
  display: inline-block;
  position: absolute;
  bottom: 29px;
  left: -10px;
  padding: 9px 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.color.dark};
  border-radius: 4px;
  white-space: nowrap;

  &:after {
    border-top: 5px solid ${({ theme }) => theme.color.dark};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 0px solid transparent;
    content: '';
    position: absolute;
    bottom: -4px;
    left: 15px;
  }
`;

const TooltipText = styled.p`
  font-size: 13px;
  font-weight: 200;
  line-height: 18px;
  color: #fff;
`;
