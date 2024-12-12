<template>
    <div>
        <div class="card border-info mt-3 mb-3">
            <div class="card-header bg-transparent border-success text-center ">请核实你的身份 {{ user_info }}</div>
            <div class="card-body">
                <h5 class="card-title text-center text-13px">投票须知</h5>

                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card's content.</p>

            </div>
        </div>
        <div class="d-grid gap-2">
            <button class="btn btn-primary mt-20px" :disabled="disableCheck" @click="goHome" type="button">
                已核实</button>

        </div>
        <Toast position="top-center" />
    </div>
</template>
<script setup>
import { onMounted, computed, toRefs, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { CheckUserApi } from '../api/mobile/check-user';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const api = new CheckUserApi;
let user_data;
const user_info = ref("");


const route = useRoute();
const router = useRouter();
onMounted(async () => {
    const { project_id, project_owner_id, name } = route.query;
    const tdata = await api.checkUserCode({ project_id, project_owner_id, name });
    user_data = reactive(tdata);
    user_info.value = user_data['group_name'] + ' ' + user_data['name'];
    if (user_data.message) {
        toast.add({ severity: 'info', summary: 'Info', detail: user_data.message, life: 1000 });
    }
    if (user_data.is_login > 0 || user_data.is_submit > 0) {
        router.push({ name: 'vote-ed' })
    }
    const goHome = async () => {
        if (this.user_data.code === this.code) {
            const { project_id, project_owner_id } = this.$route.query;
            router.push({ name: "mobile-vote-home", query: { project_id, project_owner_id, name: this.name, code: this.code } });
        } else {
            toast.add({ severity: 'info', summary: 'Info', detail: "身份信息错误，请扫描正确的二维码", life: 1000 });
        }
    }


    const disableCheck = computed(() => user_data.message)
</script>