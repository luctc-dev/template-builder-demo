import styled from 'styled-components';

export const StyledApp = styled.div`
  padding-top: 20px;
  min-width: 1200px;
  background-color: #f6f6f6;
`

export const StyledHead = styled.div`
  padding-left: 20px;
`

export const StyledBuilderWrap = styled.div`
  height: calc(100vh - 55px);
  margin: 2px;
`

export const StyledPreviewIframe = styled.div`
  position: relative;

  iframe {
    margin: 0 auto;
    display: block;
    position: relative;
    z-index: 1;
    top: 0;
    left: 0px;
  }
  svg {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
  }

  &.mobile-view {
    padding-top: 60px;
    iframe {
      border: 1px solid #c3c3c3;
    }
  }
`;