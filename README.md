### @izilong/vue-ui

- Install
```shell
$ npm i @izilong/vue-ui
$ or yarn add @izilong/vue-ui
```


- js
```js
import VUI, { Notify, Loading, VurtualList } from '@izilong/vue-ui'
import '@izilong/vue-ui/dist/css/index.css'
```

- Notify
```js
Notify({ type, message, duration, isMaskShow, position })

Notify[type](message, duration, isMaskShow, position)

```

- Loading
```js
Loading({ message, duration, imgSrc isMaskShow, position })
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
| `message` | `string` | **Optional**. message
| `title` | `string` | **Optional**. title
| `duration` | `number` | **Optional**. duration
| `position` | `object` | **Optional**. {top: 10%, left: 50%}



```js
Loading
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `imgSrc` | `string` | **Optional**. img src
| `message` | `string` | **Optional**. message
| `duration` | `number` | **Optional**. duration
| `isMaskShow` | `boolean` | **Optional**. is show mask
| `position` | `object` | **Optional**. {top: 10%, left: 50%}
