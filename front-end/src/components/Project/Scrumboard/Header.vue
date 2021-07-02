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
          Kanban Board 
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


<!-- Uncomment to test basic task user story functions -->

<!-- 
     <v-form
      x-small
      ref="form"
      v-model="valid"
    >
      <v-text-field
        x-small
        v-model="sprintName"
        label="Name"
      >Sprint name</v-text-field>
      <v-btn
        x-small
        class="mr-4"
        @click="addSprint_()"
      >
        New sprint
      </v-btn>
      <v-btn
        x-small
        color="error"
        class="mr-4"
        @click="deleteSprint_(sprintName)"
      >
      delete sprint
    </v-btn>
    <v-btn
      x-small
      color="warning"
      @click="editSprint_()"
    >
      Edit sprint
    </v-btn>
    </v-form>


    <v-form
      x-small
      ref="form"
      v-model="valid"
    >
      <v-text-field
        x-small
        v-model="storyName"
        label="Name"
      >User story name</v-text-field>
      <v-btn
        x-small
        class="mr-4"
        @click="addUserStory_()"
      >
        New userStory
      </v-btn>
      <v-btn
        x-small
        color="error"
        class="mr-4"
        @click="deleteUserStory_(storyName)"
      >
      delete story
    </v-btn>
    <v-btn
      x-small
      color="warning"
      @click="editUserStory_()"
    >
      Edit story
    </v-btn>
    </v-form>

    <v-form
      x-small
      ref="form"
      v-model="valid"
    >
      <v-text-field
        x-small
        v-model="taskName"
        label="Name"
      >Task name</v-text-field>
      <v-btn
        x-small
        class="mr-4"
        @click="addTask_()"
      >
        New task
      </v-btn>
      <v-btn
        x-small
        color="error"
        class="mr-4"
        @click="deleteTask_(taskName, storyName)"
    >
      delete task
    </v-btn>
     <v-btn
      x-small
      color="warning"
      @click="editTask_()"
    >
      Edit task
    </v-btn>
    </v-form> -->

    

        
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

    addSprint_() {
      let sprint = {
        name: this.sprintName,
        description: "testaroume edoo",
        status: "toDo",
        estimated_duration: "10"
      }
      this.addSprint(sprint)
    },

    editSprint_(){
      // get the current object for place holding
      const sprint = this.getSprintbyName(this.sprintName)

      // get output from form
      let sprintFormOutput = {
        name: "xeexee",
        description: "testaroume edoo",
        status: "toDo",
        estimated_duration: "10"
      }

      // edit it
      sprint.name = sprintFormOutput.name
      sprint.description = sprintFormOutput.description
      sprint.status = sprintFormOutput.status
      sprint.estimated_duration = sprintFormOutput.estimated_duration

      // send request
      this.editSprint(sprint)
    },

    deleteSprint_(sprintName){
      this.deleteSprint(this.getSprintIdbyName(sprintName))
    },


    addUserStory_() {
      let userStory = {
        name: this.storyName,
        description: "edo pali testaroume",
        label: "issue",
        status: "toDo",
        estimated_duration: "10",
      }
      this.addUserStory(userStory)
    },

    editUserStory_(){
      // get the current object for place holding
      var userStory = this.getUserStorybyName(this.storyName)

      // get output from form
      let userStoryFormOutput = {
        name: "xexexe",
        description: "edo pali testaroume",
        label: "issue",
        status: "toDo",
        estimated_duration: "10",
      }

      // edit it
      userStory.name =  userStoryFormOutput.name,
      userStory.description =  userStoryFormOutput.description,
      userStory.label =  userStoryFormOutput.label,
      userStory.status =  userStoryFormOutput.status,
      userStory.estimated_duration =  userStoryFormOutput.estimated_duration,

      // send request
      this.editUserStory(userStory)
    },

    deleteUserStory_(userStoryName){
      this.deleteUserStory(this.getUserStoryIdbyName(userStoryName))
    },

    addTask_() {
      let task = {
        name: this.taskName,
        description: "telika ftasame os edo",
        status: "toDo",
        estimated_duration: "10",
        userStory: this.getUserStoryIdbyName(this.storyName)
      }
      this.addTask(task)
    },

    editTask_() {
      // get the current object for place holding
      var task = this.getTaskbyNames(this.taskName, this.storyName)

      // get output from form
      let taskFormOutput = {
        name: "xexxe",
        description: "telika ftasame os edo",
        status: "toDo",
        estimated_duration: "10",
      }

      // edit it
      task.name = taskFormOutput.name
      task.description = taskFormOutput.description
      task.status = taskFormOutput.status
      task.estimated_duration = taskFormOutput.estimated_duration

      // send request
      this.editTask(task)
    },

    deleteTask_(taskName, storyName) {
      this.deleteTask(this.getTaskIdbyNames(taskName, storyName))
    },

  }
}
</script>