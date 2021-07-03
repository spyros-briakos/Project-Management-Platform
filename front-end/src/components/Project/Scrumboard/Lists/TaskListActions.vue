<template>
  <DetailsDropdown style="position: absolute;top: 12px;right: 10px; max-width: 100%;" ref="dropdown" >
    <template class v-slot:handle>
      <div style="font-size: 1.5em; position: relative; top: -2px; left:6px; color: black;">
      &#65049;
      </div>
    </template>
    <template v-slot:content>
      <label class="content-item" @click="showListEditPopup">Edit</label>
      <label class="content-item" style="position:absolute; top:35px; left:0px;" @click="showArchiveListPopup">Delete</label>
    </template>
  </DetailsDropdown>
</template>


<script>
import DetailsDropdown from "../Details/DetailsDropdown.vue"
import { Bus } from "@/utils/bus"
export default {
  props: ["board", "list"],
  components: {
    DetailsDropdown
  },
  methods: {
    showListEditPopup() {
      Bus.$emit("tasklist-editing", this.list)
      this.$refs.dropdown.close()
    },
    showArchiveListPopup() {
      Bus.$emit("tasklist-archiving", {
        board: this.board,
        list: this.list
      })
      this.$refs.dropdown.close()
    }
  }
}
</script>

<style scope>
.yy {
  font-size: 30em;
  padding-left: 10px;
}

</style>
