import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { HeartFilled, EyeOutlined } from '@ant-design/icons';

const StoryList = (props) => {
  return props.stories.map(s => {
    return <StoryCard story={s} key={s._id}/>
  })
}

const StoryCard = (props) => {
  const { title, subtitle, likes, starttime, visitors } = props.story
  return <div>
    <div>{title}</div>
    <div>{subtitle}</div>
    <div>{starttime}</div>
    <EyeOutlined />
    <div>{visitors && visitors.length}</div>
    <div>{likes && likes.length}</div>
    <HeartFilled />
  </div>
}

const Home = () => {
  const [stories, setStories] = useState([])

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    Service.get('/story').then(res => {
      console.log('res', res.data.data[100])
      setStories(res.data.data.filter(r => r.bayid === 2))
    })
  }

  return (
    <div className="Home">
      <StoryList stories={stories}/>
    </div>
  );
}

export default Home;
