import { BaseApi } from "../../common/base-api";
import { doGet } from "../../common/network";
class CheckUserApi extends BaseApi {
    constructor() {
        super({ prefix: "/eva-project-user" });
    }

    async checkUserCode({ project_id, project_owner_id, name, code }) {
        const data = await doGet({ url: `${this.prefix}/check-user-code`, data: { where: { project_id, project_owner_id, name, code } } })
        if (!data.data) {
            return false;
        }
        return data.data;
    }
}
export { CheckUserApi }