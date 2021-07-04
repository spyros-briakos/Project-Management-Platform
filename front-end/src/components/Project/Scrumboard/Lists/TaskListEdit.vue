<template>
  <Sprintpopup ref="newListPopup" v-show="this.activeBoard" @popup-toggled="handlePopupToggled">
    <template v-slot:handle>
      <span class="nav-item btn btn-sm btn-app mr-2">+ New Sprint</span>
    </template>
    <template v-slot:content>
      <div class="popupheader">
        <h3 class="titlospopup1"> {{ heading }} </h3>
      </div>
      
      <form  style="position: relative; height:38px; top:80px;">
        <!-- <h4>{{ heading }}</h4> -->
        <!-- <input
          name="listName"
          type="text"
          class="form-control my-1"
          v-model.trim="listForm.name"
          v-validate="'required'"
          data-vv-as="List Name"
          placeholder="Enter your list name"
        /> -->


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
            <!-- <select class=" custom-select custom-select-sm"  style="width: 19%;">
              <option value="2">2 Εβδομάδες</option>
              <option value="3">3 Εβδομάδες</option>
              <option value="4">4 Εβδομάδες</option>
            </select> -->
            <v-select
              :items="selecteditems"
              label="Εκτημώμενη Διάρκεια"
            ></v-select>
            </v-col>
            </v-row>
          </h6>
          
          <h6 class="title4"> 
            <!-- <span class="subtitle1">Εκκρεμεί</span> -->
            <!-- <select class=" custom-select custom-select-sm"  style="width: 20%;">
              <option value="2">Εκκρεμεί</option>
              <option value="3">Σε εξέλιξη</option>
              <option value="4">Ολοκληρώθηκε</option>
            </select> -->
            <v-row align="right" style="position:fixed; left:372px; width:300px;">
              <v-col
                class="d-flex"
                cols="12"
                sm="12"
              >
            <v-select
              :items="selecteditems1"
              label="Κατάσταση"
            ></v-select>
            </v-col>
            </v-row>
          </h6>        
     

          <!-- <small class="text-danger" style="display:block">{{ errors.first("itemTitle") }}</small> -->


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
      selecteditems: ['2 Εβδομάδες', '3 Εβδομάδες', '4 Εβδομάδες'],
      selecteditems1: ['Εκκρεμεί', 'Σε εξέλιξη', 'Ολοκληρώθηκε']
    }
  },
  computed: {
    ...mapGetters({
      activeBoard: "activeBoard",
      getSprintbyName: "getSprintbyName",
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
      this.listForm.duration = list.duration
      this.listForm.status = list.status
      // here needs an edit form
      this.$refs.newListPopup.open()
    },
    handleTaskListSave() {  

      // here needs a create form
      // just add the form elemnts in this object

      if(this.listForm.status === 'Εκκρεμεί')
      {
        this.listForm.status = "toDo"
      }
      else if(this.listForm.status === 'Σε εξέλιξη')
      {
        this.listForm.status = "inProgress"
      }
      else if(this.listForm.status === 'Ολοκληρώθηκε')
      {
        this.listForm.status = "done"
      }
      else
      {
        console.log("error")
      }

      if(this.listForm.duration === '2 Εβδομάδες')
      {
        this.listForm.duration = "14"
      }
      else if(this.listForm.duration === '3 Εβδομάδες')
      {
        this.listForm.duration = "21"
      }
      else if(this.listForm.duration === '4 Εβδομάδες')
      {
        this.listForm.duration = "28"
      }
      else
      {
        console.log("error")
      }

      let sprint = {
                // like this
                name: this.listForm.name,
                description: this.listForm.text,
                status: this.listForm.status,
                estimated_duration: this.listForm.duration
            }
      // and call this method @click
      // this.editSprint(sprint)
      this.addSprint(sprint)

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
            // let sprint = {
            //     name: "Sprint testy",
            //     description: "testaroume edoo",
            //     status: "toDo",
            //     estimated_duration: "10"
            // }

            // let userStory = {
            //     name: "Test Story",
            //     description: "testaroume pali edoo",
            //     label: "issue",
            //     status: "toDo",
            //     estimated_duration: "10"
            // }

            // // let task = {
            // //     name: "proto taskoo",
            // //     description: "malakizomaste edo",
            // //     status: "toDo",
            // //     estimated_duration: "3",
            // //     userStory: "Test Story"
            // // }
            
            // this.addSprint(sprint)
            // this.addUserStory(userStory)
            // // .then(this.addTask(task))
</script>
