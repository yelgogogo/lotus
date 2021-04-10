import Service from '../lib/service'
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import { throttle } from 'lodash'
import Img from '../component/Img'
import StoryFullCard from '../component/StoryFullCard'
import styles from './Home.module.css'

const StoryList = (props) => {
  
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
  return <div className={styles["card-box"]}>
    <div className={styles["card-header"]}>
      <div className={styles["card-date"]}>{starttime}</div>
      <div className={styles["card-like"]}>
        <HeartFilled /><div>&nbsp;{likes && likes.length}</div>
      </div>

    </div>
    <div className={styles["card-title"]}>{title}</div>
    {cover && <div className={styles["card-cover-box"]}>
      <Img className={styles["card-cover"]} src={props.i < 3 ? cover : ""} lazysrc={cover} alt=""/>
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

const Home = () => {
  const [stories, setStories] = useState([])
  const [story, setStory] = useState({})
  const [showModal, setShowModal] = useState('')

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
    Service.get('/story', {
      params: {
        bayid: 2
      }
    }).then(res => {
      console.log('res', res.data.data[100])
      setStories(res.data.data)
    })
  }

  const expandStory = (id) => {

    window.homeRef = homeRef
    homeRef.current.overflowY = 'hidden'
    console.log('homeRef', homeRef)
    console.log('expandStory', id)
    Service.get('/storybyid', {
      params: {
        id
      }
    }).then(res => {
      console.log('expandStory', res.data.data)
      setStory(res.data.data)
      setShowModal('StoryFullCard')
    })
  }
  const shrinkCard = () => {
    homeRef.current.overflowY = 'scroll'
    setStory({})
    setShowModal('')
  }

  const homeRef = useRef();

  return (
    <div className={styles["home"]} ref={homeRef} style={{overflowY: 'auto'}}>
      <StoryList stories={stories} expand={expandStory}/>
      {showModal && <div className={styles["modal"]}>
        { showModal === 'StoryFullCard' && <StoryFullCard story={story}/>}
        <div onClick={shrinkCard}>返回</div>
      </div>}
    </div>
  );
}

export default Home