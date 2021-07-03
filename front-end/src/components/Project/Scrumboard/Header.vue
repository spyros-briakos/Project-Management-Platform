<template>
    <nav class="navbar navbar-light bg-faded">

      <div class="navbar-brand">
        <!-- Case: ScrumBoard -->
        <label v-if="this.activeBoard.id=='SCRUM_BOARD'">
          Scrum Board 
          <span class="text-uppercase" v-show="this.activeBoard"> : {{ boardName }} </span>
        </label>
        <!-- Case: KanBoard -->
        <label v-else>
          Personal Board 
          <span class="text-uppercase" v-show="this.activeBoard"> : {{ boardName }} </span>
        </label>
      </div>  

        <!-- <div class="form-outline"  v-if="this.activeBoard.id=='SCRUM_BOARD'">
          <input type="search" id="form1" class="form-control"  placeholder="Search title.."/>
        </div>
        <div class="form-outline"  v-else>
          <input type="search" id="form1" class="form-control"  placeholder="Search title.."/>
        </div> -->
      
      <!-- Only show above options on ScrumBoard -->
      <!-- <div class="d-flex justify-content-end" v-if="!isLoading && this.activeBoard.id==='SCRUM_BOARD'" > -->
      <div class="d-flex justify-content-end" v-if="this.activeBoard.id=='SCRUM_BOARD'" >
        <TaskListEdit></TaskListEdit>
        <TaskListArchive></TaskListArchive>
        
      </div>
    </nav> 
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import TaskListEdit from "./Lists/TaskListEdit"
import TaskListArchive from "./Lists/TaskListArchive"
export default {
  components: {
    TaskListEdit,
    TaskListArchive
  },
  data: () => ({
    valid: true,
    sprintName: '',
    storyName: '',
    taskName: '',
  }),

  computed: {
    ...mapGetters({
      activeBoard: "activeBoard",
      isLoading: "isLoading",
      getSprintIdbyName: "getSprintIdbyName",
      getSprintbyName: "getSprintbyName",
      getUserStoryIdbyName: "getUserStoryIdbyName",
      getTaskIdbyNames: "getTaskIdbyNames",
      getUserStorybyName: "getUserStorybyName",
      getTaskbyNames: "getTaskbyNames",
    }),
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ""
    }
  },
  methods: {
      ...mapActions({
      addUserStory: "addUserStory",
      editUserStory: "editUserStory",
      deleteUserStory: "deleteUserStory",
      addTask: "addTask",
      editTask: "editTask",
      deleteTask: "deleteTask",
      addSprint: "addSprint",
      editSprint: "editSprint",
      deleteSprint: "deleteSprint",
    }),
  }
}
</script>