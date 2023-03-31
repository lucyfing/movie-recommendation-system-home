import { message } from "antd";
import { User } from "../../lib/app-interface";
import { postRequest } from "../axios";

const getUserData = async (url: string, params: any, headers?: any) => {
    let user: User = {}
    try {
        const resp: any = await postRequest(url, params, headers)
        if(resp.data.success) {
            user = {
                email: resp.data.user.email,
                username: resp.data.user.username,
                avatar: resp.data.user.avatar,
                description: resp.data.user.description,
                _id: resp.data.user._id
            }
        } else {
            message.error({content: JSON.stringify(resp.data.err)})
        }
    } catch (error) {
        message.error({content:JSON.stringify(error)})
    }
    return user
}


export default {
    getUserData
}