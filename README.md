### @izilong/vue-ui

- Install
```shell
$ npm i @izilong/vue-ui
$ or yarn add @izilong/vue-ui
```


- js
```js
import VueUI, { VNotify, VLoading, VVurtualList } from '@izilong/vue-ui'
import '@izilong/vue-ui/dist/css/index.css'
```

- VNotify
```js
VNotify({ type, message, duration, isMaskShow, position })

VNotify[type](message, duration, isMaskShow, position)

```

- VLoading
```js
VLoading({ message, duration, imgSrc isMaskShow, position })
```

- VVirtualList
```vue
<VVirtualList :listData="listData" :handlePullupLoad="addList">
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
</VVirtualList>
```


## API Reference

```js
VNotify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `type` | `string` | **Optional**. primary / success / danger / warning / info
| `message` | `string` | **Optional**. message
| `title` | `string` | **Optional**. title
| `duration` | `number` | **Optional**. duration
| `position` | `object` | **Optional**. {top: 10%, left: 50%}



```js
VLoading
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imgSrc` | `string` | **Optional**. img src
| `message` | `string` | **Optional**. message
| `duration` | `number` | **Optional**. duration
| `isMaskShow` | `boolean` | **Optional**. is show mask
| `position` | `object` | **Optional**. {top: 10%, left: 50%}
