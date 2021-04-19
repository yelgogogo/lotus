import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Img from '../component/Img'
import styles from './StoryCardList.module.css'

const StoryCardList = (props) => {
  
  return props.stories.map((s, i) => {
    return <StoryCard i={i} story={s} key={s._id} expand={props.expand}/>
  })
}

const StoryCard = (props) => {
  const { title, id, role, cover, subtitle, likes, starttime, visitors, avatar } = props.story
  const history = useHistory();
  const goToStory = () => {
    return history.push(`/story?id=${id}`)
  }
  const [imgSrc, setImgSrc] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgSrc(cover)
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return <div className={styles["card-box"]}>
    <div className={styles["card-header"]}>
      <div className={styles["card-date"]}>{starttime}</div>
      <div className={styles["card-like"]}>
        <HeartFilled /><div>&nbsp;{likes && likes.length}</div>
      </div>

    </div>
    <div className={styles["card-title"]}>{title}</div>
    {cover && <div className={styles["card-cover-box"]}>
      <Img className={styles["card-cover"]} src={imgSrc} alt=""/>
    </div>}
    <div className={styles["card-content"]}>{subtitle}</div>
    <div className={styles["card-footer"]}>
      <div  onClick={() => props.expand(id)}>
        展开
      </div>
      <div onClick={goToStory}>
        链接
      </div>
    </div>
  </div>
}

export default StoryCardList