<template>
    <div class="prof_set_wrap">
        <v-alert
        prominent
        type="success"
        :value="goodAllert"
        dismissible
        >
        {{ this.goodAllertMessage }}
        </v-alert>

        <v-alert
        type="error"
        :value="badAllert"
        dismissible
        >
        {{ this.badAllertMessage }}
        </v-alert>

        <v-alert
      prominent
      type="info"
      :value="emailChangeAllert"
    >
      <v-row align="center">
            <v-col class="grow">
                Η αλλαγή του email σας ολοκληρώθηκε με επιτυχία. 
                Παρακαλώ επιβεβαιώστε το email σας και μεταβείτε στην σελίδα σύνδεσης για να συνδεθείτε.
            </v-col>
            <v-col class="shrink">
                <v-btn
                color="accent"
                depressed
                elevation="2"
                @click="goToSignIn">
                    Σύνδεση
                </v-btn>
            </v-col>
        </v-row>
        </v-alert>

        <ul class="settings_list" v-for="elem in this.menu" :key="elem.id"
            :class="{'warnul':elem.id==3}">
            
            <div :class="{'mytitle':true,
                        'warn':elem.id==3,
                        }">
                {{elem.title}}
            </div>
            <form :ref="elem.form" :id="elem.form" style="flex-flow:column;display:flex;width:100%">
                <li  v-for="item in elem.items" :key="item.id">
                    <div class="display_val">
                        <label :for="item.title" class="mytitle" :style="{'color': elem.id==3 ? 'red' : ''}">{{item.title}}</label>
                        <input v-if="elem.id!=3" type="text" :id="item.form_lab" :name="item.form_lab" :value="item.hide==false ? item.val : ''" :placeholder="item.holder" class="val" >
                        <div class="mywarning" v-else>
                            {{item.val}}
                        </div>
                        <div v-if="item.hint" class="warn_hover">
                            {{item.hint}}
                        </div>
                    </div>
                    <div :class="{'btn_wrap': true,
                                'warn_btn_wrap': elem.id==3,
                                }">
                        <button type="button" v-if="item.button==true" :value="elem.id==3 ? 'Διαγραφή Λογαρισμού' : 'Ενημέρωση'" class="update_btn" @click="mySub(elem.form, elem);">
                            <font-awesome-icon v-if="elem.id==3" class="icon" :icon="['far', 'trash-alt']"/>
                                {{elem.id==3 ? "Διαγραφή Λογαρισμού" : "Ενημέρωση"}}
                        </button>
                    </div>
                </li>
            </form>
        </ul>
    </div>
</template>

