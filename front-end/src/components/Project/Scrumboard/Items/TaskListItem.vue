<template>
  <!-- <div class="card tasklist-item" v-if="!isEditing" @click.prevent="startEditing"> -->
  <div class="card tasklist-item">    
    <BacklogPopup ref="newItemPopup" v-show="isEditing" @popup-toggled="handlePopupToggled">
      
      <template v-slot:handle>
        <div class="edit" v-if="!isNewItem"> 
          <div> <i class="fas fa-pen" @click="startEditing"></i> </div>
        </div> 
      </template>

      <template v-slot:content>
        <form>
          <h4>{{ heading }}</h4>
          <input
            name="listName"
            type="text"
            class="form-control my-1"
            v-model.trim="listForm.name"
            v-validate="'required'"
            data-vv-as="List Name"
            placeholder="Enter your list name"
          />
          <small class="text-danger" style="display:block">{{ errors.first("listName") }}</small>
          <button class="btn btn-sm btn-app mt-2" @click.prevent="handleTaskListSave">
            Save List
          </button>
        </form>
      </template>
    </BacklogPopup>
  
    <div class="card-body">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span> {{ displayText }} </span>
      </div>
    </div>
  
  </div>

  
  <!-- <div class="card" v-else>
    <div class="card-body">
      <form class="form">
        <div class="form-group">
          <textarea
            name="itemDetails"
            rows="3"
            class="form-control"
            v-model.trim="form.text"
            v-validate="'required'"
            data-vv-as="Item Details"
            placeholder="Your item description"
          ></textarea>
          <small class="text-danger">{{ errors.first("itemDetails") }}</small>
        </div>

        <div :class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']">
          <div>
            <button class="btn btn-outline-secondary btn-sm mr-2" @click.prevent="save">
              Save
            </button>
            <button class="btn btn-outline-secondary btn-sm" @click.prevent="cancel">
              Cancel
            </button>
          </div>
          <div v-show="!isNewItem">
            <button class="btn btn-sm text-danger" @click.prevent="remove">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  </div> -->

</template>

<script>
import { mapActions } from "vuex"
import BacklogPopup from '../Details/BacklogPopup.vue'

export default {
  components: { 
    BacklogPopup 
    },
  props: ["item", "list", "board"],
  computed: {
    isNewItem() {
      return this.item.id == ""
    },
    displayText() {
      return this.isNewItem ? "+ New Item" : this.item.text
    },
  },
  data() {
    return {
      isEditing: false,
      form: {
        id: "",
        text: ""
      }
    }
  },
  methods: {
    ...mapActions({
      saveTaskListItem: "saveTaskListItem",
      deleteTaskListItem: "deleteTaskListItem"
    }),

    startEditing() {
      this.form.id = this.item.id
      this.form.text = this.item.text
      this.isEditing = true
      this.$emit("item-editing")
    },

    clearForm() {
      this.form.id = ""
      this.form.text = ""
    },

    save() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const updatedItem = {
            id: this.form.id,
            text: this.form.text
          }
          this.saveTaskListItem({
            boardId: this.board.id,
            listId: this.list.id,
            item: updatedItem
          })
          this.isEditing = false
          this.$emit("item-edited")
          this.$validator.reset()
        }
      })
    },

    cancel() {
      this.isEditing = false
      this.$emit("item-cancelled")
    },

    remove() {
      this.deleteTaskListItem({
        boardId: this.board.id,
        listId: this.list.id,
        item: this.item
      })
      this.$emit("item-deleted")
    },

    handlePopupToggled(isOpen) {
      if (!isOpen) {
        this.form.id = 0
        this.form.text = ""
        this.$validator.reset()
      }
    },
  }
}
</script>
