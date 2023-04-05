import { Avatar, Button, Divider, Input, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import './index.less'
import '../../assets/index.less'
import utils from '../../utils'
import { User } from '../../lib/app-interface'
import userApi from '../../api/user'
import { postRequest } from '../../api/axios'
import { store } from '../../redux/index'
import { setUser as setCurrentUser } from '../../redux/user'
const { TextArea } = Input


export default function index() {
  // 个人资料
  const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem('user')!)||{})
  // 昵称
  const [usernameInput, setUsernameInput] = useState(false)
  const [username, setusername] = useState(user.username)
  // 简介
  const [descriptionInput, setDescriptionInput] = useState(false)
  const [description, setDescription] = useState(user.description)
  // 完成修改
  const onEditOk = async (setInput: any, key: string, value?: string) => {
    let newUser = {}
    if(key==='username') {
      if(utils.validUsername(value)) {
        newUser = await userApi.updateUser({_id: user._id, username: value})
      }
    }
    if(key==='description') {
      newUser = await userApi.updateUser({_id: user._id, description: utils.replaceSpecialChar(value)})
    }

    if(Object.keys(newUser).length>0) {
      setUser(newUser)
      setInput(false)
      message.success('修改成功')
      store.dispatch(setCurrentUser(newUser))
    } else {
      if(key==='username') message.error('请输入由5-15位大小写字母及数字构成的用户名')
    }
  }

  // 取消修改
  const onEditCancel = (setInput: any, setValue: any, value?: string) => {
    setInput(false)
    setValue(value)
  }


  // 上传头像
  const beforeUpload = (file: File) => {
    // 检查文件类型和大小等信息
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片');
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      message.error(`文件大小不能超过 ${maxSize / 1024 / 1024}MB`);
      return false;
    }

    return true;
  };

  // 上传头像完成
  const handleUpload = async (file: any) => {
    try {
      // 创建 FormData 对象，并将文件添加到其中
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('_id', JSON.parse(localStorage.getItem('user')!)._id);
      // 发送 POST 请求，将 FormData 数据传递给后端
      const user = await userApi.updateAvatar(formData)
      store.dispatch(setCurrentUser(user))
      message.success('上传成功')
      window.location.reload()
    } catch (error) {
      message.error('上传失败');
    }
  }

  return (
    <div className='personal-information app-div-shadow'>
      <div className='personal-card'>
        <div className='title'>头像</div>
        <div className='content'>
          <Avatar src={user.avatar||null} size={60}/>
        </div>
        <div className='edit'>
          <Upload
            listType="picture"
            name="avatar"
            maxCount={1}
            showUploadList={false}
            customRequest={(file)=>handleUpload(file.file)}
            beforeUpload={beforeUpload}
          >
            <Button type='text' className='btn-font'>上传头像</Button>
          </Upload>
        </div>
      </div>
      <div className='personal-card'>
        <div className='title'>昵称</div>
        <div className='content'>
          <Input
            defaultValue={user.username}
            value={username}
            bordered={usernameInput} 
            disabled={!usernameInput}
            allowClear
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        <div className='edit'>
          {
            usernameInput ?
            <>
              <Button
                type='text'
                className='btn-font btn-cancel'
                onClick={()=>onEditCancel(setUsernameInput, setusername, user.username)}
              >取消</Button>
              <Button
                type='text'
                className='btn-font btn-ok'
                onClick={() => onEditOk(setUsernameInput, 'username', username)}
              >完成</Button>
            </>
            :
            <Button
              type='text'
              className='btn-font btn-edit' 
              onClick={() => setUsernameInput(true)}
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
