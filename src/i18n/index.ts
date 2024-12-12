import { createI18n } from 'vue-i18n'
import locale from '@opentiny/vue-locale'

export default (i18n: any) =>
    locale.initI18n({
        i18n,
        createI18n,
        messages: {
            zhCN: {
                test: '中文'
            },
            enUS: {
                test: 'English'
            }
        }
    })