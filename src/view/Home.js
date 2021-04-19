import Service from '../lib/service'
import { createLocalUser } from '../lib/util'
import React, { useState, useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { HeartFilled, EyeOutlined, GoldTwoTone } from '@ant-design/icons'
import UserCard from '../component/UserCard'
import { throttle } from 'lodash'
import Img from '../component/Img'
import userImg from '../images/user.jpg'
import StoryFullCard from '../component/StoryFullCard'
import styles from './Home.module.css'
import StoryCardList from '../component/StoryCardList'
import ReaderIcon from '../component/ReaderIcon'

const CARD_HEIGHT = 566 + 20
const USER_HEIGHT = 65

const getBayId = (txt) => {
  return txt.replace('?id=', '')
}


const Home = () => {
  const [stories, setStories] = useState([])
  const [storiesAll, setStoriesAll] = useState([])
  const [story, setStory] = useState({})
  const [showModal, setShowModal] = useState('')
  const [scrollerHeight, setScrollerHeight] = useState(0)
  const [virtualTop, setVirtualTop] = useState(0)
  const [user, setUser] = useState()
  const [reader, setReader] = useState({})
  const [userDisplay, setUserDisplay] = useState('')
  const [userSpaceDisplay, setUserSpaceDisplay] = useState('')
  const location = useLocation()
  const bayid = getBayId(location.search)
  
  const getStoryTop = () => {
    Service.get('/storyTop', {
      params: {
        bayid
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
        bayid
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
  const userCheck = () => {
    const checkUser = localStorage.getItem('user')
    let userShow = ''
    if (!checkUser) {
      userShow = createLocalUser()
    } else {
      userShow = JSON.parse(checkUser)
    }
    setReader({
      id: userShow.id,
      nickname: userShow.nickname,
      avatar: userShow.avatar ? userShow.avatar : userImg
    })
  }
  useEffect(() => {
    userCheck()
    getStoryTop()
  }, [])

  const getData = () => {
    Service.get('/story', {
      params: {
        bayid
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
          <StoryCardList stories={stories} expand={expandStory}/>
        </div>
        <div className={styles["scroller"]} style={{minHeight: scrollerHeight}} >&nbsp;</div>
        {showModal && <div className={styles["modal"]}>
          { showModal === 'StoryFullCard' && <StoryFullCard story={story}/>}
          <div onClick={shrinkCard}>返回</div>
        </div>}
      </div>
      <ReaderIcon reader={reader}/>
    </div>
  );
}

export default Home