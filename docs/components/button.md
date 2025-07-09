---
title: Button
description: 按钮组件
---

# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

```vue
<template>
  <el-button>按钮</el-button>
</template>
```

## 不同类型

提供了 `type` 属性来定义按钮的类型。

```vue
<template>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</template>
```

## 禁用状态

通过 `disabled` 属性来控制按钮的禁用状态。

```vue
<template>
  <el-button disabled>禁用按钮</el-button>
</template>
```

## 图标按钮

通过 `icon` 属性来定义按钮的图标。

```vue
<template>
  <el-button icon="el-icon-eleme">图标按钮</el-button>
</template>
```
