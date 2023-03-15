import { Category } from "../lib/app-type"
import { getRequest } from "./axios"
const getAllCategory = async (url: string) => {
    let categories: Category[]
    try {
        const resp = await getRequest(url)
        categories = resp.data.categories.map((category: Category) => ({
            _id: category._id,
            name: category.name
        }))
    } catch (error) {
        throw error
    }

    return categories
}

export default {
    getAllCategory
}