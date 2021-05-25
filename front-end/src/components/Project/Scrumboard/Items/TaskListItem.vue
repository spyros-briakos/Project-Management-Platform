<template>
  <!-- <div class="card tasklist-item" v-if="!isEditing"> -->
  <div class="card tasklist-item" v-if="!isEditing" @click.prevent="startEditing">

    <div class="edit" v-if="!isNewItem">
      <a href="https://www.google.com/search?q=david+damiano&ei=nWWrYMiWG5fbkgW1sKuoDg&gs_ssp=eJzj4tVP1zc0TDOuKjI0y6o0YPTiTUksy0xRSEnMzUzMywcAilcJlw&oq=davi&gs_lcp=Cgdnd3Mtd2l6EAMYATIECAAQQzIICC4QsQMQgwEyBAguEEMyAggAMgIIADIFCC4QsQMyBQguELEDMgIILjIFCAAQsQMyCAguELEDEIMBOgcIABCwAxBDOggIABCxAxCwAzoLCAAQsQMQgwEQsAM6BQgAELADOggIABCxAxCDAToICAAQxwEQowI6CAgAEMcBEK8BOgcILhBDEJMCOgoIABDHARCvARBDOgcILhCxAxBDUK4eWL4nYKk0aAJwAHgAgAHMAYgBywaSAQUwLjQuMZgBAKABAaoBB2d3cy13aXrIAQrAAQE&sclient=gws-wiz"><i class="fas fa-pen"></i></a>
    </div>
    
    <div class="card-body">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span> {{ displayText }} </span>
      </div>
    </div>
  
  </div>

  <div class="card" v-else>
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
  </div>

</template>

<script>
import { mapActions } from "vuex"
// import BacklogPopup from '../Details/BacklogPopup.vue'

export default {
  components: { 
    // BacklogPopup 
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
