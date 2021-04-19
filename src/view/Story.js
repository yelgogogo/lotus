import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Story.module.css'
import StoryFullCard from '../component/StoryFullCard'
import UserCard from '../component/UserCard'

const getQueryId = (txt) => {
  return txt.replace('?id=', '')
}

const Story = (props) => {
  const [story, setStory] = useState(null)
  const [user, setUser] = useState({})
  const location = useLocation()
  useEffect(() => {
    console.log(props)
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

  const goBack = () => {
    props.history.go(-1)
  }
  return <div className={styles["story-page"]}>
    {<UserCard user={user} />}
    <div className={styles["story-user"]}>&nbsp;</div>
    {story && <StoryFullCard story={story}/>}
  </div>
}

export default Story