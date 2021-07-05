const { Index } = require("flexsearch");
import store from '../store';
import Vue from "vue"

//  CREATE & ADD FUNCTIONS

function createInd(opts){
    return new Index(opts);
}

function addIndUser(ind, id, lname, fname, uname){
    var all = id + ' ' + uname + ' ' + lname + ' ' + fname;
    // ind.add(lname + '' + fname, all);
    ind.add(all, all);
}

/*function addIndTask(){

}*/

function build_up(res, type){
    if(type === 'user'){
        let final = [];
        for(let user of res){
            let vals = user.split(" ");
            final.push({_id: vals[0], username: vals[1]});
        }
        return final;
    }
    else if(type === 'task'){
        return [];
    }else return [];
}

function fillUsers(userInd){
    if(store.getters.allUsers.length==0) return 0;
    for(let user of store.getters.allUsers){
        addIndUser(userInd, user._id, user.firstName, user.lastName, user.username);
    }
    return 1;
}

/*function fillTasks(tasksInd){
    if(store.getters.????????????.length==0) return 0;
    for(user of testSearch){
        addInd(userInd, user._id, user.firstName, user.lastName, user.username);
    }
    return 1;
}*/

function fillAll(uInd, fU, tInd, fT){
    if (fU==0){fU=fillUsers(uInd);}
    //if (fT==0){fT=fillTasks(tInd);}
}


///////////////////////////////////////////
///////////////////////////////////////////

var userInd = createInd({tokenize:'full'}), filledUsers=0;
var taskInd = createInd({tokenize:'full'}), filledTasks=0;

fillAll(userInd, filledUsers, taskInd, filledTasks);

///////////////////////////////////////////
///////////////////////////////////////////

export default{
    searchUser: function (val){
        // sayhi();
        if(filledUsers==0)
            fillAll(userInd, filledUsers, taskInd, filledTasks);
        return build_up(userInd.search(val), 'user');
    },

    searchTask: function (val){
        if(filledTasks==0)
            fillAll(userInd, filledUsers, taskInd, filledTasks);
        return build_up(taskInd.search(val), 'task');
    }

}