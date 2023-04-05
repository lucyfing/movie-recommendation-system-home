import { futimesSync } from "fs"
import user from "../api/user"

const localStorage_get = (key: string) => {
    if(!!localStorage.getItem(key)) return JSON.parse(localStorage.getItem(key)!)
    else return null
}

const localStorage_set = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const localStorage_remove = (key: string) => {
    if(!!localStorage_get(key)) localStorage.removeItem(key)
}

const localStorage_clear = () => {
    localStorage.clear()
}

// 防抖
const debounce = (fn: any, wait: number) => {
    let timeout: any = null
    return function(){
        clearTimeout(timeout)
        timeout = setTimeout(fn, wait)
    }
}

// 6位验证码
const validCaptcha = (code: string) => {
    return !!code || /^[0-9]{6}$/.test(code)
}

// 邮箱校验
const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// 用户名校验
const validUsername = (username: string | undefined) => {
    const usernameRegex = /^[a-zA-Z0-9_-]{5,15}$/;
    return !!username && usernameRegex.test(username)
}

// 密码确定
const comparePassword = async (password: string, confirmPassword: string) => {
    console.log(password, confirmPassword)
    if(password === confirmPassword) return Promise.resolve(true)
    else return Promise.reject('密码与确认密码不一致')
}

// 过滤html标签，防止XSS攻击
const escapeHtml = (htmlStr: string | undefined) => {
    return htmlStr?.replace(/<[^>]+>/g, '') || ''
}

// 替换特殊字符
const replaceSpecialChar = (keywords: string | undefined) => {
    const specialCharList: string[] = [
      '*',
      '.',
      '?',
      '+',
      '$',
      '^',
      '[',
      ']',
      '{',
      '}',
      '|',
      '(',
      ')',
      '/',
      '%',
      '\\',
      '<',
      '>'
    ];
    if (!keywords) return keywords;
    let str: string = '';
    keywords?.split('').forEach((item: string) => {
      if (specialCharList.includes(item)) {
        str += `\\${item}`;
      } else {
        str += item;
      }
    });
    return str;
  };

// 监听localStorage
const listenLocalStorage = () => {
    const localStorageMock = (function(win) {
        const storage = win.localStorage
        return {
            setItem: function(key: string, value: string) {
                const setItemEvent:any = new Event("setItemEvent")
                const oldValue = storage[key]
                setItemEvent.key = value
                if(oldValue !== value) {
                    setItemEvent.newValue = value
                    setItemEvent.oldValue = oldValue
                    win.dispatchEvent(setItemEvent)
                    storage[key] = value
                    return true
                }
            },
            getItem: function(key: string) {
                return storage[key]
            },
            removeItem: function(key: string) {
                storage.removeItem(key)
                return true
            },
            clear: function() {
                storage.clear()
                return true
            }
        }
    })(window)

    Object.defineProperty(window, 'localStorage', {value: localStorageMock, writable: true})

    window.addEventListener('setItemEvent', function(e){
        console.log(e)
    })
}


export default {
    localStorage_get,
    localStorage_set,
    localStorage_remove,
    localStorage_clear,
    debounce,
    validateEmail,
    validUsername,
    escapeHtml,
    replaceSpecialChar,
    validCaptcha,
    comparePassword,
    listenLocalStorage
}