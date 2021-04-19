import Img from './Img'
import styles from './UserCard.module.css'

const UserCard = (props) => {
  return <div className={styles["user-box"]} {...props}>
    <div className={styles["user-info"]}>
      <Img className={styles["user-avatar"]} src={props.user.avatar} />
      <div>&nbsp;&nbsp;{props.user.name}</div>
    </div>
    <div className={styles["user-sign"]}>
      <span className={styles["user-text-plus"]}>+</span> <span className={styles["user-text"]}>助力</span>
    </div>
  </div>
}

export default UserCard