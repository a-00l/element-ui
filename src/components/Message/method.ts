import { render, h } from 'vue'
import type { CreateMessage } from './types'
import MessageConstructor from './Message.vue'
export const createMessage = (props: CreateMessage) => {
  const container = document.createElement('div')
  const Destroy = () => {
    // 卸载dom节点
    render(null, container)
  }

  const newPrpos = {
    ...props,
    onDestroy: Destroy
  }

  const vnode = h(MessageConstructor, newPrpos)
  // 将虚拟节点nvode挂载到container中
  // 并渲染为真实dom节点
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
}
