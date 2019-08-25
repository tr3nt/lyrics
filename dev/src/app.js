window.Vue = require('vue');

import Vuetify from 'vuetify'
Vue.use(Vuetify);

Vue.component('index-component', require('./components/IndexComponent').default);
Vue.component('lyric-component', require('./components/LyricComponent').default);

window.EventBus = new Vue();

const app = new Vue({
    el: '#app',
    mounted() {
        this.$vuetify.theme.dark = true
    },
    vuetify: new Vuetify()
});
