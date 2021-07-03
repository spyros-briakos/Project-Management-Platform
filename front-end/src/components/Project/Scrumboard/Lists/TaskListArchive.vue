<template>
  <DetailsPopup style="position: absolute;top: 12px;right: 10px;" ref="popup">
    <template v-slot:content v-if="board && list">
      <h4>Θέλετε να διαγράψετε οριστικά το {{ list.name }};</h4>
      <button class="btn btn-sm btn-danger" @click="deleteSprint_(list)">
        Yes, please
      </button>
    </template>
  </DetailsPopup>
</template>

<script>
import DetailsPopup from "../Details/DetailsPopup"
import { mapActions } from "vuex"
import { Bus } from "@/utils/bus"
export default {
  components: {
    DetailsPopup
  },
  data() {
    return {
      board: null,
      list: null
    }
  },
  mounted() {
    Bus.$on("tasklist-archiving", this.handleTaskListArchiving)
  },
  methods: {
    ...mapActions({
      archiveTaskList: "archiveTaskList",
      deleteSprint: "deleteSprint"
    }),
    deleteSprint_() {
      // this.archiveTaskList({
      //   boardId: this.board.id,
      //   listId: this.list.id
      // })
      this.$refs.popup.close()
      this.deleteSprint(this.list.id)
    },
    handleTaskListArchiving(data) {
      this.board = data.board
      this.list = data.list
      this.$refs.popup.open()
    }
  }
}
</script>
