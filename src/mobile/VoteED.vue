<template>
    <div class="text-center pt-10rem">
        <i class="fa fa-ban  text-10rem text-red-6" aria-hidden="true"></i>
        <b-alert variant="secondary" show class="mt-10rem">此票已经完成!</b-alert>
        <b-alert variant="light" show class="mt-1rem">{{ dateName }}</b-alert>
    </div>
</template>
<script>
import dayjs from 'dayjs';
const nowTime = dayjs().format('YYYY年MM月DD HH时mm分ss秒')
export default {
    data() {
        return {
            dateName: nowTime,
        }
    }
} 
</script>