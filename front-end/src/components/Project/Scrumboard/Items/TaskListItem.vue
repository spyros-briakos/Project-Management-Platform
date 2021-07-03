<template>
  
  <!--  -->
  <!-- Case: Kanban Board -> taskInKanban--> 
  <!--  -->
  <div class="card tasklist-item" v-if="board.id=='KANBAN_BOARD'">   
    <div class="card-body" v-if="!isNewItem">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span style = "font-weight: bold; font-size:15px;" v-if="!isNewItem"> {{ displayItemState }} </span> 
        <br v-if="!isNewItem">
        <span v-if="!isNewItem"> {{ displayTitle }} </span>
      </div>
    </div> 
    <v-btn
      elevation="1"
      fab
      x-small
      block
      v-if="item.state==='userStory'"
      @click="collapseTasks_()"
    > 
      <i class="fas fa-chevron-up" v-if="collapsedTasks"></i> 
      <i class="fas fa-chevron-down" v-else></i>
    </v-btn>
  </div> 

  <!--  -->
  <!-- Case: Scrum Board -> VisibleTask --> 
  <!--  -->
  <div class="card tasklist-item" v-else-if="item.state=='visibleTaskUnderUserStory' && board.id=='SCRUM_BOARD'">   
    
    <BacklogPopup ref="newItemPopup" @popuptoggled1="handlePopupToggled1">
      <template v-slot:handle1>
        
        <span class="edit" v-if="!isNewItem"> 
          <i class="fas fa-pen" @click="startEditing"></i> 
        </span> 
        <span class="edit_2" v-else> 
          <i class="fas fa-plus-circle" @click="startEditing"></i> 
        </span> 
      </template>

      <template v-slot:content1>

        <div class="popupheader">
          <h3 class="titlospopup"> {{ list.name }} </h3>
          <div class="temp">
            <multiselect v-model="selected" :options="options" :close-on-select="true" :searchable="false" :show-labels="false" placeholder="Kind" style="text-align:center; font-weight: bold; width:150px;"></multiselect>
          </div>
        </div>
        
        <form style="position: relative; height:38px; top:80px;">
          <!-- <h4>{{ heading }}</h4> -->
          <h4 class="title1"> Τίτλος </h4>

          <input style="position:fixed; top: 95px; width: 660px"
            name="itemTitle"
            rows="3"
            class="form-control"
            v-model.trim="form.title"
            v-validate="'required'"
            data-vv-as="Item Details"
            placeholder="Γράψε έναν τίτλο"
          />

          <h4 class= "title2"> Περιγραφή </h4>

          <textarea style="position:fixed; top: 170px; width: 660px; resize: none; max-height: 80px;"
            name="itemDetails"
            rows="3"
            maxlength='250'
            class="form-control"
            v-model.trim="form.text"
            data-vv-as="Item Details"
            placeholder="Γράψε μία περιγραφή"
          />

          <h6 class="title3">Εκτιμώμενη διάρκεια: 
            <!-- <span class="subtitle1">4 ημέρες</span> -->
            <select class=" custom-select custom-select-sm"  style="width: 19%;">
              <option value="2">2 Εβδομάδες</option>
              <option value="3">3 Εβδομάδες</option>
              <option value="4">4 Εβδομάδες</option>
            </select>
          </h6>
          <h6 class="title3">Κατηγορία: 
            <!-- <span class="subtitle1">Εκκρεμεί</span> -->
            <select class=" custom-select custom-select-sm"  style="width: 20%;">
              <option value="2">Εκκρεμεί</option>
              <option value="3">Σε εξέλιξη</option>
              <option value="4">Ολοκληρώθηκε</option>
            </select>
          </h6>        
          <h6 class="title3">User Story: 
            <!-- <span class="subtitle1">Τελικό</span> -->
            <select class=" custom-select custom-select-sm"  style="width: 20%;">
              <option value="2">Αρχικό</option>
              <option value="3">Μεσαίο</option>
              <option value="4">Τελικό</option>
            </select>
          </h6>       
            <!-- <v-list-item-title class="headline mb-1" style=" positive:fixed; right:100px; top:-117px;">
          Headline 5
        </v-list-item-title> -->
          <h6 class="title3" style="padding-left:480px; top:-17px; height: 0px;">Μέλη Task:
            <br>
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:305px; color: #cc99ff; cursor: pointer;"></i>            
            <i class="fas fa-id-card" style="position:fixed; font-size:30px; right:150px; top:305px; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:100px; top:305px; color: #ff9966; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:345px; color: red; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:150px; top:345px; color:blue; cursor: pointer;"></i>            
            <i class="fas fa-plus-circle" style="position:fixed; font-size:30px; right:100px; top:345px; cursor: pointer;"></i>            
          </h6>        
          <div class="vl" style="color:grey; border-left: 2px solid; height: 110px; top:270px; position:fixed; right:330px"></div> 

          <small class="text-danger" style="display:block">{{ errors.first("itemTitle") }}</small>
          <!-- <small class="text-danger" style="display:block" >{{ errors.first("itemDetails") }}</small> -->
          <!-- <div :class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']"> -->
          <!-- <div> -->
          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 400px; left:230px;" @click.prevent="save">
            Save
          </button> 
          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 400px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>
          <!-- </div> -->
          <!-- <div v-show="!isNewItem"> -->
          <button class="btn btn-sm text-danger"  style="position:fixed; top: 400px; left:420px;" @click.prevent="remove">
            Delete
          </button>
          <!-- </div> -->
        <!-- </div> -->
        </form>
        
      </template>

    </BacklogPopup>

    <div class="card-body" v-if="!isNewItem">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span style = "font-weight: bold; font-size:15px;" v-if="!isNewItem"> {{ displayItemState }} </span> 
        <br v-if="!isNewItem">
        <span v-if="!isNewItem"> {{ displayTitle }} </span>
      </div>
    </div>
    <v-btn
      elevation="1"
      fab
      x-small
      block
      v-if="item.state==='userStory'"
      @click="collapseTasks_()"
    > 
      <i class="fas fa-chevron-up" v-if="collapsedTasks"></i>
      <i class="fas fa-chevron-down" v-else></i>
    </v-btn>
  
  </div>
  
  <!--  -->
  <!-- Case: Scrum Board -> userStory --> 
  <!--  -->
  <div class="card tasklist-item" v-else-if="item.state=='userStory' && board.id=='SCRUM_BOARD'">   
    
    <!--  For Product Backlog (different popup from others) -->
    <BacklogPopup ref="newItemPopup" @popuptoggled1="handlePopupToggled1">
      <template v-slot:handle1>
        
        <span class="edit" v-if="!isNewItem"> 
          <i class="fas fa-pen" @click="startEditing"></i> 
        </span> 
        <span class="edit_2" v-else> 
          <i class="fas fa-plus-circle" @click="startEditing"></i> 
        </span> 
      </template>

      <template v-slot:content1>

        <div class="popupheader">
          <h3 class="titlospopup"> {{ list.name }} </h3>
          <div class="temp">
            <multiselect v-model="selected" :options="options" :close-on-select="true" :searchable="false" :show-labels="false" placeholder="Kind" style="text-align:center; font-weight: bold; width:150px;"></multiselect>
          </div>
        </div>
        
        <form style="position: relative; height:38px; top:80px;">
          <!-- <h4>{{ heading }}</h4> -->
          <h4 class="title1"> Τίτλος </h4>

          <input style="position:fixed; top: 95px; width: 660px"
            name="itemTitle"
            rows="3"
            class="form-control"
            v-model.trim="form.title"
            v-validate="'required'"
            data-vv-as="field"
            placeholder="Γράψε έναν τίτλο"
            type="text"
          >

          <p v-if="errors.has('form.title')">{{errors.first('form.title')}}</p>

          <h4 class= "title2"> Περιγραφή </h4>

          <textarea style="position:fixed; top: 170px; width: 660px; resize: none; max-height: 80px;"
            name="itemDetails"
            rows="3"
            maxlength='250'
            class="form-control"
            v-model.trim="form.text"
            data-vv-as="Item Details"
            placeholder="Γράψε μία περιγραφή"
          />

          <small class="text-danger" style="display:block" v-if="errors.itemTitle">{{ errors.first("itemTitle") }}</small>
          <!-- <small class="text-danger" style="display:block" >{{ errors.first("itemDetails") }}</small> -->
          <!-- <div :class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']"> -->
          <!-- <div> -->
          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 400px; left:230px;" @click.prevent="save">
            Save
          </button> 
          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 400px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>
          <!-- </div> -->
          <!-- <div v-show="!isNewItem"> -->
          <button class="btn btn-sm text-danger"  style="position:fixed; top: 400px; left:420px;" @click.prevent="remove">
            Delete
          </button>
          <!-- </div> -->
        <!-- </div> -->
        </form>
        
      </template>

    </BacklogPopup>

    <div class="card-body" v-if="!isNewItem">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span style = "font-weight: bold; font-size:15px;" v-if="!isNewItem"> {{ displayItemState }} </span> 
        <br v-if="!isNewItem">
        <span v-if="!isNewItem"> {{ displayTitle }} </span>
      </div>
    </div>
    <v-btn
      elevation="1"
      fab
      x-small
      block
      v-if="item.state==='userStory'"
      @click="collapseTasks_()"
    > 
      <i class="fas fa-chevron-up" v-if="collapsedTasks"></i>
      <i class="fas fa-chevron-down" v-else></i>
    </v-btn>
    
  </div>

  <!--  -->
  <!-- Case: Scrum Board -> taskInSprint --> 
  <!--  -->
  <div class="card tasklist-item" v-else-if="item.state=='taskInSprint' && board.id=='SCRUM_BOARD'">   
    
    <BacklogPopup ref="newItemPopup" @popuptoggled1="handlePopupToggled1">
      <template v-slot:handle1>
        
        <span class="edit" v-if="!isNewItem"> 
          <i class="fas fa-pen" @click="startEditing"></i> 
        </span> 
        <span class="edit_2" v-else> 
          <i class="fas fa-plus-circle" @click="startEditing"></i> 
        </span> 
      </template>

      <template v-slot:content1>

        <div class="popupheader">
          <h3 class="titlospopup"> {{ list.name }} </h3>
          <div class="temp">
            <multiselect v-model="selected" :options="options" :close-on-select="true" :searchable="false" :show-labels="false" placeholder="Kind" style="text-align:center; font-weight: bold; width:150px;"></multiselect>
          </div>
        </div>
        
        <form style="position: relative; height:38px; top:80px;">
          <!-- <h4>{{ heading }}</h4> -->
          <h4 class="title1"> Τίτλος </h4>

          <input style="position:fixed; top: 95px; width: 660px"
            name="itemTitle"
            rows="3"
            class="form-control"
            v-model.trim="form.title"
            v-validate="'required'"
            data-vv-as="Item Details"
            placeholder="Γράψε έναν τίτλο"
          />

          <h4 class= "title2"> Περιγραφή </h4>

          <textarea style="position:fixed; top: 170px; width: 660px; resize: none; max-height: 80px;"
            name="itemDetails"
            rows="3"
            maxlength='250'
            class="form-control"
            v-model.trim="form.text"
            data-vv-as="Item Details"
            placeholder="Γράψε μία περιγραφή"
          />

          <h6 class="title3">Εκτιμώμενη διάρκεια: 
            <!-- <span class="subtitle1">4 ημέρες</span> -->
            <select class=" custom-select custom-select-sm"  style="width: 19%;">
              <option value="2">2 Εβδομάδες</option>
              <option value="3">3 Εβδομάδες</option>
              <option value="4">4 Εβδομάδες</option>
            </select>
          </h6>
          <h6 class="title3">Κατηγορία: 
            <!-- <span class="subtitle1">Εκκρεμεί</span> -->
            <select class=" custom-select custom-select-sm"  style="width: 20%;">
              <option value="2">Εκκρεμεί</option>
              <option value="3">Σε εξέλιξη</option>
              <option value="4">Ολοκληρώθηκε</option>
            </select>
          </h6>        
          <h6 class="title3">User Story: 
            <!-- <span class="subtitle1">Τελικό</span> -->
            <select class=" custom-select custom-select-sm"  style="width: 20%;">
              <option value="2">Αρχικό</option>
              <option value="3">Μεσαίο</option>
              <option value="4">Τελικό</option>
            </select>
          </h6>       
            <!-- <v-list-item-title class="headline mb-1" style=" positive:fixed; right:100px; top:-117px;">
          Headline 5
        </v-list-item-title> -->
          <h6 class="title3" style="padding-left:480px; top:-17px; height: 0px;">Μέλη Task:
            <br>
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:305px; color: #cc99ff; cursor: pointer;"></i>            
            <i class="fas fa-id-card" style="position:fixed; font-size:30px; right:150px; top:305px; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:100px; top:305px; color: #ff9966; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:345px; color: red; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:150px; top:345px; color:blue; cursor: pointer;"></i>            
            <i class="fas fa-plus-circle" style="position:fixed; font-size:30px; right:100px; top:345px; cursor: pointer;"></i>            
          </h6>        
          <div class="vl" style="color:grey; border-left: 2px solid; height: 110px; top:270px; position:fixed; right:330px"></div> 

          <small class="text-danger" style="display:block">{{ errors.first("itemTitle") }}</small>
          <!-- <small class="text-danger" style="display:block" >{{ errors.first("itemDetails") }}</small> -->
          <!-- <div :class="[isNewItem ? 'text-center' : 'd-flex justify-content-between', 'form-group']"> -->
          <!-- <div> -->
          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 400px; left:230px;" @click.prevent="save">
            Save
          </button> 
          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 400px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>
          <!-- </div> -->
          <!-- <div v-show="!isNewItem"> -->
          <button class="btn btn-sm text-danger"  style="position:fixed; top: 400px; left:420px;" @click.prevent="remove">
            Delete
          </button>
          <!-- </div> -->
        <!-- </div> -->
        </form>
        
      </template>

    </BacklogPopup>

    <div class="card-body" v-if="!isNewItem">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span style = "font-weight: bold; font-size:15px;" v-if="!isNewItem"> {{ displayItemState }} </span> 
        <br v-if="!isNewItem">
        <span v-if="!isNewItem"> {{ displayTitle }} </span>
      </div>
    </div>
    <v-btn
      elevation="1"
      fab
      x-small
      block
      v-if="item.state==='userStory'"
      @click="collapseTasks_()"
    > 
      <i class="fas fa-chevron-up" v-if="collapsedTasks"></i>
      <i class="fas fa-chevron-down" v-else></i>
    </v-btn>
  
  </div>

