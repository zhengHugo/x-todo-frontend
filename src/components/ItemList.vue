<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="completed-box"></span> = Completed
      </span>
    </div>
    <div class="item-list">
      <div
          v-for="item in allItems"
          v-bind:key="item.id"
          v-bind:class="{'is-complete': item.completed}"
          @dblclick="onDblClick(item)"
          class="item">
        {{ item.title }}
        <i @click="deleteItem(item.id)" class="fas fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "ItemList",
  methods: {
    ...mapActions(['fetchItems', 'deleteItem', 'updateItem']),

    onDblClick(item){
      const newItem = {
        id: item.id,
        title: item.title,
        completed: !item.completed
      };
      this.updateItem(newItem);
    }
  },
  computed: mapGetters(['allItems']),

  created() {
    this.fetchItems();
  }
}
</script>

<style scoped>
.item-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
}

.item {
  border: 1px solid #cccccc;
  background: #41b883;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.is-complete {
  background: #35495e;
  color: #ffffff;
}

i {
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}

.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.completed-box{
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}



@media (max-width: 500px) {
  .item-list {
    grid-template-columns: 1fr;
  }
}


</style>
