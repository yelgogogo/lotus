import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import Img from '../component/Img'
import styles from './Story.module.css'

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
      props.comments && props.comments.map(c => {
        return <div className={styles["comment-box"]}>
          <div className={styles["comment-left"]}>
          <Img className={styles["comment-avatar"]} src={c.avatar} alt=""/>
            {c.role}
          </div>
          <div className={styles["comment-right"]}>
            {c.comment}
            <div className={styles["comment-time"]}>
              {c.starttime}
            </div>
          </div>
        </div>
      })
    }
  </div>
}

const StoryPageCard = (props) => {
  const { title, id, role, cover, comments, description, likes, starttime, visitors, avatar } = props.story
  return <div className={styles["card-box"]}>
    {/* {avatar && <img className={styles["card-avatar" src={imgPath(avatar)} alt=""/>} */}
    <div className={styles["card-header"]}>
      <div className={styles["card-date"]}>{starttime}</div>
    </div>
    <div className={styles["card-title"]}>{title}</div>
    {/* <div>{role}</div> */}
    {cover && <Img className={styles["card-cover"]} src={cover} alt=""/>}
    <div className={styles["card-content"]}>{description}</div>
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

const getQueryId = (txt) => {
  return txt.replace('?id=', '')
}

const Story = (props) => {
  const [story, setStory] = useState(null)
  useEffect(() => {
    console.log(props)
    getData()
  }, [])
  
  const getData = () => {
    Service.get('/storybyid', {
      params: {
        id: getQueryId(props.location.search)
      }
    }).then(res => {
      console.log('res', res.data.data)
      setStory(res.data.data)
    })
  }

  const goBack = () => {
    props.history.go(-1)
  }
  return <div className={styles["story-page"]}>
    <div onClick={goBack}>{'<'} 返回</div>
    {story && <StoryPageCard story={story}/>}
  </div>
}

export default withRouter(Story)