/* eslint-disable react/prop-types */
import styles from "./Content.module.css"

const Content = ({src}) => {
  return (
    <div className={styles.content}>
    <iframe
      className={styles.frame}
      title="spas major"
      src={src}
      frameBorder="0"
      allowFullScreen="true"
    ></iframe>
  </div>
  )
}

export default Content