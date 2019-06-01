import Vue from 'vue'
import VueI18N from 'vue-i18n'
import { getLocale, saveLocale } from '../util/localStorage'
import cn from './cn.js'
import en from './en.js'

Vue.use(VueI18N)

const messages = {
    cn,
    en
}
let locale = getLocale()
if (!locale) {
    locale = 'cn'
} else {
    saveLocale(locale)
}
const i18n = new VueI18N({
    locale,
    messages
})

export default i18n
