import { render, h, shallowReactive } from 'vue'
import type { CreateMessage, MessageArray } from './types'
import MessageConstructor from './Message.vue'
import { useZindex } from '@/hooks/useZindx'
import { app } from '@/main'

// 存储所有message消息
const messageArray: MessageArray[] = shallowReactive([])
// id自增
let countId = 1

export const createMessage = (props: CreateMessage) => {
  const id = `message_${countId++}`
  const container = document.createElement('div')
  // zIndex自增
  const { addIndex } = useZindex()
  const Destroy = () => {
    // 在数组中查询该message是否存在
    const index = getIndex(messageArray, id)
    if (index === -1) return

    // 存在：删除该message
    messageArray.splice(index, 1)

    // 卸载dom节点
    render(null, container)
  }

  const manualDestroy = () => {
    const index = getIndex(messageArray, id)

    // 手动关闭message
    messageArray[index].vm.exposed!.visible.value = false
  }

  const newPrpos = {
    ...props,
    id,
    zIndex: addIndex(),
    onDestroy: Destroy,
  }

  const vnode = h(MessageConstructor, newPrpos)
  vnode.appContext = app._context

  // 将虚拟节点nvode挂载到container中
  // 并渲染为真实dom节点
  render(vnode, container)
  console.log(vnode);

  // 实例对象添加
  const instance = {
    VNode: vnode,
    id,
    props: newPrpos,
    vm: vnode.component!,
    destroy: manualDestroy
  }

  messageArray.push(instance)

  document.body.appendChild(container.firstElementChild!)

  return instance
}

// 重新计算所有message的top偏移值
export const deleteMessage = (id: string) => {
  const index = getIndex(messageArray, id)

  // 执行动画
  messageArray[index].vm.exposed!.visible.value = false
  // 删除对应的数组，重新计算所有top偏移值
  messageArray.splice(index, 1)
}

// 返回元素的top偏移值
export const getBottomOffset = (id: string) => {
  const index = getIndex(messageArray, id)

  if (index <= 0) {
    return 0
  } else {
    // 返回上一个message的bottomOffset
    return messageArray[index - 1].vm.exposed!.bottomOffset.value
  }
}

// 获取元素的索引
const getIndex = (messageArray: MessageArray[], id: string) => {
  return messageArray.findIndex(item => item.id === id)
}
