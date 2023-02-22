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


export default {
    localStorage_get,
    localStorage_set,
    localStorage_remove,
    localStorage_clear
}