import { doGet, doPost } from "./network";
class BaseApi {
    constructor({ prefix }) {
        this.prefix = prefix;
    }
    async findByPk({ pk }) {
        const data = await doGet({ url: `${this.prefix}/find-by-pk`, data: { pk } })
        return data;
    }
    async findPager({ page = 1, offset = 10, where = {}, order = [[]] }) {
        const data = await doGet({
            url: `${this.prefix}/find-pager`,
            data: { page, offset, where, order }
        })
        return data;
    }
    async findList({ where = {}, order = [[]] }) {
        const data = await doGet({ url: `${this.prefix}/find-list`, data: { where, order } })
        return data;
    }
    async save({ values }) {
        const data = await doPost({ url: `${this.prefix}/save`, data: values })
        return data;
    }
    async saveBatch({ records }) {
        const data = await doPost({ url: `${this.prefix}/save-batch`, data: records })
        return data;
    }
    async update({ values, where }) {
        const data = await doPost({ url: `${this.prefix}/update`, data: { values, where } })
        return data;
    }
    async saveOrUpdate({ values }) {
        const data = await doPost({ url: `${this.prefix}/save-or-update`, data: { values } })
        return data;
    }
    async remove({ where }) {
        const data = await doPost({ url: `${this.prefix}/remove`, data: { where } })
        return data;
    }

}
export { BaseApi }