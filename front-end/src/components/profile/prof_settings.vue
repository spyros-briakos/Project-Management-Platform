<template>
    <div class="prof_set_wrap">
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
                        <input  v-if="elem.id!=3" type="text" :id="item.form_lab" :name="item.form_lab" :value="item.hide==false ? item.val : ''" :placeholder="item.holder" class="val" >
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
    library.add(faTrashAlt);

    export default {
    name: "profSettings",
    data(){
        return{
            menu:[
                {
                    id: 1,
                    title: "Προσωπικές Πληροφορίες",
                    form: 'perInfo',
                    items: [
                        {id: 1, title: "Ονοματεπώνυμο", form_lab: 'name' , val: this.setAttr('name'), hide:false, holder: "", button: true},
                        {id: 2, title: "E-mail", form_lab: 'email', val: this.setAttr('email'), hide:false, holder: "", button: true, hint: "Αν ενημερώσεις το e-mail σου, θα αποσυνδεθείς μέχρι να επιβεβαιώσεις την καινούργια σου διεύθυνση !!"},
                    ]
                },

                {
                    id: 2,
                    title: "Αλλαγή Κωδικού",
                    form: 'pass',
                    original_pass: this.setAttr('password'),
                    items: [
                        {id: 1, title: "Τρέχων Κωδικός", form_lab: 'original_pass', val: this.setAttr('password'), hide:true, holder: "Πληκτρολόγησε τον κωδικό σου", button: false},
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
            ]
        }
    },
    props:{
        Info: Array,
        // expects: [ {tag: '', val: ''}, {tag: '', val: ''}, .... ]
    },
    methods:{
        setAttr(target){
            for(let i of this.Info){
                if(i.tag == target){
                    // alert(i.val);
                    return i.val;
                }
            }
        },
        myVal(form, elem){
            var elements = document.getElementById(form).elements;
            if(form == "perInfo"){
                let name, email;
                for(let i of elements){
                    if(i.name == "name")
                        name = i.value;
                    else if(i.name == "email")
                        email = i.value;
                }
                if(!name.length || !email.length)
                    return false;
            }
            else if(form == "pass"){
                let pass, new_pass, val_new_pass;
                for(let i of elements){
                    if(i.name == "original_pass")
                        pass = i.value;
                    else if(i.name == "pass_new")
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
                else if(elem.original_pass != pass){
                    this.addWrong(['original_pass']);
                    alert("Λάθος Κωδικός !!");
                    return false;
                }
            }
            return 1;
        },
        mySub(form, elem){
            if(!this.myVal(form, elem)){
                return false;
            }
            document.forms[form].submit();
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
        }
    },
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_settings.css";
</style>
