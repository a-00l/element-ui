// import { h, render } from "vue";
// import type { MessageProps } from "../Message/types";
// import Message from "../Message/Message.vue";

// export const MyMessage = (props: MessageProps) => {
//   const container = document.createElement('div')
//   // 渲染虚拟dom节点
//   const VNode = h(Message, props)
//   // 渲染真实dom节点到容器
//   render(VNode, container)
//   const firstElement = container.firstElementChild
//   debugger
//   if (firstElement) {
//     document.body.appendChild(firstElement)
//   }
// }

import { render, h } from 'vue'
import type { MessageProps } from './types'
import MessageConstructor from './Message.vue'
export const createMessage = (props: MessageProps) => {
  debugger
  const container = document.createElement('div')
  const vnode = h(MessageConstructor, props)

  render(vnode, container)
  debugger
  console.log(container.firstChild);

  document.body.appendChild(container.firstElementChild!)
}
