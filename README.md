### @izilong/vue-ui

- Install
```shell
$ npm i @izilong/vue-ui
$ or yarn add @izilong/vue-ui
```


- js
```js
import VUI, { Notify, Loading, VurtualList, Confirm } from '@izilong/vue-ui'
import '@izilong/vue-ui/dist/css/index.css'
```

- Notify
```js
Notify({ type, message, duration, isMaskShow, style })
Notify[type](message, duration, isMaskShow, style)
```

- Loading
```js
Loading({ message, duration, imgSrc isMaskShow, style })
```

- VirtualList
```vue
<VirtualList :listData="listData" :handlePullupLoad="addList">
    <template #default="{ visibleListData, virtualIdx, positionList }">
        <li
          class="item" v-for="(item, idx) of visibleListData"
          :data-virtual-idx="virtualIdx + idx"
          :key="item.id">
            <span>{{item.id}}</span>
            <p>{{positionList[virtualIdx + idx]}}</p>
            <p class="txt">{{item.text}}</p>
        </li>
    </template>
</VirtualList>
```


## API Reference

```js
Notify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Optional**. primary / success / danger / warning / info
| `title` | `string` | **Optional**. title
| `content` | `string` | **Required**. content
| `duration` | `number` | **Optional**. duration
| `style` | `object` | **Optional**. {top: 10%, left: 50%}



```js
Loading
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imgSrc` | `string` | **Optional**. import imgSrc from xxx
| `body` | `string` | **Optional**. HTMLElement
| `tip` | `string` | **Optional**. tip
| `duration` | `number` | **Optional**. duration
| `isMaskShow` | `boolean` | **Optional**. is show mask
| `style` | `object` | **Optional**. {top: 10%, left: 50%}


```js
Confirm
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Optional**. title
| `content` | `string` | **Required**. content
| `leftText` | `number` | **Optional**. leftText
| `rightText` | `number` | **Optional**. rightText
| `isMaskShow` | `boolean` | **Optional**. is show mask
| `style` | `object` | **Optional**. {top: 10%, left: 50%}
