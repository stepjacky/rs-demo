<template>
    <b-card>
        <div class="alert alert-info">
            {{ formUnit }}:<b-badge variant="primary">{{ formInfo.users.length }}</b-badge>
            已完成: <b-badge variant="warning">{{ formInfo.finished }}</b-badge>
            完成情况:<b-badge variant="success">{{ formInfo.ratio }}%</b-badge>
            <b-button class="m-1" variant="warning" size="small" @click="formInfo.show = !formInfo.show">我要投票</b-button>
        </div>
        <b-collapse v-model="formInfo.show">
            <b-card v-for="(user, uindex) in formInfo.users" :key="user.user_id" class="mt-2">
                <template #header>
                    <h5 class="mb-0"><i class="fa fa-user-o mr-2"></i>{{ user.user_name }}</h5>
                </template>
                <template v-for="(rule, rindex) in formInfo.rules">
                    <b-form-group :label="parseInt(uindex * formInfo.rules.length + rindex + 1) + ':' + rule.name">
                        <template v-if="rule.rule_type === '打分'">
                            <b-form-radio-group buttons button-variant="outline-secondary"
                                v-model="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values[0]"
                                :options="rule.items" :name="user.user_id + '-' + rule.id"
                                @change="onCheckAnswer(param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values, uindex * formInfo.rules.length + rindex)"
                                :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                <b-form-invalid-feedback
                                    :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                    <b-badge variant="danger" class="text-danger">D</b-badge>
                                </b-form-invalid-feedback>
                                <b-form-valid-feedback
                                    :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                    <b-badge variant="success" class="text-success">A</b-badge>
                                </b-form-valid-feedback>
                            </b-form-radio-group>
                        </template>
                        <template v-if="rule.rule_type === '单选'">
                            <b-form-radio-group stacked buttons button-variant="outline-secondary"
                                v-model="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values[0]"
                                :options="rule.items" :name="user.user_id + '-' + rule.name"
                                @change="onCheckAnswer(param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values, uindex * formInfo.rules.length + rindex)"
                                :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                <b-form-invalid-feedback
                                    :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                    <b-badge variant="danger" class="text-danger">D</b-badge>
                                </b-form-invalid-feedback>
                                <b-form-valid-feedback
                                    :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                    <b-badge variant="success" class="text-success">A</b-badge>
                                </b-form-valid-feedback>
                            </b-form-radio-group>
                        </template>
                        <template v-if="rule.rule_type === '多选'">
                            <b-form-checkbox-group buttons stacked
                                v-model="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values"
                                :options="rule.items" :name="user.user_id + '-' + rule.name"
                                @change="onCheckAnswer(param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values, uindex * formInfo.rules.length + rindex)"
                                :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                <b-form-invalid-feedback
                                    :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                    <b-badge variant="danger" class="text-danger">D</b-badge>
                                </b-form-invalid-feedback>
                                <b-form-valid-feedback
                                    :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                                    <b-badge variant="success" class="text-success">A</b-badge>
                                </b-form-valid-feedback>
                            </b-form-checkbox-group>
                        </template>
                        <template v-if="rule.rule_type === '问答'">
                            <b-form-textarea size="lg"
                                v-model="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values[0]"
                                :placeholder="'请填写对' + rule.name + '的意见,最多500字'"
                                @change="onCheckAnswer(param.answers[parseInt(uindex * formInfo.rules.length + rindex)].values, uindex * formInfo.rules.length + rindex)"
                                :state="param.answers[parseInt(uindex * formInfo.rules.length + rindex)].state">
                            </b-form-textarea>
                        </template>
                    </b-form-group>
                </template>
            </b-card>
        </b-collapse>
    </b-card>
</template>
<script>

