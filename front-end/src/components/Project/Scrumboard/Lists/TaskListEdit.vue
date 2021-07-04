<template>
  <Sprintpopup ref="newListPopup" v-show="this.activeBoard" @popup-toggled="handlePopupToggled">
    <template v-slot:handle>
      <span class="nav-item btn btn-sm btn-app mr-2">+ New Sprint</span>
    </template>
    <template v-slot:content>
      <div class="popupheader">
        <h3 class="titlospopup1"> {{ heading }} </h3>
      </div>
      
      <form style="position: relative; height:38px; top:80px;">
       
          <h4 class="title1"> Τίτλος </h4>

          <input style="position:fixed; top: 95px; width: 660px"
            name="itemTitle"
            rows="3"
            class="form-control"
            v-model.trim="listForm.name"
            v-validate="'required'"
            data-vv-as="Item Details"
            placeholder="Γράψε έναν τίτλο"
          />

        <small class="text-danger" style="display:block">{{ errors.first("listName") }}</small>
          <h4 class= "title2"> Περιγραφή </h4>

          <textarea style="position:fixed; top: 170px; width: 660px; resize: none; max-height: 80px;"
            name="itemDetails"
            rows="3"
            maxlength='250'
            class="form-control"
            v-model.trim="listForm.text"
            data-vv-as="Item Details"
            placeholder="Γράψε μία περιγραφή"
          />

          <h6 class="title5"> 
            <v-row align="center">
              <v-col
                class="d-flex"
                cols="12"
                sm="4"
              >
        
            <v-select
              :items="selecteditems"
              label="Εκτιμώμενη Διάρκεια"
              v-model="listForm.duration"
              :value="selected"
            ></v-select>
            </v-col>
            </v-row>
          </h6>
          
          <h6 class="title4"> 
           
            <v-row align="right" style="position:fixed; left:372px; width:300px;">
              <v-col
                class="d-flex"
                cols="12"
                sm="12"
              >
            <v-select
              :items="selecteditems1"
              label="Κατάσταση"
              v-model="listForm.status"
              :value="selectedsprint"
            ></v-select>
            </v-col>
            </v-row>
          </h6>        
     
        <button class="btn btn-sm btn-app mt-2" style="position:fixed; top: 400px; left:300px;" @click.prevent="handleTaskListSave">
          Save Sprint
        </button>
      </form>
    </template>
  </Sprintpopup>
</template>

<script>
import Sprintpopup from "../Details/Sprintpopup.vue"
import { mapGetters, mapActions } from "vuex"
import { Bus } from "@/utils/bus"
export default {
  components: {
    Sprintpopup,
  },
  data() {
    return {
      listForm: {
        id: "",
        name: "",
        text: "",
        duration: "",
        status: ""
      },
      duration_: "",
      status_: "",
      selecteditems: ['2 Εβδομάδες', '3 Εβδομάδες', '4 Εβδομάδες'],
      selecteditems1: ['Εκκρεμεί', 'Σε εξέλιξη', 'Ολοκληρώθηκε'],
      selectedsprint: "Σε εξέλιξη",
    }
  },
  computed: {
    ...mapGetters({
      activeBoard: "activeBoard",
      getSprintbyId: "getSprintbyId",
    }),
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ""
    },
    heading() {
      return this.listForm.id ? "Edit Sprint" : "New Sprint"
    }
  },
  mounted() {
    Bus.$on("tasklist-editing", this.handleTaskListEditing)
  },
  methods: {
    ...mapActions({
      saveTaskList: "saveTaskList",
      addSprint: "addSprint",
      editSprint: "editSprint",
    }),
    handlePopupToggled(isOpen) {
      if (!isOpen) {
        this.listForm.id = 0
        this.listForm.name = ""
        this.listForm.text = ""
        this.listForm.duration = ""
        this.listForm.status = ""
        this.$validator.reset()
      }
    },
    handleTaskListEditing(list) {
      this.listForm.id = list.id
      this.listForm.name = list.name
      this.listForm.text = list.text
      // this.listForm.duration = list.duration
      // this.listForm.status = list.status
      // here needs an edit form
      this.$refs.newListPopup.open()
    },
    handleTaskListSave() {  
      
      if(this.listForm.status === 'Εκκρεμεί')
      {
        this.status_ = "toDo"
      }
      else if(this.listForm.status === 'Σε εξέλιξη')
      {
        this.status_ = "inProgress"
      }
      else if(this.listForm.status === 'Ολοκληρώθηκε')
      {
        this.status_ = "done"
      }
      else
      {
        console.log("error")
      }
      
      if(this.listForm.duration === '2 Εβδομάδες')
      {
        this.duration_ = "14"
      }
      else if(this.listForm.duration === '3 Εβδομάδες')
      {
        this.duration_ = "21"
      }
      else if(this.listForm.duration === '4 Εβδομάδες')
      {
        this.duration_ = "28"
      }
      else
      {
        console.log("error")
      }
  
      // Case: Edit
     if(this.listForm.id) {
        // get the current object for place holding
        const sprint = this.getSprintbyId(this.listForm.id)

        this.listForm.duration = (sprint.estimated_duration === "14" ? "2 Εβδομάδες" : sprint.estimated_duration === "21" ? "3 Ββδομάδες" : "4 Ββδομάδες")
        this.listForm.status = (sprint.status === "toDo" ? "Εκκρεμεί" : sprint.status === "inProgress" ? "Σε εξέλιξη" : "Ολοκληρώθηκε")

        // get output from form
        let sprintFormOutput = {
            name: this.listForm.name,
            description: this.listForm.text,
            status: this.status_,
            estimated_duration: this.duration_
        }

        // edit it
        sprint.name = sprintFormOutput.name
        sprint.description = sprintFormOutput.description
        sprint.status = sprintFormOutput.status
        sprint.estimated_duration = sprintFormOutput.estimated_duration

        // send request
        this.editSprint(sprint)
      }
      // Case: Create
      else {
      let sprint = {
              name: this.listForm.name,
              description: this.listForm.text,
              status: this.status_,
              estimated_duration: this.duration_
          }
        this.addSprint(sprint)
      }

      this.$validator.validateAll().then(async result => {
        if (result) {
          await this.saveTaskList({
            boardId: this.activeBoard.id,
            listId: this.listForm.id,
            name: this.listForm.name,
            description: this.listForm.text,
            status: this.listForm.status,
            estimated_duration: this.listForm.duration
          })
          this.$refs.newListPopup.close()
        }
      })
    },
  }
}
</script>
