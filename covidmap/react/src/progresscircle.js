import React from "react";
import CircularProgress from "../node_modules/material-ui/CircularProgress";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCircularProgress = styled(CircularProgress).attrs({})`
  position: absolute !important;
  circle {
    transform-origin: 50%;
    transform: rotate(-90deg);
    transition: all 0s !important;
  }
`;

const ProgressText = styled.div.attrs({
  bg: props => props.backgroundColor || "transparent"
})`
  background-color: ${props => props.bg};
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
`;
const ProgressValue = styled.div`
  font-size: 1em;
  font-family: sans-serif;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
`;
const ProgressCircle = ({
  progress,
  size,
  onResize,
  thickness,
  styles,
  displayBackground,
  displayText
}) => {
  const prog = Math.round(progress);
  const value = progress > 0 ? prog + "%" : "";
  const textStyle0 = { ...styles.textStyle };
  textStyle0.opacity = 0;
  const textStyle = displayText ? styles.textStyle : textStyle0;

  return (
    <div>
      <StyledCircularProgress
        size={size}
        thickness={thickness}
        value={prog}
        mode="determinate"
      />

      <ProgressText
        backgroundColor={
          displayBackground ? styles.backgroundColor : "transparent"
        }
        style={{
          lineHeight: size + "px",
          textAlign: "center",
          verticalAlign: "middle",
          width: size,
          height: size
        }}
      >
        <ProgressValue style={textStyle}>{value}</ProgressValue>
      </ProgressText>
    </div>
  );
};

ProgressCircle.propTypes = {
  progress: PropTypes.number,
  size: PropTypes.number,
  onResize: PropTypes.func,
  thickness: PropTypes.number,
  styles: PropTypes.object,
  displayText: PropTypes.bool,
  displayBackground: PropTypes.bool
};

ProgressCircle.defaultProps = {
  progress: 0,
  size: 100,
  thickness: 10,
  styles: {},
  displayText: true,
  displayBackground: true
};


export default ProgressCircle;
