import React, {useState} from 'react'
import styles from './CommentModal.module.css'

const CommentModal = (props) => {
  const {content, onContentChange, onSubmit} = props
  const contentChange = (t) => {
    onContentChange(t.target.value)
  }

  return <div className={styles["modal-mask"]}>
    <div className={styles["modal-content"]}>
      <textarea rows="10" className={styles["modal-text"]} placeholder="请输入正文" defaultValue={content} onChange={contentChange}/>
      <div className={styles["modal-btn"]} onClick={onSubmit}>发表评论</div>
    </div>
  </div>
}

export default CommentModal