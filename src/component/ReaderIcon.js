import styles from './ReaderIcon.module.css'
import Img from '../component/Img'


const ReaderIcon = (props) => {
  const { nickname, avatar } = props.reader
  return <div className={styles["reader-main"]}>
    <div className={styles["reader-box"]}>
      <Img src={avatar} className={styles["reader-avatar"]}/>
      <div className={styles["reader-name"]}>{nickname}</div>
    </div>
  </div>
}

export default ReaderIcon