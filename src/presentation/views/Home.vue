<script setup lang="ts">
import Searched from "./comom/Searched.vue";
import Filter from "./filter.vue";
import MenuItemList from "./MenuItemList.vue";
</script>

<template>
 <div class="content">
    <div>
      <Filter class="filter" />
    </div>
    <div >
      <div class="search">
        <Searched />
      </div>

      <div>
        <MenuItemList/>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
}

.search {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.filter {
  background-color: whitesmoke;
  border-radius: 20px;
  border: 1px solid gray;
}

.content {
  display: grid;
  grid-template-columns: max-content 1fr;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 90px;
  gap: 20px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
