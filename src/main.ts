import { createApp } from 'vue'
import App from './App.vue'
// 引入css
import './styles/index.scss'
// 引入图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 引入所有图标
import { fas } from '@fortawesome/free-solid-svg-icons'

export const app = createApp(App)
// 添加图标
library.add(fas)
app
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
