<template>
    <div>
        <b-alert show class="mt-20px text-align-center">
            您共有<b-badge variant="primary">{{ forms.length }}</b-badge>张评价表需填写，已完成
            <b-badge variant="success">{{ maxed }} </b-badge>张
        </b-alert>
        <div class="accordion" role="tablist">
            <b-card no-body class="mb-1" v-for="(form, index) in forms" :key="form.ru_form_id">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle="'form-' + (index)" variant="outline-info">
                        {{ index + 1 }}. <i class="fa fa-address-card"></i> {{ form.ru_form_name }}</b-button>
                </b-card-header>
                <b-collapse :id="'form-' + (index)" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <eva-form-vote :findex="index" :name="form.ru_form_name" :project_id="form.project_id"
                            :project_owner_id="form.project_owner_id" :project_owner_name="form.project_owner_name"
                            :ru_form_id="form.ru_form_id" :user_type="form.user_type"
                            @completed="onFormCompleted"></eva-form-vote>
                    </b-card-body>
                    <div class="block text-center" v-if="index !== (forms.length - 1)">
                        <b-button size="sm" v-b-toggle="'form-' + (index + 1)" variant="outline-success">
                            <i class="fa fa-arrow-right"></i>下一张
                        </b-button>
                    </div>
                    <div v-else class="text-12px">
                        <b-alert show variant="dark" class="text-center">
                            已经是最后一张表
                        </b-alert>
                    </div>
                </b-collapse>
            </b-card>
        </div>
        <b-button block :variant="canSubmit ? 'primary' : 'outline-secondary'" :disabled="!canSubmit"
            @click="submitAnswer" class="btn-submit">提交</b-button>
    </div>
</template>
<script>
import { EvaFormVoteApi } from '../api/eva-form-vote';
import { CheckUserApi } from '../api/mobile/check-user';
import EvaFormVote from './EvaFormVote.vue';
const api = new EvaFormVoteApi;
const userApi = new CheckUserApi;
export default {
    name: "VoteHome",
    compatConfig: { MODE: 3 },
    components: { EvaFormVote },
    data() {
        return {
            forms: [],
            maxed: 0,
            params: {
                answers: [],
            },
        }
    },
    async mounted() {
        const project_id = this.$route.query.project_id;
        const project_owner_id = this.$route.query.project_owner_id;
        const name = this.$route.query.name;
        const user_data = await userApi.checkUserCode({ project_id, project_owner_id, name });
        if (user_data.message || user_data.is_login > 0 || user_data.is_submit > 0) {
            this.$router.push({ name: 'vote-ed' })
            return;
        }
        const result = await api.getForm({ project_id, project_owner_id });
        this.forms = result.data;
    },
    methods: {
        onFormCompleted(index, param) {
            this.maxed = Math.max(this.maxed, index + 1);
            if (!param || param.length === 0) {
                this.$message.warning("测评表未完成");
                return;
            }
            for (const pan of param) {
                pan.owner_user_id = this.$route.query.name;
                this.params.answers.push(pan);
            }
        },
        async submitAnswer() {
            const result = await api.submitAnswer(this.params);
            if (result.code === 200) {
                this.$router.push({ name: 'vote-ok' })
            }
        }
    },
    computed: {
        canSubmit: function () {
            const result = this.params.answers.length > 0;
            return result;
        }
    }
}
</script>
<style scoped>
.btn-block {
    text-align: left;
}

.btn-submit {
    text-align: center;
}

.card-body {
    padding: .5rem;
}
</style>