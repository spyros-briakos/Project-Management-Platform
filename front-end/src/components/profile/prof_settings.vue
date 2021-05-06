<template>
    <div class="prof_set_wrap">
        <ul class="settings_list" v-for="elem in this.menu" :key="elem.id">
            <div :class="{'mytitle':true,
                        'warn':elem.id==3,
                        }">
                {{elem.title}}
            </div>
            <li v-for="item in elem.items" :key="item.id">
                <div class="display_val">
                    <label :for="item.title" class="mytitle" :style="{'color': elem.id==3 ? 'red' : ''}">{{item.title}}</label>
                    <input  v-if="elem.id!=3" type="text" :name="item.title" :value="item.hide==false ? item.val : ''" :placeholder="item.holder" class="val" >
                    <div class="mywarning" v-else>
                        {{item.val}}
                    </div>
                </div>
                <div :class="{'btn_wrap': true,
                            'warn_btn_wrap': elem.id==3,
                            }">
                    <button v-if="item.button==true" class="update_btn"> {{elem.id==3 ? "Διαγραφή Λογαρισμού" : "Ενημέρωση"}} </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
    name: "profSettings",
    data(){
        return{
            menu:[
                {
                    id: 1,
                    title: "Προσωπικές Πληροφορίες",
                    items: [
                        {id: 1, title: "Ονοματεπώνυμο", val: "Vasilis Goulas", hide:false, holder: "", button: true},
                        {id: 2, title: "E-mail", val: "vas_gou@gmail.com", hide:false, holder: "", button: true},
                    ]
                },

                {
                    id: 2,
                    title: "Αλλαγή Κωδικού",
                    items: [
                        {id: 1, title: "Τρέχων Κωδικός", val: "123456789", hide:true, holder: "Πληκτρολόγησε τον κωδικό σου", button: false},
                        {id: 2, title: "Νέος Κωδικός", val: "", hide:false, holder: "Πληκτρολόγησε τον νέο σου κωδικό", button: false},
                        {id: 3, title: "Επαλήθευση Νέου Κωδικού", val: "", hide:false, holder: "Επαλήθευση Νέου Κωδικού", button: true},
                    ]
                },

                {
                    id: 3,
                    title: "Διαγραφή Λογαριασμού",
                    items: [
                        {id: 1, title: "Προσοχή !", val: "Η Διαγραφή του λογαρισμού σας δεν είναι προσωρινή! Συνεχίστε μόνο αν είστε σιγούροι πως θέλετε να σταματήσετε να χρησιμοποιείτε το Scru Maniac!", hide:false, holder: "Πληκτρολόγησε τον κωδικό σου", button: true},
                    ]
                }
            ]
        }
    },
};
</script>

<style scoped>
    @import "../../assets/css/prof_settings.css";
</style>
