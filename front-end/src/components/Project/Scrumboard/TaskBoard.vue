<template>
  <div class="scrolling-wrapper">   
    <!-- <Header v-if="['Task-board'].includes($route.name)"></Header> -->
    <Header></Header>
    <draggable v-model="lists" class="row flex-nowrap mt-1" v-bind="getDragOptions">
      <TaskList v-for="(listItem, index) in lists" :key="index" :board="getBoard" :list="listItem"></TaskList>
    </draggable>
  </div>
</template>

<script>
import TaskList from "../Scrumboard/Lists/TaskList.vue"
import Header from "./Header.vue"
import Draggable from "vuedraggable"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "Board",
  components: {
    TaskList,
    Draggable,
    Header
  },
  computed: {
    ...mapGetters({
      boards: "allBoards",
      isLoading: "isLoading"
    }),
    getDragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        handle: ".heading",
        disabled: !this.shouldAllowListOrder,
        group: "kanban-board-lists"
      }
    },
    param() {
      return this.$route.params.id
    },
    shouldAllowListOrder() {
      return this.isDesktop || this.isTablet
    },
    getBoard() {
      return this.boards.find(b => b.id == this.param)
    },
    lists: {
      get() {
        return this.getBoard ? this.getBoard.lists.filter(l => !l.archived) : []
      },
      async set(value) {
        await this.reorderTaskLists({
          boardId: this.param,
          lists: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      reorderTaskLists: "reorderTaskLists",
      setActiveTaskBoard: "setActiveTaskBoard",
      getMyTasks: "getMyTasks",
      getScrumBoard: "getScrumBoard",
    })
  },
  created() {
    if (this.getBoard) {
      this.setActiveTaskBoard({
        board: this.getBoard
      })
    }
    // this.getEmulatedData()
    // if kanban then load my tasks
    // if (this.param === "KANBAN_BOARD") {
    //   this.getMyTasks()
    //   console.log("CREATEDDDD KANBAAAN")
    // } else if (this.param === "SCRUM_BOARD") {
    //   this.getScrumBoard()   
    //   console.log("CREATEDDDD SCRUMMMMM boARD")
    // }
    console.log("CREATEDDDD ", this.$route.name)
  },
  watch:{
    $route(to, from){
      if (this.getBoard) {
        this.setActiveTaskBoard({
          board: this.getBoard
        })
        if (this.param === "KANBAN_BOARD") {
          this.getMyTasks()
          console.log("CREATEDDDD KANBAAAN")
        } else if (this.param === "SCRUM_BOARD") {
          this.getScrumBoard()   
          console.log("CREATEDDDD SCRUMMMMM boARD")
        }
      }
    }
  }, 
}
</script>
