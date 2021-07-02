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

      <!-- <div> -->
        <div class="form-outline"  v-if="this.activeBoard.id=='SCRUM_BOARD'">
          <input type="search" id="form1" class="form-control"  placeholder="Search title.."/>
        </div>
        <div class="form-outline"  v-else>
          <input type="search" id="form1" class="form-control"  placeholder="Search title.."/>
        </div>
      <!-- </div> -->
      
      <!-- Only show above options on ScrumBoard -->
      <!-- <div class="d-flex justify-content-end" v-if="!isLoading && this.activeBoard.id==='SCRUM_BOARD'" > -->
      <div class="d-flex justify-content-end" v-if="this.activeBoard.id=='SCRUM_BOARD'" >
        <TaskListEdit></TaskListEdit>
        <TaskListArchive></TaskListArchive>


<!-- Uncomment to test basic task user story functions -->
        
    <!-- <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="nameStory"
        label="Name"
      ></v-text-field>
      <v-btn
        class="mr-4"
        @click="addUserStory_()"
      >
        New userStory
      </v-btn>
      <v-btn
      color="error"
      class="mr-4"
      @click="deleteUserStory_(nameStory)"
    >
      delete story
    </v-btn>
    <v-btn
      color="warning"
      @click="editUserStory_()"
    >
      Edit story
    </v-btn>
    </v-form>

        <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="nameTask"
        label="Name"
      ></v-text-field>
      <v-btn
        class="mr-4"
        @click="addTask_()"
      >
        New task
      </v-btn>
      <v-btn
      color="error"
      class="mr-4"
      @click="deleteTask_(nameTask)"
    >
      delete task
    </v-btn>
     <v-btn
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
    nameStory: '',
    nameTask: '',
  }),

  computed: {
    ...mapGetters({
      activeBoard: "activeBoard",
      isLoading: "isLoading"
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
      
    }),

    addUserStory_() {
      let userStory = {
        name: this.nameStory,
        description: "edo pali testaroume",
        label: "issue",
        status: "toDo",
        estimated_duration: "10",
      }
      this.addUserStory(userStory)
    },

    editUserStory_(){
      let userStory = {
        name: "xexexe",
        description: "edo pali testaroume",
        label: "issue",
        status: "toDo",
        estimated_duration: "10",
        _id: this.nameStory
      }
      this.editUserStory(userStory)
    },

    deleteUserStory_(userStoryId){
      this.deleteUserStory(userStoryId)
    },

    addTask_() {
      let task = {
        name: this.nameTask,
        description: "telika ftasame os edo",
        status: "toDo",
        estimated_duration: "10",
        userStory: this.nameStory
      }
      this.addTask(task)
    },

    editTask_() {
      let task = {
        name: "xexxe",
        description: "telika ftasame os edo",
        status: "toDo",
        estimated_duration: "10",
        userStory: "60ded8bc6de2bb1249947a15",
        _id: "60ded9216de2bb1249947a19",
      }
      this.editTask(task)
    },

    deleteTask_(taskId) {
      this.deleteTask(taskId)
    },

  }
}
</script>