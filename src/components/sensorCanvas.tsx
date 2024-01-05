interface SensorCanvasProps {
  sizeX: number;
  sizeY: number;
  scale: number;
}

const sensorStyle: any = {
  canvas: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  square: {
    width: "100%",
    height: "100%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "#f0f0f0",
    position: "absolute",
    border: "3px solid",
    overflow: "hidden",
  },
  textSizeX: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%,-100%)",
  },
  textSizeY: {
    position: "absolute",
    transformOrigin: "top left",
    top: "50%",
    transform: "rotate(-90deg) translate(-50%,-100%)",
  },
  textSquare: {
    position: "absolute",
    bottom: "0px",
  },
  diagonal: {
    width: "calc(100px * sqrt(2))",
    borderTop: "3px solid",
    position: "absolute",
    top: "-5px",
    left: "-3px",
    transformOrigin: "top left",
  },
  textDiagonal: {
    position: "absolute",
    transformOrigin: "top left",
    left: "50%",
    transform: "translate(-50%, 0)",
  }
}

export function SensorCanvas(props: SensorCanvasProps) {
  const scale = props.scale ?? 200;
  const sizeX = props.sizeX, sizeY = props.sizeY;

  const aspectRatioX = sizeX > sizeY ? (sizeX / sizeY) : 1;
  const aspectRatioY = sizeX < sizeY ? (sizeY / sizeX) : 1;
  const aspectRatio = aspectRatioX > aspectRatioY ? aspectRatioX : aspectRatioY;

  const diagonalAngle = Math.atan(sizeY / sizeX) * 180 / Math.PI;
  const diagonalLength = Math.sqrt(((scale / aspectRatioX) * (scale / aspectRatioX)) + ((scale / aspectRatioY) * (scale / aspectRatioY)));

  sensorStyle.canvas.width = (scale * aspectRatioX) / aspectRatio;
  sensorStyle.canvas.height = (scale * aspectRatioY) / aspectRatio;
  sensorStyle.diagonal.transform = `rotate(${diagonalAngle}deg)`
  sensorStyle.diagonal.width = diagonalLength;

  return (
    <div style={sensorStyle.canvas}>
      <div style={sensorStyle.square}>
        <div style={sensorStyle.diagonal}>
          <div style={sensorStyle.textDiagonal}>{Math.sqrt((sizeX * sizeX) + (sizeY * sizeY)).toFixed(2)}mm</div>
        </div>
        <div style={sensorStyle.textSquare}>S = {(sizeX * sizeY / 100).toFixed(2)}cm²</div>
      </div>
      <div style={sensorStyle.textSizeX}>{sizeX ?? "?"}mm</div>
      <div style={sensorStyle.textSizeY}>{sizeY ?? "?"}mm</div>
    </div>
  )
}