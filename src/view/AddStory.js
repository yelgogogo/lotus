import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Service from '../lib/service'
import Img from '../component/Img'
import moment from 'moment'

const AddStory = (props) => {
  const {bayid, avatar, id, nickname} = JSON.parse(localStorage.getItem('user'))
  const [story, setStory] = useState({
    avatar,
    bayid,
    comments: [],
    cover: '',
    delflag: false,
    description: '',
    gifts: [],
    likes: [],
    ownerid: id,
    role: nickname,
    starttime: '',
    subcontents: [],
    subtitle: '',
    title: '',
    visitors: []
  })
  const [cover, setCover] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
 

  const onDrop = useCallback(acceptedFiles => {
    console.log('acceptedFiles', acceptedFiles)
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    Service.post('/upload',formData).then(res => {
      console.log('AddStory', res)
      const cover = res.data.path
      setCover(cover)
    })
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

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
    const starttime = moment().utc().format()
    const subtitle = content.length > 20 ? (content.substr(0,20) + '...') : content
    const description = content
    const submitData = {...story, title, cover, description, subtitle, starttime}
    Service.post('/story', submitData).then(res => {
      console.log('res', res.data)
      props.onSubmit()
    })
  }

  return (
    <div>
      <input type='text' placeholder="请输入标题" defaultValue={title} onChange={titleChange}/>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
            <div>请选择封面照片</div>
        }
      </div>
      <Img src={cover} />
      <textarea placeholder="请输入正文" defaultValue={content} onChange={contentChange}/>
      <div>
        插入图片
      </div>
      <div>
        插入说明
      </div>
      <button disabled={disableStory()} onClick={submitStory}>发布</button>
    </div>
  )
}

export default AddStory