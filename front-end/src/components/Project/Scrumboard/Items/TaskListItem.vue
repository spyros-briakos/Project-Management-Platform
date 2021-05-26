<template>
  <div class="card tasklist-item">   

    <BacklogPopup ref="newItemPopup" @popuptoggled1="handlePopupToggled1">
      <template v-slot:handle1>
        
        <span class="edit" v-if="!isNewItem"> 
          <i class="fas fa-pen" @click="startEditing"></i> 
        </span> 
      </template>

      <!-- <template v-slot:content1>
        <div class="card">
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
      </template>  -->

      <template v-slot:content1>
      <form>
        <!-- <h4>{{ heading }}</h4> -->
        
        <!-- <dropdown class="my-dropdown-toggle"
          :options="arrayOfObjects" 
          :selected="object" 
          v-on:updateOption="methodToRunOnSelect" 
          :placeholder="'Select an Item'"
          :closeOnOutsideClick="boolean">
        </dropdown> -->
        
        <input style="margin-top: 100px;"
          name="itemDetails"
          rows="3"
          class="form-control"
          v-model.trim="form.text"
          v-validate="'required'"
          data-vv-as="Item Details"
          placeholder="Your item description"
        />
        <small class="text-danger" style="display:block">{{ errors.first("itemDetails") }}</small>
        <!-- <div :class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']"> -->
        <!-- <div> -->
          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 350px; left:230px;" @click.prevent="save">
            Save
          </button> 
          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 350px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>
        <!-- </div> -->
        <!-- <div v-show="!isNewItem"> -->
          <button class="btn btn-sm text-danger"  style="position:fixed; top: 350px; left:420px;" @click.prevent="remove">
            Delete
          </button>
        <!-- </div> -->
      <!-- </div> -->
      </form>
    </template>

    </BacklogPopup>

    <div class="card-body">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span> {{ displayText }} </span>
      </div>
    </div>
  
  </div>
</template>

<script>
import { mapActions } from "vuex"
import BacklogPopup from '../Details/BacklogPopup.vue'
// import dropdown from 'vue-dropdowns';

export default {
  components: { 
    BacklogPopup,
    // 'dropdown': dropdown,
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
      },
      arrayOfObjects: [],
      object: {
        name: 'Object Name',
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
          this.$emit("item-edited")
          this.$validator.reset()
        }
        this.$refs.newItemPopup.close()
      })
    },
    cancel() {
      this.$emit("item-cancelled")
      this.$refs.newItemPopup.close()
    },
    remove() {
      this.deleteTaskListItem({
        boardId: this.board.id,
        listId: this.list.id,
        item: this.item
      })
      this.$emit("item-deleted")
      this.$refs.newItemPopup.close()
    },
    handlePopupToggled1(isOpen) {
      if (!isOpen) {
        this.form.id = 0
        this.form.text = ""
        this.$validator.reset()
      }
    },
    terminate() {
      this.isEditing = false
    }
  }
}
</script>

<style lang="scss" scoped>
.my-dropdown-toggle {
  border-radius: 5px;

  ::v-deep .dropdown-toggle {
    color: tomato;
    font-size: 25px;
    font-weight: 800;
  }

  ::v-deep .dropdown-toggle-placeholder {
    color: #c4c4c4;
  }
}
</style>
