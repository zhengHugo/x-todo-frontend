<template>
  <div id="app">
    <div class="container">
      <AddItem/>
      <FilterItems/>
      <ItemList/>
    </div>
  </div>
</template>

<script>
import ItemList from "@/components/ItemList";
import AddItem from "@/components/AddItem";
import FilterItems from "@/components/FilterItems";

export default {
  name: 'App',
  components: {
    FilterItems,
    AddItem,
    ItemList
  }
}
</script>

<style>
body {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 1.6;
  background: #e8f7f0;
}

.container {
  max-width: 1100px;
  margin: auto;
  overflow: auto;
  padding: 0 2rem;
}
</style>
