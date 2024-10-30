import styles from "./aesthetic_shape.module.scss";

const AestheticShape = ({
  leftColour = "darkred",
  rightColour = "red",
  flip = false,
  offset = "0px",
}) => {
  return (
    <div
      className={styles.aesthetic}
      style={{ transform: flip ? "scale(-1, 1)" : "", bottom: offset }}
    >
      <span className={styles.shape1} style={{ background: leftColour }}></span>
      <span className={styles.shape2} style={{ background: leftColour }}></span>
      <span
        className={styles.shape3}
        style={{ background: rightColour }}
      ></span>
      <span
        className={styles.shape4}
        style={{ background: rightColour }}
      ></span>
      <span className={styles.shape5} style={{ background: leftColour }}></span>
      <span
        className={styles.shape6}
        style={{ background: rightColour }}
      ></span>
    </div>
  );
};

export default AestheticShape;
