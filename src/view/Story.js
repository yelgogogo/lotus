import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Story.module.css'
import StoryFullCard from '../component/StoryFullCard'

const getQueryId = (txt) => {
  return txt.replace('?id=', '')
}

const Story = (props) => {
  const [story, setStory] = useState(null)
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
    })
  }

  const goBack = () => {
    props.history.go(-1)
  }
  return <div className={styles["story-page"]}>
    {story && <StoryFullCard story={story}/>}
  </div>
}

export default Story