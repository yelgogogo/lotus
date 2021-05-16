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
import AddStory from './AddStory'
import EditStory from './EditStory'

const CARD_HEIGHT = 566 + 20
const USER_HEIGHT = 65

const getBayId = (txt) => {
  return parseInt(txt.replace('?id=', ''))
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
  const [readerExpand, setReaderExpand] = useState(true)

  const location = useLocation()
  const history = useHistory()
  const bayid = getBayId(location.search)
  
  const readerClick = () => {
    setReaderExpand(!readerExpand)
  }
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
      getStoryData()
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
    setReaderExpand(false)
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
      userShow = createLocalUser({bayid})
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

  const getStoryData = () => {
    Service.get('/story', {
      params: {
        bayid
      }
    }).then(res => {
      setStoriesAll(res.data.data)
      checkScroller()
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
      setShowModal('EXPAND_CARD')
    })
  }
  const shrinkCard = () => {
    homeRef.current.overflowY = 'scroll'
    setShowModal('')
    setUserDisplay('')
    setStory({})
  }

  const addNewStory = () => {
    setUserDisplay('none')
    setShowModal('ADD_STORY')
  }
  
  const goBackToHome = () => {
    setShowModal('')
  }

  const deleteStory = () => {
    Service.post('/deletestory', {
      id: story.id,
      user: { ...reader }
    })
    .then(res => {
      shrinkCard()
      deleteStoryData(story.id)
    })
  }

  const deleteStoryData = (id) => {
    let cpyStories = stories.filter(s => s.id !== id)
    setStories(cpyStories)
  }
  const editCard = () => {
    console.log('editCard')
    setUserDisplay('none')
    setShowModal('EDIT_STORY')
  }

  const submitStory = () => {
    getStoryTop()
    shrinkCard()
  }

  const likeStory = () => {
    Service.put('/like', {
      id: story.id,
      likes: [{
        ...reader
      }]
    }).then(res => {
      setStory(res.data.data)
      getStoryData()
    })
  }

  const actionButton = (act) => {
    if (act === 'GO_BACK_HOME') {
      return <div className={styles["reader-action"]} onClick={goBackToHome}>返回</div>
    }
    if (act === 'SHRINK_CARD') {
      return <div className={styles["reader-action"]} onClick={shrinkCard}>返回</div>
    }
    if (act === 'DELETE_CARD') {
      return <div className={styles["reader-action"]} onClick={deleteStory}>删除</div>
    }
    if (act === 'EDIT_CARD') {
      return <div className={styles["reader-action"]} onClick={editCard}>编辑</div>
    }
    if (act === 'NEW_CARD') {
      return <div className={styles["reader-action"]} onClick={addNewStory}>写作</div>
    }
    if (act === 'LIKE') {
      return <div className={styles["reader-action"]} onClick={likeStory}>
        <HeartFilled />&nbsp;赞
      </div>
    }
    if (act === 'COMMENT') {
      return <div className={styles["reader-action"]} onClick={addNewStory}>评论</div>
    }
    return ''
  }
  const actions = () => {
    const actionsArray = []
    if (showModal === 'ADD_STORY') {
      actionsArray.push('GO_BACK_HOME') 
    }
    if (showModal === 'EXPAND_CARD') {
      if (story.ownerid === reader.id) {
        actionsArray.push('DELETE_CARD')
        actionsArray.push('EDIT_CARD') 
      }
      actionsArray.push('LIKE')
      actionsArray.push('COMMENT') 
    }
    if (showModal === '') {
      actionsArray.push('NEW_CARD')
    }
    return actionsArray.map(a => {
      return actionButton(a)
    })
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
          { showModal === 'EXPAND_CARD' && <StoryFullCard story={story} goBack={shrinkCard}/>}
          { showModal === 'ADD_STORY' && <AddStory onSubmit={submitStory}/>}
          { showModal === 'EDIT_STORY' && <EditStory story={story} onSubmit={submitStory}/>}
        </div>}
      </div>
      <ReaderIcon actions={actions()} reader={reader} expand={readerExpand} onIconClick={readerClick}/>
    </div>
  );
}

export default Home