import Service from '../lib/service'
import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';


const getQueryId = (txt) => {
  
  return txt.replace('?id=', '')
}

const Story = (props) => {
  const [story, setStory] = useState(null)
  useEffect(() => {
    console.log(props)
    getData()
  }, [])
  
  const getData = () => {
    Service.get('/storybyid', {
      params: {
        id: getQueryId(props.location.search)
      }
    }).then(res => {
      console.log('res', res.data.data)
      setStory(res.data.data)
    })
  }
  return <div>Story</div>
}

export default withRouter(Story)