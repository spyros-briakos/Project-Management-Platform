<template>
    <!-- <nav class="navbar"> -->
    <nav class="navbar navbar-light bg-faded">

      <div class="navbar-brand">
        <label>
          Scrum Board
          <span class="text-uppercase" v-show="this.activeBoard"> : {{ boardName }} </span>
        </label>
        <div id="searching">
          <div class="search-wrapper">
            <input type="text" v-model="search" placeholder="Search title.."/>
                <!-- <label>Search title:</label> -->
          </div>
        </div>
      </div>  
      
      <div class="d-flex justify-content-end" v-if="!isLoading">
        <TaskListRestore></TaskListRestore>
        <TaskListEdit></TaskListEdit>
        <TaskListArchive></TaskListArchive>
      </div>

    </nav>
</template>

<script>
import { mapGetters } from "vuex"
import TaskListEdit from "./Lists/TaskListEdit"
import TaskListRestore from "./Lists/TaskListRestore"
import TaskListArchive from "./Lists/TaskListArchive"
export default {
  components: {
    TaskListEdit,
    TaskListRestore,
    TaskListArchive
  },
  computed: {
    ...mapGetters({
      activeBoard: "activeBoard",
      isLoading: "isLoading"
    }),
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ""
    }
  }
}
</script>

<style scoped>
  /* .navbar {
    position: fixed;
    display: flex;
    top: 80px;
    left: 70px;
    width: 95%;
    z-index: 1;
    background-color: #ffffff; 
  }  */
</style>