<script>
    import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { mapActions, mapGetters } from "vuex"
    library.add(faTrashAlt);

    export default {
    name: "profSettings",
    data(){
        return{
            goodAllert: false,
            goodAllertMessage: "",
            badAllert: false,
            badAllertMessage: "",
            emailChangeAllert: false,
            emailChangeAllertMessage: "",
            text: "",
            form_input: null,
        }
    },
    computed:{
        ...mapGetters({
		    isLogedIn: "isLogedIn",
		    Name: "name",
		    userName: "userName",
		    firstName: "firstName",
		    lastName: "lastName",
		    email: "email",
		    image: "image",
	    }),
        menu: function() { return [
                {
                    id: 1,
                    title: "Προσωπικές Πληροφορίες",
                    form: 'perInfo',
                    items: [
                        {id: 1, title: "Username", form_lab: 'username' , val: this.setAttr('username'), hide:false, holder: "", button: true},
                        {id: 2, title: "Όνομα", form_lab: 'firstName' , val: this.setAttr('firstName'), hide:false, holder: "", button: true},
                        {id: 3, title: "Επώνυμο", form_lab: 'lastName' , val: this.setAttr('lastName'), hide:false, holder: "", button: true},
                        {id: 4, title: "E-mail", form_lab: 'email', val: this.setAttr('email'), hide:false, holder: "", button: true, hint: "Αν ενημερώσεις το e-mail σου, θα αποσυνδεθείς μέχρι να επιβεβαιώσεις την καινούργια σου διεύθυνση !!"},
                    ]
                },

                {
                    id: 2,
                    title: "Αλλαγή Κωδικού",
                    form: 'pass',
                    items: [
                        {id: 1, title: "Τρέχων Κωδικός", form_lab: 'original_pass', val: "", hide:true, holder: "Πληκτρολόγησε τον κωδικό σου", button: false},
                        {id: 2, title: "Νέος Κωδικός",  form_lab: 'pass_new', val: "", hide:false, holder: "Πληκτρολόγησε τον νέο σου κωδικό", button: false},
                        {id: 3, title: "Επαλήθευση Νέου Κωδικού", form_lab: 'pass_new_val', val: "", hide:false, holder: "Επαλήθευση Νέου Κωδικού", button: true},
                    ]
                },

                {
                    id: 3,
                    title: "Διαγραφή Λογαριασμού",
                    form: 'deleteAcc',
                    items: [
                        {id: 1, title: "Προσοχή !", val: "Η Διαγραφή του λογαρισμού σας δεν είναι προσωρινή! Συνεχίστε μόνο αν είστε σιγούροι πως θέλετε να σταματήσετε να χρησιμοποιείτε το Scru Maniac!", hide:false, holder: "Πληκτρολόγησε τον κωδικό σου", button: true},
                    ]
                }
            ]},
    },
    props:{
        Info: Array,
        // expects: [ {tag: '', val: ''}, {tag: '', val: ''}, .... ]
    },
    methods:{
        ...mapActions(["updateUserName", "updateUserEmail", "resetPassword", "deleteUser"]),
        goToSignIn(){
            this.$router.push({name:"SignIn"})
        },
        setAttr(target){
            var computedPerInfo = [
                {tag: 'username', val: this.userName},
                {tag: 'firstName', val: this.firstName},
                {tag: 'lastName', val: this.lastName},
                {tag: 'email', val: this.email},
            ]
            for(let i of computedPerInfo){
                if(i.tag == target){
                    return i.val;
                }
            }
        },
        myVal(form, elem){
            var elements = document.getElementById(form).elements;
            if(form == "perInfo"){
                let name, email;
                for(let i of elements){
                    if(i.name == "username")
                        name = i.value;
                    else if(i.firstName == "firstName")
                        firstName = i.value;
                    else if(i.name == "email")
                        email = i.value;
                }
                if(!name.length || !email.length)
                    return false;
            }
            else if(form == "pass"){
                let pass, new_pass, val_new_pass;
                for(let i of elements){
                    // if(i.name == "original_pass")
                    //     pass = i.value;
                    if(i.name == "pass_new")
                        new_pass = i.value;
                    else if(i.name == "pass_new_val")
                        val_new_pass = i.value;
                }
                if(!pass.length || !new_pass.length || !val_new_pass.length){
                    this.remove_wrong(['pass_new_val','original_pass','pass_new']);
                    if(!pass.length)
                        this.addWrong(['original_pass']);
                    if(!new_pass.length)
                        this.addWrong(['pass_new']);
                    if(!val_new_pass.length)
                        this.addWrong(['pass_new_val']);

                    alert("Συμπληρώστε όλα τα πεδία !!");
                    return false;
                }
                else if(new_pass != val_new_pass){
                    this.addWrong(['pass_new_val', 'pass_new']);
                    alert('Οι κωδικοί δεν είναι ίδιοι !!');
                    return false;
                }
                // else if(elem.original_pass != pass){
                //     this.addWrong(['original_pass']);
                //     alert("Λάθος Κωδικός !!");
                //     return false;
                // }
            }
            return 1;
        },
        mySub(form, elem){
            var elements = document.getElementById(form).elements;
            
            // if(!this.myVal(form, elem)){
            //     return false;
            // }
            if(form === "perInfo"){
                var userName_, email_;
                for(let element of elements){
                    if(element.name == "name")
                        userName_ = element.value
                    else if(element.name == "email")
                        email_ = element.value
                }

                let data = {
                    username: userName_,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: email_,
			    };
                // check if update username or email
                // if email then account needs to logout
                if (email_ !== this.email)
                    this.updateUserEmail_(data)
                else
                    this.updateUserName_(data)

            } else if (form === "pass"){
                var old_, new_, confirm_;
                for(let element of elements){
                    if(element.name == "original_pass")
                        old_ = element.value;
                    if(element.name == "pass_new")
                        new_ = element.value;
                    else if(element.name == "pass_new_val")
                        confirm_ = element.value;
                }

                let data = {
                    old: old_,
                    new: new_,
                    confirm: confirm_,
			    };

                this.resetPassword_(data)

            } else if (form === "deleteAcc"){
                this.deleteUser_()
            }
            // return false
            // document.forms[form].submit();
        },
        addWrong(Arr){
            for(let i of Arr){
                document.getElementById(i).classList.add('wrong_field');
            }
        },
        remove_wrong(Arr){
            for(let i of Arr){
                document.getElementById(i).classList.remove('wrong_field');
            }
        },
        updateUserName_(data){
            this.updateUserName( data ) 
            .then( response => {
                this.goodAllert = true
                this.badAllert = false
                this.emailChangeAllert = false
                this.goodAllertMessage = response.message
            })
            .catch( error => { 
                this.badAllert = true
                this.goodAllert = false
                this.emailChangeAllert = false
                this.badAllertMessage = error.response.data.message
            }) 
        },
        updatefirstName_(data){
            this.updatefirstName( data ) 
            .then( response => {
                this.goodAllert = true
                this.badAllert = false
                this.emailChangeAllert = false
                this.goodAllertMessage = response.message
            })
            .catch( error => { 
                this.badAllert = true
                this.goodAllert = false
                this.emailChangeAllert = false
                this.badAllertMessage = error.response.data.message
            }) 
        },
        updatelastName_(data){
            this.updatelastName( data ) 
            .then( response => {
                this.goodAllert = true
                this.badAllert = false
                this.emailChangeAllert = false
                this.goodAllertMessage = response.message
            })
            .catch( error => { 
                this.badAllert = true
                this.goodAllert = false
                this.emailChangeAllert = false
                this.badAllertMessage = error.response.data.message
            }) 
        },
        updateUserEmail_(data){
            this.updateUserEmail( data ) 
            .then( response => {
                this.goodAllert = false
                this.badAllert = false
                this.emailChangeAllert = true
                this.goodAllertMessage = response
            })
            .catch( error => { 
                this.badAllert = true
                this.goodAllert = false
                this.emailChangeAllert = false
                this.badAllertMessage = error.response.data.message
            }) 
        },
        resetPassword_(data){
            this.resetPassword( data ) 
            .then( response => {
                this.goodAllert = true
                this.badAllert = false
                this.emailChangeAllert = false
                this.goodAllertMessage = response
            })
            .catch( error => { 
                this.badAllert = true
                this.goodAllert = false
                this.emailChangeAllert = false
                this.badAllertMessage = error.response.data.message
            }) 
        },
        deleteUser_(){
            this.deleteUser() 
            .then( response => {
                this.goodAllertMessage = response
                this.$router.push({name:"SignIn"})
            })
            .catch( error => { 
                this.badAllertMessage = error.response.data.message
            }) 
        },
    },
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_settings.css";
</style>
