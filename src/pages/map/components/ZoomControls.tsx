import { useControls } from "react-zoom-pan-pinch";
import styled from "styled-components";

const ANIMATION = 250;

export default function ZoomControls() {
  const { zoomIn, zoomOut, fitToView } = useControls();

  return (
    <Group>
      <Control type="button" onClick={() => zoomOut(0.5, ANIMATION)} aria-label="축소">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M2 7h10" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </Control>
      <Control type="button" onClick={() => zoomIn(0.5, ANIMATION)} aria-label="확대">
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path d="M2 7h10M7 2v10" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </Control>
      <Control type="button" onClick={() => fitToView({ animationTime: ANIMATION })} aria-label="도면 전체 보기">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
          <path d="M1 6V1h5M12 1h5v5M17 12v5h-5M6 17H1v-5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </Control>
    </Group>
  );
}

const Group = styled.div`
  position: absolute;
  left: 20px;
  bottom: 12px;
  z-index: 1;
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.stroke.control};
  background: ${({ theme }) => theme.colors.bg.page};
`;

const Control = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  background: none;
  color: ${({ theme }) => theme.colors.stroke.control};

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.stroke.control};
  }
`;
