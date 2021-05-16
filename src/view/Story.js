import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import { useLocation } from 'react-router-dom';
import styles from './Story.module.css'
import StoryFullCard from '../component/StoryFullCard'
import UserCard from '../component/UserCard'
import ReaderIcon from '../component/ReaderIcon'
import { createLocalUser, NAME, getQueryId } from '../lib/util'
import userImg from '../images/user.jpg'
import moment from 'moment'

const Story = (props) => {
  const [story, setStory] = useState(null)
  const [user, setUser] = useState({})
  const [reader, setReader] = useState({})
  const [readerExpand, setReaderExpand] = useState(true)
  const [comment, setComment] = useState('')
  const [showAddComment, setShowAddComment] = useState(false)

  const location = useLocation()

  const readerClick = () => {
    setReaderExpand(!readerExpand)
  }

  const getBayId = (txt) => {
    return parseInt(txt.replace('?id=', ''))
  }

  const bayid = getBayId(location.search)
  useEffect(() => {
    console.log(props)
    userCheck()
    getData()
  }, [])
  
  const getData = () => {
    Service.get('/storybyid', {
      params: {
        id: getQueryId(location.search)
      }
    }).then(res => {
      console.log('res', res.data.data)
      setStory(res.data.data)
      setUser({
        id: res.data.data.ownerid,
        name: res.data.data.role,
        avatar: res.data.data.avatar
      })
    })
  }

  const openCommentModal = () => {
    setShowAddComment(true)
  }

  const actionButton = (act) => {
    if (act === 'LIKE') {
      return <div className={styles["reader-action"]} onClick={likeStory}>
        <HeartFilled />&nbsp;赞
      </div>
    }
    if (act === 'COMMENT') {
      return <div className={styles["reader-action"]} onClick={openCommentModal}>评论</div>
    }
    return ''
  }

  const likeStory = () => {
    Service.put('/like', {
      id: story.id,
      likes: [{
        ...reader
      }]
    }).then(res => {
      setStory(res.data.data)
    })
  }

  const actions = () => {
    const actionsArray = []
    actionsArray.push('LIKE')
    actionsArray.push('COMMENT') 
    return actionsArray.map(a => {
      return actionButton(a)
    })
  }

  const userCheck = () => {
    const checkUser = localStorage.getItem('user')
    let userShow = ''
    if (!checkUser) {
      userShow = createLocalUser({bayid})
    } else {
      userShow = JSON.parse(checkUser)
    }
    const reg = /.*的/
    if (!userShow.avatar) {
      if (NAME.includes(userShow.nickname.replace(reg, ''))) {
        userShow.avatar = '/uploads/avatar/' + userShow.nickname.replace(reg, '') + '.jpg'
        localStorage.setItem('user', JSON.stringify(userShow))
      }
    }
    setReader({
      id: userShow.id,
      nickname: userShow.nickname,
      avatar: userShow.avatar ? userShow.avatar : userImg
    })
  }

  const goBack = () => {
    props.history.go(-1)
  }
  const onContentChange = (e) => {
    setComment(e)
  }
  const onSubmit = () => {
    const obj = {
      "ownerid": reader.id,
      "role": reader.nickname,
      "avatar": reader.avatar,
      "storyid": story.id,
      "comment": comment,
      "starttime": moment().utc().format(),
      "id": story.bayid,
    }
    Service.post('/comment', obj).then(res => {
      setStory(res.data.data)
      setShowAddComment(false)
    })
  }

  return <div className={styles["story-page"]}>
    {<UserCard user={user} />}
    <div className={styles["story-user"]}>&nbsp;</div>
    {story && <StoryFullCard story={story}/>}
    <ReaderIcon
      show={showAddComment}
      actions={actions()}
      reader={reader}
      onContentChange={onContentChange}
      onSubmit={onSubmit}
      expand={readerExpand} onIconClick={readerClick}/>
  </div>
}

export default Story