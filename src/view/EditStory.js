import React, {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import Service from '../lib/service'
import Img from '../component/Img'
import moment from 'moment'
import { useLocation } from 'react-router-dom';
import styles from './EditStory.module.css'

const EditStory = (props) => {
  const {bayid, avatar, id, nickname} = JSON.parse(localStorage.getItem('user'))
  const [story, setStory] = useState(props.story)
  const [cover, setCover] = useState(props.story.cover)
  const [title, setTitle] = useState(props.story.title)
  const [content, setContent] = useState(props.story.description)
  const location = useLocation()

  const onDrop = useCallback(acceptedFiles => {
    console.log('acceptedFiles', acceptedFiles)
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    Service.post('/upload',formData).then(res => {
      console.log('EditStory', res)
      const cover = res.data.path
      setCover(cover)
    })
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  useEffect(() => {
  }, [])

  const titleChange = (t) => {
    console.log('titleChange', t.target.value)
    setTitle(t.target.value)
  }

  const contentChange = (t) => {
    console.log('titleChange', t.target.value)
    setContent(t.target.value)
  }

  const disableStory = () => {
    if (!title) {
      return true
    }
    if (!content) {
      return true
    }
    return false
  }

  const submitStory = () => {
    const subtitle = content.length > 20 ? (content.substr(0,20) + '...') : content
    const description = content
    const submitData = { ...story, title, cover, description, subtitle }
    Service.put('/story', submitData).then(res => {
      console.log('res', res.data)
      props.onSubmit()
    })
  }

  return (
    <div>
      <input type='text' placeholder="请输入标题" defaultValue={title} onChange={titleChange}/>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        
        { !cover && <div className={styles["edit-cover"]}>请选择封面照片</div>}
        { cover && <Img className={styles["edit-img"]} src={cover} />}
        
      </div>
      <textarea rows="20" className={styles["edit-content"]} placeholder="请输入正文" defaultValue={content} onChange={contentChange}/>
      {/* <div>
        插入图片
      </div>
      <div>
        插入说明
      </div> */}
      <button className={styles["edit-submit"]} disabled={disableStory()} onClick={submitStory}>发布</button>
    </div>
  )
}

export default EditStory