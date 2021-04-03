import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { HeartFilled, EyeOutlined } from '@ant-design/icons';
import { imgPath } from '../lib/util'
import { throttle } from 'lodash'
import Img from '../component/Img'
import './Home.css'

const StoryList = (props) => {
  return props.stories.map((s, i) => {
    return <StoryCard i={i} story={s} key={s._id}/>
  })
}

const StoryCard = (props) => {
  const { title, role, cover, subtitle, likes, starttime, visitors, avatar } = props.story
  return <div className="card-box">
    {/* {avatar && <img className="card-avatar" src={imgPath(avatar)} alt=""/>} */}
    <div className="card-header">
      <div className="card-date">{starttime}</div>
      <div className="card-like">
      <HeartFilled /><div>&nbsp;{likes && likes.length}</div>
      </div>
    </div>
    <div className="card-title">{title}</div>
    {/* <div>{role}</div> */}
    {cover && <Img className="card-cover" src={props.i < 3 ? cover : ""} lazySrc={cover} alt=""/>}
    <div className="card-content">{subtitle}</div>
    {/* <EyeOutlined /> */}
    {/* <div>{visitors && visitors.length}</div> */}
  </div>
}

const Home = () => {
  const [stories, setStories] = useState([])

  useEffect(() => {
    // throttl 是js节流函数，具体请参考lodash.js工具库
    window.addEventListener('scroll', throttle(checkAllImags));
    return () => {
      window.removeEventListener('scroll', throttle(checkAllImags));
    }
  }, []);

  const isInClietn = (el) => {
    // 获取元素
    // 获取元素具体视窗的距离
    let { top, right, bottom, left } = el.getBoundingClientRect();
    // 浏览器窗口
    let clientHeight = window.innerHeight;
    let clientWidth = window.innerWidth;
    return !(top > clientHeight || bottom < 0 || left > clientWidth || right < 0);
  };

  const checkAllImags = () => {
    const imgs = document.querySelectorAll('img');
    let index = 0;
    Array.from(imgs).map((item, inx) => {
      if (isInClietn(item) && inx > index) {
        item.src = item.getAttribute('lazysrc');
        index = inx + 1;
      }
    });
  };

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
    <div className="home">
      <StoryList stories={stories}/>
    </div>
  );
}

export default Home;
