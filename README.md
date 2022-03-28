### @izilong/vue-ui

- Install
```shell
$ npm i @izilong/vue-ui
$ or yarn add @izilong/vue-ui
```


- js
```shell
import VueUI, { Toast, VurtualList } from '@izilong/vue-ui'
```

Toast
```js
<!--type = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'loading'-->

Toast({ type, message, duration, isMaskShow, position })

Toast[type](message, duration, isMaskShow, position)

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