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
      
      <div style="position:relative; top:-15px; max-height:30px; right:-430px;">
        <v-row style="height:8px"
        align="center"
        >
        <v-col cols="12">
          <v-autocomplete 
            v-model="searchedSprintName"
            :items="getSprintNames()"
            outlined
            label="Search Sprints"
          ></v-autocomplete>
        </v-col>
        </v-row>
        <v-btn style="position:relative; right:-160px; top:25px"
          elevation="2"
          class="mx-2"
          fab
          small
          color="#7A96A3"
          @click="putSprintInFront(searchedSprintName)"
          
        >
          <v-icon dark>
          fas fa-search
        </v-icon>
      </v-btn>
      </div>
      
      <!-- Only show above options on ScrumBoard -->
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
    items: ['foo', 'bar', 'fizz', 'buzz'],
    values: ['foo', 'bar'],
    value: null,
    searchedSprintName:'',
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
      getSprintNames: "getSprintNames",
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
      connectSprint: "connectSprint",
      addTaskAndConnectSprint: "addTaskAndConnectSprint",
      putSprintInFront: "putSprintInFront",
      
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

    addTaskAndConnectSprint_() {
      let task = {
        name: this.taskName,
        description: "telika ftasame os edo",
        status: "toDo",
        estimated_duration: "10",
        userStory: this.getUserStoryIdbyName(this.storyName)
      }

      // get the name of sprint
      var sprintName = this.sprintName

      this.addTaskAndConnectSprint({task:task, sprintName:sprintName})
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