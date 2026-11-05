---
title: 主题样式 Demo
date: 2022-10-02 19:07:05
tags: 
    - "Demo"
    - "Hexo"
    - "Hexo Theme"
    - "Hexo Theme Redefine"
thumbnail: https://assets.ohevan.com/img/d00ebf818778f3aad141173167ad0e52.png
sticky: 999
categories: 
    - "Demo"
    - "Hexo"
    - "Redefine Theme"
---

# H1 标题

## H2 标题

### H3 标题

#### H4标题

##### H5 标题

###### H6 标题

**加粗**

*斜体*

~~删除线~~

这是一段文本

![Screen Shot 2022-10-02 at 9.26.37 PM](https://assets.ohevan.com/img/d4fe8bc5f18fc77cb2064c99c64dc227.png)

`行内代码`

```
代码块
```

```python
print("代码高亮")
```

# 功能展示

## Font Awesome Pro v6.2.1

**Solid:** <i class="fa-solid fa-house"></i> <i class="fa-solid fa-envelope"></i> <i class="fa-solid fa-camera-retro"></i> <i class="fa-solid fa-cart-shopping"></i>

**Regular:** <i class="fa-regular fa-house"></i> <i class="fa-regular fa-envelope"></i> <i class="fa-regular fa-camera-retro"></i> <i class="fa-regular fa-cart-shopping"></i>

**Light:** <i class="fa-light fa-house"></i> <i class="fa-light fa-envelope"></i> <i class="fa-light fa-camera-retro"></i> <i class="fa-light fa-cart-shopping"></i>

**Thin:** <i class="fa-thin fa-house"></i> <i class="fa-thin fa-envelope"></i> <i class="fa-thin fa-camera-retro"></i> <i class="fa-thin fa-cart-shopping"></i>

**Duotone:** <i class="fa-duotone fa-house"></i> <i class="fa-duotone fa-envelope"></i> <i class="fa-duotone fa-camera-retro"></i> <i class="fa-duotone fa-cart-shopping"></i>

**Sharp Solid:** <i class="fa-sharp fa-solid fa-house"></i> <i class="fa-sharp fa-solid fa-envelope"></i> <i class="fa-sharp fa-solid fa-camera-retro"></i> <i class="fa-sharp fa-solid fa-cart-shopping"></i>

## Note Large大号提示块

::button[Note Large大号提示块文档]{href="https://redefine-docs.ohevan.com/modules/notes#%E5%A4%A7%E5%8F%B7%E6%8F%90%E7%A4%BA%E5%9D%97" icon="fa-solid fa-book" size="lg" align="center"}

:::notel{type="default" title="信息"}

换行测试
换行测试
换行测试

:::

:::notel{type="blue" title="提示"}

换行测试
换行测试
换行测试

:::

:::notel{type="green" title="自定义标题"}

换行测试
换行测试
换行测试

:::

:::notel{type="yellow" title="自定义标题"}

换行测试
换行测试
换行测试

:::

:::notel{type="orange" title="自定义标题"}

换行测试
换行测试
换行测试

:::

:::notel{type="red" title="自定义标题"}

换行测试
换行测试
换行测试

:::

## Note 小号提示块

::button[Note 小号提示块文档]{href="https://redefine-docs.ohevan.com/modules/notes#%E5%B0%8F%E5%8F%B7%E6%8F%90%E7%A4%BA%E5%9D%97" icon="fa-solid fa-book" size="lg" align="center"}

:::note{type="default"}

默认 提示块标签

:::

:::note{type="default"}

default 提示块标签

:::

:::note{type="primary"}

primary 提示块标签

:::

:::note{type="success"}

success 提示块标签

:::

:::note{type="info"}

info 提示块标签

:::

:::note{type="warning"}

warning 提示块标签

:::

:::note{type="danger"}

danger 提示块标签

:::

:::note{type="red" icon="fa-bolt"}

自定义提示块标签

:::

## Folding 折叠模块

::button[Folding 折叠模块文档]{href="https://redefine-docs.ohevan.com/modules/folding" icon="fa-solid fa-book" size="lg" align="center"}

::::folding[Folding 测试： 点击查看更多]{style="yellow"}

:::note{type="danger"}

danger 提示块标签

:::

:::note{type="tip"}

tip 提示块标签

:::

::::

::::folding[Folding 测试： 点击查看更多]{style="green"}

:::note{type="danger"}

danger 提示块标签

:::

:::note{type="tip"}

tip 提示块标签

:::

::::

::::folding[Folding 测试： 点击查看更多]{style="blue"}

啊啊啊啊啊

:::note{type="danger"}

danger 提示块标签

:::

:::note{type="tip"}

tip 提示块标签

:::

::::

## Tabs 分栏模块

::button[Tabs 分栏模块文档]{href="https://redefine-docs.ohevan.com/modules/tabs" icon="fa-solid fa-book" size="lg" align="center"}

::::tabs{name="First unique name"}

:::tab[First Tab]

**This is Tab 1.**

:::

:::tab[Second Tab]

**This is Tab 2.**

This is Tab 2.

:::

:::tab[Third Tab]

**This is Tab 3.**

This is Tab 3.

This is Tab 3.

:::

::::

## Button 按钮模块

不设置任何参数的 `::button[按钮]{href="/"}` 适合融入段落中。

regular 按钮适合独立于段落之外：

::button[示例博客]{href="https://www.ohevan.com" icon="fa-solid fa-play-circle"}

::button[示例博客]{href="https://www.ohevan.com" icon="fa-solid fa-play-circle"}

large 按钮更具有强调作用，建议搭配 center 使用：

::button[Button 按钮模块 开始使用]{href="https://redefine-docs.ohevan.com/modules/buttons" icon="fa-solid fa-book" size="lg" align="center"}

