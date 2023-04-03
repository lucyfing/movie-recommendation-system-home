import { message } from "antd"
import { realpath } from "fs"
import { User } from "../lib/app-interface"
import { getRequest, postRequest } from "./axios"
import utils from "./utils"

// 登录
const homeLogin = async (loginForm:{email:string,password:string}) => {
    const user: User = await utils.getUserData('/api/user/login', loginForm)
    return user
}


// 修改用户信息
const updateUser = async (params:User) => {
    const user: User = await utils.getUserData('/api/user/updateUser', params)
    return user
}

// 修改用户头像
const updateAvatar = async (params:any) => {
    const user: User = await utils.getUserData('/api/user/avatar', params, {headers: {'Content-Type': 'multipart/form-data'}})
    return user
}

// 修改密码
const updatePwd = async (params: any) => {
    try {
        const resp = await postRequest('/api/user/updatePwd', params)
        if(resp.data.success) {
            message.success(resp.data.message)
        } else message.error(resp.data.err)
    } catch (error) {
        message.error(error as any)
    }
}

// 收藏电影
const collectionMovie = async (params: any) => {
    const result = {
        collection: false,
        collectionVotes: 0
    }
    try {
        const resp = await postRequest('/api/user/userMovie', params)
        result.collection = resp.data.collectionUser
        result.collectionVotes = resp.data.collectionVotes
    } catch (error) {
        message.error(error as any)
    }
    return result
}

// 获取用户收藏电影列表
const getCollectionList = async () => {
    
}


export default {
    homeLogin,
    updateUser,
    updateAvatar,
    updatePwd,
    collectionMovie
}