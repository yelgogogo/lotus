import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import Img from '../component/Img'
import styles from './StoryFullCard.module.css'

const Likes = (props) => {
  return <div className={styles["likes-container"]}>
    <div>他们觉得很赞</div>
    <div className={styles["likes-box"]}>
      {
        props.likes && props.likes.map(l => {
          return <div className={styles["likes-item"]} key={l.id}>
            <Img className={styles["likes-avatar"]} src={l.avatar} alt=""/>
            <div className={styles["likes-name"]}>{l.nickname}</div>
          </div>
        })
      }
    </div>
  </div>
}

const Comments = (props) => {
  return <div className={styles["comment-container"]}>
    <div className={styles["comment-area"]}>留言板</div>
    {
      props.comments && props.comments.map((c, i) => {
        return <div className={styles["comment-box"]} key={i}>
          <div className={styles["comment-left"]}>
            <Img className={styles["comment-avatar"]} src={c.avatar} alt=""/>
          </div>
          <div className={styles["comment-right"]}>
            <div className={styles["comment-name"]}>
              {c.role}
            </div>
            <div className={styles["comment-time"]}>
              {c.starttime}
            </div>
            {c.comment}
          </div>
        </div>
      })
    }
  </div>
}

const StoryFullCard = (props) => {
  console.log('StoryFullCard', props)
  const { title, id, role, subcontents, cover, comments, description, likes, starttime, visitors, avatar } = props.story
  return <div className={styles["card-box"]}>
    {/* {avatar && <img className={styles["card-avatar" src={imgPath(avatar)} alt=""/>} */}
    <div className={styles["card-header"]}>
      <div className={styles["card-date"]}>{starttime}</div>
    </div>
    <div className={styles["card-title"]}>{title}</div>
    {/* <div>{role}</div> */}
    { cover && <Img className={styles["card-cover"]} src={cover} alt=""/> }
    <div className={styles["card-content"]}>{description}</div>
    { subcontents && subcontents.length > 0 && subcontents.map( (s,i) => <div key={i}>
        <Img className={styles["card-cover"]} src={s.illustration} alt=""/>
        {s.content}
      </div>)
    }
    {/* <EyeOutlined /> */}
    <div className={styles["card-footer"]}>
      <div>{visitors && `${visitors.length}阅读`}</div>
      <div className={styles["card-footer-right"]}>
        <div className={styles["card-like"]}>
          <HeartFilled /><div>&nbsp;赞</div>
        </div>
        <div>评论</div>
      </div>
    </div>
    <Likes likes={likes}/>
    <Comments comments={comments} />
  </div>
}

export default StoryFullCard