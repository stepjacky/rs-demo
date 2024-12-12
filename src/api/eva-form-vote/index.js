import { BaseApi } from "../common/base-api";
import { doGet, doPost } from "../common/network";
class EvaFormVoteApi extends BaseApi {
    constructor() {
        super({ prefix: "/eva-mobile/vote" });
    }
    async getForm({ project_id, project_owner_id }) {
        const result = await doGet({ url: `${this.prefix}/form-info`, data: { where: { project_id, project_owner_id } } })
        return result;
    }
    async getFormUsersAndRules({ project_id, project_owner_id, project_owner_form_id }) {
        const result = await doGet({ url: `${this.prefix}/form-users-rules`, data: { where: { project_id, project_owner_id, project_owner_form_id } } })
        return result;
    }
    async submitAnswer(params) {
        const result = await doPost({ url: `/eva-answer/submit`, data: params })
        return result;
    }
}
export { EvaFormVoteApi }