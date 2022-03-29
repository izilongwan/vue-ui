### @izilong/vue-ui

- Install
```shell
$ npm i @izilong/vue-ui
$ or yarn add @izilong/vue-ui
```


- js
```shell
import VueUI, { Notify, Loading, VurtualList } from '@izilong/vue-ui'
```

Notify
```js
<!--type = 'primary' | 'success' | 'danger' | 'warning' | 'info'-->

Notify({ type, message, duration, isMaskShow, position })

Notify[type](message, duration, isMaskShow, position)

```

```js
Loading({ message, duration, isMaskShow, position })
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
