<template>
    <nav class="navbar navbar-light bg-faded">

      <div class="navbar-brand">
        <label>
          Scrum Board
          <span class="text-uppercase" v-show="this.activeBoard"> : {{ boardName }} </span>
        </label>
      </div>  

        <div>
          <div class="form-outline">
            <input type="search" id="form1" class="form-control"  placeholder="Search title.."/>
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