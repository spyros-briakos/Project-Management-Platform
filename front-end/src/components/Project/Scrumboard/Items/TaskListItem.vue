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
          <i class="fas fa-plus-circle"  @click="startEditing"></i> 
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

          <h6 class="title3" style="top:65px;"> 
            <v-row align="center">
              <v-col
                class="d-flex"
                cols="12"
                sm="4"
              >
            
            <v-select
              :items="selecteditems"
              label="Εκτιμώμενη Διάρκεια"
            ></v-select>
            </v-col>
            </v-row>
          </h6>

          <h6 class="title3" style="position:fixed; top:297px; left:100px;"> 
            
            <v-row align="right" style="position:fixed; left:20px; width:300px;">
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

          <h6 class="title3" style="position:fixed; top:345px; left:100px;"> 
         
            <v-row align="right" style="position:fixed; left:20px; width:300px;">
              <v-col
                class="d-flex"
                cols="12"
                sm="12"
              >
            <v-select
              :items=getUserStoriesNames  
              label="User Story"
            ></v-select>
            </v-col>
            </v-row>
          </h6>    

          <!-- <h6 class="title3" style="padding-left:480px; top:-17px; height: 0px;">Μέλη Task:
            <br>
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:305px; color: #cc99ff; cursor: pointer;"></i>            
            <i class="fas fa-id-card" style="position:fixed; font-size:30px; right:150px; top:305px; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:100px; top:305px; color: #ff9966; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:345px; color: red; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:150px; top:345px; color:blue; cursor: pointer;"></i>            
            <i class="fas fa-plus-circle" style="position:fixed; font-size:30px; right:100px; top:345px; cursor: pointer;"></i>            
          </h6>        
          <div class="vl" style="color:grey; border-left: 2px solid; height: 110px; top:270px; position:fixed; right:330px"></div>  -->

          <div class="text-center" style="position:fixed; right:50px; top:260px; max-width:300px">
            <v-row justify="space-around">
            <v-col
              cols="1"
              sm="10"
              md="12"
            >
              <v-sheet
                class="py-4 px-1"
              >
                <v-chip-group
                  multiple
                  active-class="primary--text"
                >
                  <v-chip
                    v-for="tag in getTaskMembersbyId(item.id)"
                    :key="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
            </v-row>

            <!-- <div class="text-center" style="position:fixed; right:50px; top:300px;"> -->
              <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="#48C0A4"
                @click="joinTask(item.id)"
              >
                Join Task
              </v-btn>

               <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color=#F78A37
                @click="leaveTask(item.id)"
              >
                Leave Task
              </v-btn>
            </div>

          <small class="text-danger" style="display:block">{{ errors.first("itemTitle") }}</small>
          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 400px; left:230px;" @click.prevent="save(2)">
            Save
          </button> 
          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 400px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>
          <button class="btn btn-sm text-danger"  style="position:fixed; top: 400px; left:420px;" @click.prevent="remove">
            Delete
          </button>
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
  
  </div>
  
  <!--  -->
  <!-- Case: Scrum Board -> hiddenTaskUnderUserStory --> 
  <!--  -->
  <div v-else-if="list.name=='Product Backlog' && item.state=='hiddenTaskUnderUserStory'">   
  
  </div>

  <!--  -->
  <!-- Case: Scrum Board -> userStory --> 
  <!--  -->
  <div class="card tasklist-item1" v-else-if="list.name=='Product Backlog'">   
    
    <!--  For Product Backlog (different popup from others) -->
    <BacklogPopup ref="newItemPopup" @popuptoggled1="handlePopupToggled1">
      <template v-slot:handle1>
        
        <span class="edit" v-if="!isNewItem"> 
          <i class="fas fa-pen" @click="startEditing"></i> 
        </span> 
        <span class="edit_2" v-else> 
          <i class="fas fa-plus-circle"  @click="startEditing"></i> 
        </span> 
      </template>

      <template v-slot:content1>

        <div class="popupheader">
          <h3 class="titlospopup"> {{ list.name }} </h3>
          <div class="temp">
            <multiselect v-model="default_user_story" :options="options" :close-on-select="true" :searchable="false" :show-labels="false" style="text-align:center; font-weight: bold; width:150px;"></multiselect>
          </div>
        </div>
        
        <form style="position: relative; height:38px; top:80px;">

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
          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 400px; left:230px;" @click.prevent="save(1)">
            Save
          </button> 
          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 400px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>
          <button class="btn btn-sm text-danger"  style="position:fixed; top: 400px; left:420px;" @click.prevent="remove">
            Delete
          </button>
        </form>
        
      </template>

    </BacklogPopup>

    <div class="card-body" v-if="!isNewItem">
      <div :class="[isNewItem ? 'text-center text-dark font-weight-bold disable-select' : 'text-dark disable-select']">
        <span style = "font-weight: bold; font-size:15px;" v-if="!isNewItem"> {{ displayItemState }} </span> 
        <br v-if="!isNewItem">
        <span v-if="!isNewItem"> {{ displayTitle }} </span>
    </div>
    <div style="align:center">
       <!-- <v-menu
          transition="slide-y-transition"
          bottom
        > -->
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              elevation="1"

              fab
              v-if="item.state==='userStory'"
              @click="collapseTasks_()"
              width="0px"
              height="0px"
              style="bottom: -8px"
            >
              <v-icon  style="font-size:18px; color:#292F2B" v-if="collapsedTasks">fas fa-chevron-circle-down</v-icon>
              <v-icon style="font-size:18px; color:#292F2B" v-else>fas fa-chevron-circle-up</v-icon>
          </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(dropdownlist, i) in dropdownlist"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->

      <v-btn 
        elevation="1"
        fab
        v-if="item.state==='userStory'"
        @click="collapseTasks_()"
        width="0px"
        height="0px"
        style="bottom: -8px"
      > 

        <v-icon  style="font-size:18px; color:#292F2B" v-if="collapsedTasks">fas fa-chevron-circle-up</v-icon>
        <v-icon style="font-size:18px; color:#292F2B" v-else>fas fa-chevron-circle-down</v-icon>

      </v-btn>
    </div>
    </div>

  </div>

  <!--  -->
  <!-- Case: Scrum Board -> taskInSprint --> 
  <!--  -->
  <div class="card tasklist-item" v-else>   
    
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
            <!-- <multiselect v-model="selected" :options="options" :close-on-select="true" :searchable="false" :show-labels="false" placeholder="Kind" style="text-align:center; font-weight: bold; width:150px;"></multiselect> -->
            <h3 class="titlospopup" style="text-align:left; padding-left: 40px;"> Task </h3>
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

          <h6 class="title3" style="top:75px;"> 
            <v-row align="center">
              <v-col
                class="d-flex"
                cols="12"
                sm="4"
              >
           
            <v-select
              :items="selecteditems"
              label="Εκτιμώμενη Διάρκεια"
              v-model="form.duration"
            ></v-select>
              <!-- :value=" getTaskbyId(item.id).estimated_duration ? selecteditems[getTaskbyId(item.id).estimated_duration-1] : ''" -->
            </v-col>
            </v-row>
          </h6>

          <h6 class="title3" style="position:fixed; top:297px; left:100px;"> 
           
            <v-row align="right" style="position:fixed; left:20px; width:300px;">
              <v-col
                class="d-flex"
                cols="12"
                sm="12"
              >
            <v-select
              :items="selecteditems1"
              label="Κατάσταση"
              v-model="form.status"
            ></v-select>
              <!-- :value=" this.getTaskbyId(this.item.id).status ? this.getTaskbyId(this.item.id).status : ''" -->
            </v-col>
            </v-row>
          </h6>  

          <h6 class="title3" style="position:fixed; top:345px; left:100px;"> 
           
            <v-row align="right" style="position:fixed; left:20px; width:300px;">
              <v-col
                class="d-flex"
                cols="12"
                sm="12"
              >
            <v-select
              :items=getUserStoriesNames
              label="User Story"
              v-model="user_story_of_task"
            ></v-select>
            </v-col>
            </v-row>
          </h6>

          <!-- <h6 class="title3" style="padding-left:480px; top:-17px; height: 0px;">Μέλη Task:
            <br>
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:305px; color: #cc99ff; cursor: pointer;"></i>            
            <i class="fas fa-id-card" style="position:fixed; font-size:30px; right:150px; top:305px; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:100px; top:305px; color: #ff9966; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:200px; top:345px; color: red; cursor: pointer;"></i>            
            <i class="fas fa-user-circle" style="position:fixed; font-size:30px; right:150px; top:345px; color:blue; cursor: pointer;"></i>            
            <i class="fas fa-plus-circle" style="position:fixed; font-size:30px; right:100px; top:345px; cursor: pointer;"></i>            
          </h6>         -->
          <!-- <v-app id="inspire"> -->
          <div class="text-center" style="position:fixed; right:50px; top:260px; max-width:300px">
            <v-row justify="space-around">
            <v-col
              cols="1"
              sm="10"
              md="12"
            >
              <v-sheet
                class="py-4 px-1"
              >
                <v-chip-group
                  multiple
                  active-class="primary--text"
                >
                  <v-chip
                    v-for="tag in getTaskMembersbyId(item.id)"
                    :key="tag"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
            </v-row>

            <!-- <div class="text-center" style="position:fixed; right:50px; top:300px;"> -->
              <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color="#48C0A4"
                @click="joinTask(item.id)"
              >
                Join Task
              </v-btn>

               <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                color=#F78A37
                @click="leaveTask(item.id)"
              >
                Leave Task
              </v-btn>
            </div>
          <!-- </v-app> -->

          <!-- <div class="vl" style="color:grey; border-left: 2px solid; height: 110px; top:270px; position:fixed; right:330px"></div>  -->

          <small class="text-danger" style="display:block">{{ errors.first("itemTitle") }}</small>

          <button class="btn btn-outline-secondary btn-sm mr-2" style="position:fixed; top: 400px; left:230px;" @click.prevent="save(2)">
            Save
          </button> 

          <button class="btn btn-outline-secondary btn-sm" style="position:fixed; top: 400px; left:320px;"  @click.prevent="cancel">
            Cancel
          </button>

          <button class="btn btn-sm text-danger"  style="position:fixed; top: 400px; left:420px;" @click.prevent="remove">
            Delete
          </button>

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
import { mapGetters, mapActions } from "vuex"
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
      return this.item.state === "userStory" ? "User Story" : "Task"
    },

    ...mapGetters({
      activeBoard: "activeBoard",
      isLoading: "isLoading",
      getSprintIdbyName: "getSprintIdbyName",
      getSprintbyName: "getSprintbyName",
      getUserStoryIdbyName: "getUserStoryIdbyName",
      getTaskIdbyNames: "getTaskIdbyNames",
      getUserStorybyName: "getUserStorybyName",
      getTaskbyNames: "getTaskbyNames",
      getUserStoriesNames: "getUserStoriesNames",
      getUserStorybyId: "getUserStorybyId",
      getUserStoryIdbyName: "getUserStoryIdbyName",
      getSprintbyId: "getSprintbyId",
      getTaskbyId: "getTaskbyId",
      getTaskMembersbyId: "getTaskMembersbyId"
    }),
    boardName() {
      return this.activeBoard ? this.activeBoard.name : ""
    }
  },
  data() {
    return {
      isEditing: false,
      form: {
        id: "",
        text: "",
        title: "",
        valid: true,
        sprintName: '',
        storyName: '',
        taskName: '', 
        duration: "",
        status: "",
        loader: null,
        loading: false,
      },
      duration_: "",
      status_: "",
      user_story_of_task: '',
      default_task: 'Task',
      default_user_story: "User Story"  ,
      options: ['User Story','Epic','Issue'],
      collapsedTasks: false,
      selecteditems: ['1 Μέρα', '2 Μέρες', '3 Μέρες', '4 Μέρες', '5 Μέρες', 
      '6 Μέρες', '7 Μέρες', '8 Μέρες', '9 Μέρες', '10 Μέρες', '11 Μέρες', '12 Μέρες', 
      '13 Μέρες', '14 Μέρες', '15 Μέρες'],
      selecteditems1: ['Εκκρεμεί', 'Σε εξέλιξη', 'Ολοκληρώθηκε'],
      dropdownlist: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      selected: "Εκκρεμεί",
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  methods: {
    ...mapActions({
      saveTaskListItem: "saveTaskListItem",
      deleteTaskListItem: "deleteTaskListItem",
      changeTasksState: "changeTasksState",
      addUserStory: "addUserStory",
      editUserStory: "editUserStory",
      deleteUserStory: "deleteUserStory",
      addTask: "addTask",
      editTask: "editTask",
      deleteTask: "deleteTask",
      addSprint: "addSprint",
      editSprint: "editSprint",
      deleteSprint: "deleteSprint",
      addTaskAndConnectSprint: "addTaskAndConnectSprint",
      joinTask: "joinTask",
      leaveTask: "leaveTask"
    }),

    collapseTasks_() {
      this.collapsedTasks = !this.collapsedTasks
      console.log(this.item.id)
      this.changeTasksState(this.item.id)
    },

    startEditing() {
      console.log(this.selecteditems[this.getTaskbyId(this.item.id).estimated_duration-1])
      console.log(this.getTaskbyId(this.item.id).estimated_duration)
      console.log(typeof this.getTaskbyId(this.item.id).estimated_duration)
      this.form.id = this.item.id
      this.form.title = this.item.title
      this.form.text = this.item.text
      this.form.duration = this.getTaskbyId(this.item.id).estimated_duration-1
      this.isEditing = true
      // console.log("\n\nTaskListItem.startEditing ", this.isEditing)

      if(this.item.state == "visibleTaskUnderUserStory" || this.item.state == "taskInSprint") {
        var temp = this.getTaskbyId(this.item.id)
        this.form.duration = temp.estimated_duration
        this.form.status = temp.status
      }
      this.$emit("item-editing")
    },
    clearForm() {
      this.form.id = ""
      this.form.title = ""
      this.form.text = ""
    },

    save(temp_case) {
      console.log(temp_case)
      
      // Case: User Story  
      if(temp_case == 1) {
        // Case: Create
        if(this.item.state=="defaultItem") {
          let userStory = {
            name: this.form.title,
            description: this.form.text,
            label: "issue",
            status: "toDo",
            estimated_duration: "10",
          }
          this.addUserStory(userStory)
        }
        // Case: Edit
        else if(this.item.state=="userStory") {
          // get the current object for place holding
          var userStory = this.getUserStorybyId(this.item.id)

          // get output from form
          let userStoryFormOutput = {
            name: this.form.title,
            description: this.form.text,
            label: "issue",
            status: "toDo",
            estimated_duration: "10",
          }

          // edit it
          userStory.name =  userStoryFormOutput.name,
          userStory.description =  userStoryFormOutput.description,
          userStory.label =  userStoryFormOutput.label,
          userStory.status =  userStoryFormOutput.status,
          userStory.estimated_duration =  userStoryFormOutput.estimated_duration,

          // send request
          this.editUserStory(userStory)
        }
      }
      // Case: Task
      else if(temp_case == 2) {
        
        console.log(this.user_story_of_task)
        console.log(this.form.status)
        
        if(this.form.status === 'Εκκρεμεί')
        {
          this.status_ = "toDo"
        }
        else if(this.form.status === 'Σε εξέλιξη')
        {
          this.status_ = "inProgress"
        }
        else if(this.form.status === 'Ολοκληρώθηκε')
        {
          this.status_ = "done"
        }
        else
        {
          console.log("error")
        }
        this.duration_ = this.form.duration.split(" ",1)[0]
        console.log(this.status_)
        console.log(this.form.duration)
        console.log(this.duration_)

        // Case: Create
        if(this.item.state=="defaultItem") {
          let task = {
            name: this.form.title,
            description: this.form.text,
            status: this.status_,
            estimated_duration: this.duration_,
            userStory: this.getUserStoryIdbyName(this.user_story_of_task)
          }
          this.addTaskAndConnectSprint({task:task, sprintName:this.getSprintbyId(this.list.id).name})
        }
        // Case: Edit
        else if(this.item.state=="taskInSprint") {
          // get the current object for place holding
          var task = this.getTaskbyId(this.item.id)

          // get output from form
          let taskFormOutput = {
            name: this.form.title,
            description: this.form.text,
            status: this.status_,
            estimated_duration: this.duration_,
            // userStory: this.getUserStoryIdbyName(this.user_story_of_task)
          }

          // edit it
          task.name = taskFormOutput.name
          task.description = taskFormOutput.description
          task.status = taskFormOutput.status
          task.estimated_duration = taskFormOutput.estimated_duration

          // send request
          this.editTask(task)
        }
      }     

      // Last
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      //     const updatedItem = {
      //       id: this.form.id,
      //       title: this.form.title,
      //       text: this.form.text
      //     }
      //     this.saveTaskListItem({
      //       boardId: this.board.id,
      //       listId: this.list.id,
      //       item: updatedItem
      //     })
      //     this.$emit("item-edited")
      //     this.$validator.reset() 
      //   }
      //   this.$refs.newItemPopup.close()
      // })
      this.$refs.newItemPopup.close()

    },

    cancel() {
      this.$emit("item-cancelled")
      this.$refs.newItemPopup.close()
    },
    remove() {
      // Case: User Story
      if(this.item.state == "userStory") {
        this.deleteUserStory(this.item.id)
      }
      // Case: Task
      else {
        console.log(this.item.state)
        this.deleteTask(this.getTaskbyId(this.item.id))
      }

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
      }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css">


</style>
