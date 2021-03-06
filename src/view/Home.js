import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { HeartFilled } from '@ant-design/icons';

const StoryList = (props) => {
  return props.stories.map(s => {
    return <StoryCard story={s} key={s._id}/>
  })
}

const StoryCard = (props) => {
  return <div>
    <div>{props.story.title}</div>
    <div>{props.story.subtitle}</div>
    <HeartFilled />
    {props.story.bayid}
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
      setStories(res.data.data)
    })
  }

  return (
    <div className="Home">
      <StoryList stories={stories}/>
    </div>
  );
}

export default Home;
