### @izilong/vue-ui

- Install｜安装
```shell
npm i @izilong/vue-ui
```
```shell
yarn add @izilong/vue-ui
```

- js中引入
```js
import ReactUI, { Notify, VurtualList, Loading, Confirm } from '@izilong/vue-ui'
```

```js
import '@izilong/vue-ui/dist/css/index.css'
```



## API Reference

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

- Notify
    | Parameter | Type     | Description                |
    | :-------- | :------- | :------------------------- |
    | `type` | `string` | **Optional**. primary \| success \| danger \| warning \| info
    | `title` | `string` | **Optional**. title
    | `content` | `string` | **Required**. content
    | `duration` | `number` | **Optional**. duration
    | `style` | `object` | **Optional**. {top: 10%, left: 50%}



- Loading
    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | `imgSrc` | `string` | **Optional**. import imgSrc from xxx
    | `body` | `string` | **Optional**. HTMLElement
    | `tip` | `string` | **Optional**. tip
    | `duration` | `number` | **Optional**. duration
    | `isMaskShow` | `boolean` | **Optional**. is show mask
    | `style` | `object` | **Optional**. { top: 10%, left: 50% }


- Confirm
    | Parameter | Type     | Description                       |
    | :-------- | :------- | :-------------------------------- |
    | `title` | `string` | **Optional**. title
    | `content` | `string` | **Required**. content
    | `leftText` | `number` | **Optional**. leftText
    | `rightText` | `number` | **Optional**. rightText
    | `isMaskShow` | `boolean` | **Optional**. is show mask
    | `style` | `object` | **Optional**. { top: 10%, left: 50% }