</template>

<script>
import { mapActions } from "vuex"
import BacklogPopup from '../Details/BacklogPopup.vue'
import Multiselect from 'vue-multiselect'

export default {
  components: { 
    BacklogPopup,
    Multiselect,
    },
  props: ["item", "list", "board"],
  computed: {
    isNewItem() {
      return this.item.id == ""
    },
    displayText() {
      return this.isNewItem ? "" : this.item.text
    },
    displayTitle() {
      return this.isNewItem ? "" : this.item.title
    },
    displayItemState() {
      // var status = this.item.status
      // if (status === "userStory")
      //   return "User Story"
      // else if (status === "taskUnderUserStory" || status === "taskUnderUserSprint" || status === "kanbanTask")
      //   return "Task"
      return this.item.state === "userStory" ? "User Story" : "Task"
    },
  },
  data() {
    return {
      isEditing: false,
      form: {
        id: "",
        text: "",
        title: ""
      },
      selected: 'Task',
      options: ['User Story', 'Epic','Issue','Task'],
      collapsedTasks: false,
    }
  },
  methods: {
    ...mapActions({
      saveTaskListItem: "saveTaskListItem",
      deleteTaskListItem: "deleteTaskListItem",
      changeTasksState: "changeTasksState",
    }),

    collapseTasks_() {
      this.collapsedTasks = !this.collapsedTasks
      this.changeTasksState(this.item.id)
    },

    startEditing() {
      this.form.id = this.item.id
      this.form.title = this.item.title
      this.form.text = this.item.text
      this.isEditing = true
      // console.log("\n\nTaskListItem.startEditing ", this.isEditing)
      this.$emit("item-editing")
    },
    clearForm() {
      this.form.id = ""
      this.form.title = ""
      this.form.text = ""
    },
    save() {
        this.$validator.validateAll().then(result => {
        if (result) {
          const updatedItem = {
            id: this.form.id,
            title: this.form.title,
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
        this.form.title = ""
        this.form.text = ""
        this.$validator.reset()
      }
      this.isEditing = isOpen
      if(!isOpen)
        this.$emit("item-cancelled")
      // console.log("TaskListItem handle: ", this.isEditing, " and isOpen here: ", isOpen)
    },
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
