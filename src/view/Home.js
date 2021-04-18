import Service from '../lib/service'
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import { throttle } from 'lodash'
import Img from '../component/Img'
import StoryFullCard from '../component/StoryFullCard'
import styles from './Home.module.css'

const CARD_HEIGHT = 566 + 20
const USER_HEIGHT = 65

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

const UserCard = (props) => {
  return <div className={styles["user-box"]} {...props}>
    <div className={styles["user-info"]}>
      <Img className={styles["user-avatar"]} src={props.user.avatar} />
      <div>&nbsp;&nbsp;{props.user.name}</div>
    </div>
    <div className={styles["user-sign"]}>
      <span className={styles["user-text-plus"]}>+</span> <span className={styles["user-text"]}>助力</span>
    </div>
  </div>
}

const Home = () => {
  const [stories, setStories] = useState([])
  const [storiesAll, setStoriesAll] = useState([])
  const [story, setStory] = useState({})
  const [showModal, setShowModal] = useState('')
  const [scrollerHeight, setScrollerHeight] = useState(0)
  const [virtualTop, setVirtualTop] = useState(0)
  const [user, setUser] = useState()
  const [userDisplay, setUserDisplay] = useState('')
  const [userSpaceDisplay, setUserSpaceDisplay] = useState('')
  
  const getStoryTop = () => {
    Service.get('/storyTop', {
      params: {
        bayid: 2
      }
    }).then(res => {
      console.log('getStoryTop', res.data.data)
      setStories(res.data.data)
      setUser({
        avatar: res.data.data[0].avatar,
        name: res.data.data[0].role
      })
      getStoryCount()
      getData()
    })
  }
  
  const getStoryCount = () => {
    Service.get('/storyCount', {
      params: {
        bayid: 2
      }
    }).then(res => {
      console.log('getStoryCount', res.data.count)
      setScrollerHeight(res.data.count * CARD_HEIGHT)
      // setStories(res.data.data)
    })
  }

  const checkScroller = () => {
    if (storiesAll.length === 0) {
      return
    }
    const startIndex = Math.floor(homeRef.current.scrollTop / CARD_HEIGHT) - 1
    console.log('homeRef.current.scrollTop', homeRef.current.scrollTop)
    if (homeRef.current.scrollTop > USER_HEIGHT) {
      setUserSpaceDisplay('none')
    } else if (homeRef.current.scrollTop === 0 ) {
      setUserSpaceDisplay('')
    }
    const topSize = CARD_HEIGHT * startIndex
    if (startIndex >= 0) {
      const showStories = storiesAll.slice(startIndex, 4 + startIndex)
      setStories(showStories)

      if (topSize > virtualTop) {
        setUserDisplay('none')
      } else if (topSize < virtualTop) {
        setUserDisplay('')
      }
      setVirtualTop(topSize)
    }
    // const topSize = homeRef.current.scrollTop
    // if (homeRef.current.scrollTop > CARD_HEIGHT) {
    //   setVirtualTop(topSize)
    // }
    // console.log('homeRef.current.scrollTop', startIndex, topSize, virtualTop, homeRef.current.scrollTop)
  };
  useEffect(() => {
    getStoryTop()
  }, [])

  const getData = () => {
    Service.get('/story', {
      params: {
        bayid: 2
      }
    }).then(res => {
      console.log('res', res.data.data[100])
      setStoriesAll(res.data.data)
    })
  }
  const goToTop = () => {
    if (storiesAll.length === 0) {
      return
    }
    homeRef.current.scrollTo(0,0)
    setUserSpaceDisplay('')
    setVirtualTop(0)
    const showStories = storiesAll.slice(0, 4)
    setStories(showStories)
  }

  const expandStory = (id) => {
    homeRef.current.overflowY = 'hidden'
    console.log('homeRef', homeRef)
    console.log('expandStory', id)
    Service.get('/storybyid', {
      params: {
        id
      }
    }).then(res => {
      console.log('expandStory', res.data.data)
      setUserDisplay('none')
      setStory(res.data.data)
      setShowModal('StoryFullCard')
    })
  }
  const shrinkCard = () => {
    homeRef.current.overflowY = 'scroll'
    setUserDisplay('')
    setStory({})
    setShowModal('')
  }

  const homeRef = useRef()
  window.homeRef = homeRef
  return (
    <div className={styles["main"]}>
      {user && <UserCard user={user} style={{display:userDisplay}} onClick={goToTop}/>}
      <div className={styles["home"]} ref={homeRef} style={{overflowY: 'auto'}} onScroll={checkScroller}>
        <div className={styles["story-show"]} style={{top: virtualTop}}>
          <div className={styles["space-user"]} style={{display:userSpaceDisplay}}>&nbsp;</div>
          <StoryList stories={stories} expand={expandStory}/>
        </div>
        <div className={styles["scroller"]} style={{minHeight: scrollerHeight}} >&nbsp;</div>
        {showModal && <div className={styles["modal"]}>
          { showModal === 'StoryFullCard' && <StoryFullCard story={story}/>}
          <div onClick={shrinkCard}>返回</div>
        </div>}
      </div>
    </div>
  );
}

export default Home