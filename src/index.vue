<template>
  <div class="container">
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

    <button class="btn" @click="handleClick">ADD</button>
  </div>

</template>

<script>
import { VirtualList, Toast } from './components'
import faker from 'faker'
// import { VirtualList, Toast } from '../dist'

export default {
  name: 'About',
  components: {
    VirtualList
  },
  data() {
    return {
      listData: this.generatorData(),
    }
  },

  methods: {
    async addList(e, idx) {
      const data = await new Promise(resolve => {
        setTimeout(() => {
          resolve(this.generatorData(5, this.listData.length))
        }, 1500);
      })

      this.listData.push(...data)
    },

    handleClick() {
      const toast = Toast[this.getRandomType()](faker.lorem.words(4), -1, Math.random() > .5 ? true : false, { top: '20%', right: '0'}, () => console.log(1))
      Toast[this.getRandomType()]({ message: faker.lorem.words(4), onClose: () => console.log(0) })
      this.pos && (this.pos = null)
      setTimeout(() => {
        toast()
      }, 2000);
    },

    getRandomType() {
      const types = ['primary', 'success', 'danger', 'warning', 'info', 'loading']
      const random = ~~(Math.random() * types.length)

      return types[random]
    },

    generatorData(length = 12, basicIndex = 0) {
      return Array.from({ length }, (_, idx) => ({
        text: faker.lorem.sentences(),
        id: basicIndex + idx,
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  list-style: none;
  width: 350px;
  margin: 0 auto;
  box-sizing: border-box;

  &:not(:last-child) {
    border-bottom: 2px dashed #999;
    padding-bottom: 20px;
  }

  .txt {
    color: #888;
    margin: 0;
  }
}

.btn {
  position: relative;
  z-index: 1000;
}
</style>