import { EvaFormVoteApi } from '../api/eva-form-vote';
const api = new EvaFormVoteApi;
export default {
    name: "EvaFormVote",
    props: ["findex", "name", "project_id", "project_owner_id", "project_owner_name", "ru_form_id", "user_type"],
    compatConfig: { MODE: 3 },
    data() {
        return {
            formInfo: {
                show: false,
                total: '',
                finished: 0,
                ratio: 0,
                users: [],
                rules: [],
                hasComplete: false,
            },
            param: {
                answers: []
            }
        }
    },
    async created() {
        const details = await api.getFormUsersAndRules({
            project_id: this.project_id,
            project_owner_id: this.project_owner_id,
            project_owner_form_id: this.ru_form_id
        })
        const { users, rules } = details.data;
        this.formInfo.users = users;
        this.formInfo.rules = rules;
        for (let uindex = 0; uindex < users.length; uindex++) {
            const { user_id, user_name, user_type } = users[uindex];
            for (let rindex = 0; rindex < rules.length; rindex++) {
                const { id, name, rule_type, rule_top_id, rule_top_name, is_required, min_select, max_select } = rules[rindex];
                const aindex = parseInt(uindex * rules.length + rindex);
                const formParam = {
                    user_index: uindex,
                    rule_index: rindex,
                    project_id: this.project_id,
                    project_owner_id: this.project_owner_id,
                    project_owner_name: this.project_owner_name,
                    user_id,
                    user_name,
                    user_type,
                    is_required,
                    min_select,
                    max_select,
                    rule_form_id: this.ru_form_id,
                    rule_form_name: this.name,
                    rule_top_id,
                    rule_top_name,
                    rule_id: id,
                    rule_name: name,
                    rule_type,
                    state: false,
                    values: []
                };
                this.$set(this.param.answers, aindex, formParam)

            }
        }

    },
    methods: {
        onCheckAnswer(value, vindex) {
            if (this.param.answers[vindex].rule_type === '打分' || this.param.answers[vindex].rule_type === '单选' || this.param.answers[vindex].rule_type === '问答') {
                const state = !!(this.param.answers[vindex].is_required > 0 && this.param.answers[vindex].values[0]);
                this.$set(this.param.answers[vindex], "state", state)
            }
            if (this.param.answers[vindex].rule_type === '多选') {
                const state = !!(this.param.answers[vindex].is_required > 0
                    && this.param.answers[vindex].values.length >= parseInt(this.param.answers[vindex].min_select)
                    && this.param.answers[vindex].values.length <= parseInt(this.param.answers[vindex].max_select)
                );
                this.$set(this.param.answers[vindex], "state", state)
            }

            this.checkRequired();
        },
        checkRequired() {
            const requireds = this.param.answers.filter(a => a.is_required > 0);
            const voteRequireds = this.param.answers.filter(a => a.is_required > 0 && a.values[0]);
            this.formInfo.finished = voteRequireds.length;
            this.formInfo.ratio = 100 * (requireds.length == 0 ? 0 : (voteRequireds.length / requireds.length).toFixed(2));
            if (requireds.length === voteRequireds.length && !this.hasComplete) {
                this.hasComplete = true;
                this.$toast.success(`您已经填写完第 ${this.findex + 1}张评测表，请点击下一张继续`);
                this.$emit("completed", this.findex, this.param.answers);

            }

        }
    },
    computed: {
        formUnit() {
            if (this.user_type == 3) return "班子";
            if (this.user_type == 4) return "单位";
            return "总数"
        }
    }

}
</script>
<style scoped>
.card-body {
    padding: .25rem;
}

.card-body .alert {
    margin-bottom: .25rem;
    padding: .25rem .25rem;

}

.card-body .alert .btn-small {
    padding: 0;
}

:deep(.btn-group-toggle>.btn,
    .btn-group-toggle>.btn-group>.btn) {
    margin-right: .25rem;
    margin-bottom: .25rem;
    padding: .2rem .55rem;
}

.card-header {
    padding: .25rem .25rem;
}
</style>