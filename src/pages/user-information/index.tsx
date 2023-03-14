import { Avatar, Button, Divider, Input, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import './index.less'
import '../../assets/index.less'
import utils from '../../utils'
const { TextArea } = Input


export default function index() {
  // 个人资料
  const [user, setUser] = useState({
    avator: 'https://joesch.moe/api/v1/random?key=3',
    nickName: '小飞同学',
    description: '个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介个人简介'
  })
  // 昵称
  const [nickNameInput, setNickNameInput] = useState(false)
  const [nickName, setNickname] = useState(user.nickName)
  // 简介
  const [descriptionInput, setDescriptionInput] = useState(false)
  const [description, setDescription] = useState(user.description)
  // 完成修改
  const onEditOk = (setInput: any, key: string, value: string) => {
    setInput(false)
    if(key==='nickName') {
      setUser((user) => ({
        ...user,
        nickName: value
      }))
    }
    if(key==='description') {
      setUser((user) => ({
        ...user,
        description: value
      }))
    }
  }
  // 取消修改
  const onEditCancel = (setInput: any, setValue: any, value: string) => {
    setInput(false)
    setValue(value)
  }
  useEffect(() => {
    console.log(user.nickName)
  }, [user])
  return (
    <div className='personal-information app-div-shadow'>
      <div className='personal-card'>
        <div className='title'>头像</div>
        <div className='content'>
          <Avatar src={user.avator} size={60}/>
        </div>
        <div className='edit'>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture"
          >
            <Button type='text' className='btn-font'>上传头像</Button>
          </Upload>
        </div>
      </div>
      <div className='personal-card'>
        <div className='title'>昵称</div>
        <div className='content'>
          <Input
            defaultValue={user.nickName}
            value={nickName}
            bordered={nickNameInput} 
            disabled={!nickNameInput}
            allowClear
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className='edit'>
          {
            nickNameInput ?
            <>
              <Button
                type='text'
                className='btn-font btn-cancel'
                onClick={()=>onEditCancel(setNickNameInput, setNickname, user.nickName)}
              >取消</Button>
              <Button
                type='text'
                className='btn-font btn-ok'
                onClick={() => onEditOk(setNickNameInput, 'nickName', nickName)}
              >完成</Button>
            </>
            :
            <Button
              type='text'
              className='btn-font btn-edit' 
              onClick={() => setNickNameInput(true)}
            >修改昵称</Button>
          }
        </div>
      </div>
      <div className='personal-card'>
        <div className='title'>个人简介</div>
        <div className='content'>
          <TextArea 
            style={{width:'100%'}}
            defaultValue={user.description}
            value={description}
            bordered={descriptionInput} 
            disabled={!descriptionInput}
            allowClear
            showCount={descriptionInput}
            maxLength={100}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='edit'>
          {
            descriptionInput ?
            <>
              <Button
                type='text'
                className='btn-font btn-cancel'
                onClick={()=>onEditCancel(setDescriptionInput, setDescription, user.description)}
              >取消</Button>
              <Button
                type='text'
                className='btn-font btn-ok'
                onClick={() => onEditOk(setDescriptionInput, 'description', description)}
              >完成</Button>
            </>
            :
            <Button
              type='text'
              className='btn-font btn-edit' 
              onClick={() => setDescriptionInput(true)}
            >修改简介</Button>
          }
        </div>
      </div>
    </div>
  )
}
