<template>
  <div class="col-3 list-column list-width">
    <div class="heading" :style="{ backgroundColor: '#FF914D' }">
      <h4 class="heading-text text-center">{{ list.name }}</h4>
      <TaskListActions :board="board" :list="list"></TaskListActions>
    </div>
    <div class="cards cards-list">
      <draggable v-model="items" v-bind="dragOptions">
        <TaskListItem
          v-for="item in items"
          :item="item"
          :list="list"
          :board="board"
          :key="item.id"
          @item-edited="itemEdited"
          @item-cancelled="itemCancelled"
          @item-editing="itemEditing"
          @item-deleted="itemDeleted"
        ></TaskListItem>
      </draggable>
      <TaskListItem
        class="fixed-card1"
        :item="defaultItem"
        :list="list"
        :board="board"
        @item-edited="itemEdited"
        @item-cancelled="itemCancelled"
        @item-editing="itemEditing"
      ></TaskListItem>
    </div>
  </div>
</template>
<script>
import Draggable from "vuedraggable"
import TaskListActions from "./TaskListActions.vue"
import TaskListItem from "../Items/TaskListItem.vue"
import { mapActions } from "vuex"
export default {
  components: {
    TaskListItem,
    TaskListActions,
    Draggable
  },
  props: ["board", "list"],
  data() {
    return {
      isEditing: false
    }
  },
  computed: {
    defaultItem() {
      return {
        id: "",
        text: "",
        state: "defaultItem"
      }
    },
    dragOptions() {
      // console.log("TaskList.dragOptions isEditing:", this.isEditing)
      
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-list-items",
        disabled: this.isEditing || !this.shouldAllowTaskItemsReorder
      }
    },
    items: {
      get() {
        return this.list.items
      },
      set(reorderedListItems) {
        const payload = {
          boardId: this.board.id,
          listId: this.list.id,
          items: reorderedListItems
        }
        this.reorderTaskListItems(payload)
      }
    },
    shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet
    }
  },
  methods: {
    ...mapActions({
      reorderTaskListItems: "reorderTaskListItems"
    }),
    itemEditing() {
      this.isEditing = true
      // console.log("TaskList.itemEditing ", this.isEditing)
    },
    itemEdited() {
      this.isEditing = false
    },
    itemCancelled() {
      this.isEditing = false
    },
    itemDeleted() {
      this.isEditing = false
    }
  }
}
</script>
