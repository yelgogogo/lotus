import styles from './ReaderIcon.module.css'
import Img from '../component/Img'


const ReaderIcon = (props) => {
  const { nickname, avatar } = props.reader
  return <div className={styles["reader-main"]} >
    <div className={styles["reader-box"]}>
      <Img src={avatar} className={styles["reader-avatar"]} onClick={props.onIconClick}/>
      {/* <div className={styles["reader-name"]} style={{display: props.expand ? '' : 'none'}}>{nickname}</div> */}
      <div className={styles["reader-actions"]} style={{display: props.expand ? '' : 'none'}}>{props.actions}</div>
    </div>
  </div>
}

export default ReaderIcon