import { Category } from "../lib/app-interface"
import { getRequest } from "./axios"
const getAllCategory = async () => {
    let categories: Category[]
    try {
        const resp = await getRequest('/api/category/')
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