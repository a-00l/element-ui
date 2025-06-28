import { createApp } from 'vue'
import App from './App.vue'
// 引入css
import './styles/index.scss'
// 引入图标库
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 引入所有图标
import { fas } from '@fortawesome/free-solid-svg-icons'

// 添加图标
library.add(fas)
createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
