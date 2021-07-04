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
        console.log('RES');
        console.log(res);
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


//  INITIALIZE USERS & TASKS INDEXES

var userInd = createInd({tokenize:'full'});
for(let user of store.getters.allUsers){
    console.log(user);
	addIndUser(userInd, user._id, user.firstName, user.lastName, user.username);
}

/*var tasksInd = createInd({tokenize:'full'});
for(user of testSearch){
	addInd(userInd, user._id, user.firstName, user.lastName, user.username);
}*/


export default{
    searchUser: function (val){
        // sayhi();
        return build_up(userInd.search(val), 'user');
    },

    searchTask: function (val){
        return build_up(taskInd.search(val), 'task');
    }

}