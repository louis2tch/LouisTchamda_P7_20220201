<template>
  <div class="addDepartment"  v-if="existedUser().role == 1">
    <!--<h1>Ajouter un Département</h1>-->
    <table>
      <tr>
        <td>Departement:<i id="NameErrorMsg"></i></td>
        <td><input type="text" id="department" v-bind:placeholder="pname" ></td>
      </tr>
      <tr>
        <td></td>
        <td >
          <button v-show="depPermission == true" id="AddDepartment" @click="addDepartment">Ajouter</button>
          <button  v-show="depPermission1 == false" id="UpDepartment" @click="upDepartment" >Mettre a jour</button>
        </td>
      </tr>
    </table>
  </div> 
  <div id="tout" style="display:none"></div>
  <hr>
    <table v-if="existedUser().role == 1">
      <tr v-for="i in existedDepartment()" :key=i.id>
        <td>{{ i.name }}</td>
        <td><button @click="upDataDepartment(i.id, i.name), depPermission1 = false, depPermission = false"  :title="i.id" :id="i.id+'u'">up</button></td>
        <td><button @click="delDepartment(i.id)" :title="i.id" class="delete">del</button></td>
      </tr>
    </table>
    <div v-else> ONLY FOR ADMIN</div>
  <div style="margin-bottom:60px;">
    </div>
</template>

<style scoped lang="scss">
table {margin: auto; margin-top:5px;}
td {text-align: left; padding: 3px;}
h1{display:inline;}
a{text-decoration: none;}
.dep {padding-bottom:15px;}
.delete {color: red;}
button {margin:5px 5px 5px 0; cursor: pointer;}
</style>

<script>

export default {
 /* name: 'HomeTemplate',
  props: {
    msg: String
  },*/

  data() {
		return {
      depPermission : true,
      depPermission1 : true,
      zeroUser: '[{"id":"","id_dep":"","role":"","token":"", "first_name":"","last_name":""}]',
      dd: []
			
		}
	},
  methods: {
    existedUser() {
      var a = localStorage.getItem("oneUser"); 
      if(a !=""){ //var a = this.lanceUser();
       a = JSON.parse(a);   
        //alert(a[0].role);
        return a[0]; 
      } else
      {
        return JSON.parse(this.zeroUser);
      }
      
		}, 
    existedDepartment() {
    var a = this.lanceDep();
    //var a = document.getElementById("tout1").innerHTML;
    //localStorage.removeItem("allDep"); 
     //var a = localStorage.getItem("allDep"); 
      a = JSON.parse(a); 
    
			return a;

		}, 
    addDepartment(){
      //let department = document.getElementById("department").value;
      /*let z={};
      let dep = '{"name": "'+ department+'"}';
      dep = JSON.parse(dep);
      z = Object.assign(z,dep);
      */

      document.getElementById("NameErrorMsg").innerHTML = 
      (/^$/.test(document.getElementById("department").value))?"<font color=red size=6 title='Champs obligatoire'>*</font>":"";
      let stop = false;
      if(/^$/.test(document.getElementById("department").value)) stop=true;

      let z = {department:{name : document.getElementById("department").value}};
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      if(stop === false)
      fetch("http://localhost:3000/api/department", {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) {  //alert(res.json());
          return res.json(); 
        } 
      })
      .then(function(value) {
        let d='';
        for(let i of value.v){
          d +=`{"id":"${i.id}", "name":"${i.name}", "coment":"${i.comment}"}, `;
        }
        d = d.substring(0,d.length-2);
        d = `[${d}]`;
        localStorage.setItem("allDep",d);
        document.getElementById("tout").innerHTML=d;
        document.getElementById("department").value = "";
        location.reload();
      })
      .catch(function(err) {
        console.log("Une Erreur est survenue: ADD "+err.message);
      });
      this.existedDepartment();
    },
    upDataDepartment(xid, xname){
      document.getElementById("department").value = xname;
      document.getElementById("UpDepartment").dataset.id = xid; 
      return "depPermission=''";     
    },
    upDepartment(){
      let xid = document.getElementById("UpDepartment").dataset.id;
      let z = {department:{name : document.getElementById("department").value}};
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; //alert("token = " + x);
      fetch(`http://localhost:3000/api/department/${xid}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) {  
          return res.json(); 
        } 
      })
      .then(function(value) {
        let d='';
        for(let i of value.v){
          d +=`{"id":"${i.id}", "name":"${i.name}", "coment":"${i.comment}"}, `;
        }
        d = d.substring(0,d.length-2);
        d = `[${d}]`;
        localStorage.setItem("allDep",d);
        document.getElementById("tout").innerHTML=d;
        document.getElementById("department").value = "";
        location.reload();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: UP"+err.message);
      });

    },
    delDepartment(xid){
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
    if(confirm(`Etes vous sur de supprimer l'element № ${xid}?`))
      fetch(`http://localhost:3000/api/department/${xid}`, {
        method: "delete",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }//, 
      // body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function(value) { 
        let d='';
        for(let i of value.v){
          d +=`{"id":"${i.id}", "name":"${i.name}", "coment":"${i.comment}"}, `;
        }
        d = d.substring(0,d.length-2);
        d = `[${d}]`;
        localStorage.setItem("allDep",d);
        document.getElementById("tout").innerHTML=d;
        location.reload();
        //this.existedDepartment();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: DEL"+err.message);
      });
      
    },
    lanceDep(){
     let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
     fetch("http://localhost:3000/api/department", {
        method: "GET",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }/*, 
       body: JSON.stringify(z)*/
      })
      .then(function(res) {
        if (res.ok) {  //alert(res.json());
          return res.json(); 
        } 
      })
      .then(async function (value) {
        let d=''; 
        for(let i of value.v){
          d +=`{"id":"${i.id}", "name":"${i.name}", "coment":"${i.comment}"}, `;
        }
        d = d.substring(0,d.length-2); //supprime la dernier virgule
        d = `[${d}]`; 
        localStorage.setItem("allDep",d);
        document.getElementById("tout").innerHTML=d;
        
        /* const divDep = document.createElement("div");
        divDep.setAttribute("id","tout1"); divDep.innerHTML = d;
        document.getElementById("tout").appendChild(divDep);
        
        <tr v-for="i in existedDepartment()" :key=i.id>
        <td>{{ i.name }}</td>
        <td><button @click="upDataDepartment(i.id, i.name)"  :title="i.id">up</button></td>
        <td><button @click="delDepartment(i.id)" :title="i.id" class="delete">del</button></td>
      </tr>*/

      })
      .catch(function(err) {
        alert("Une Erreur est survenue: ALL "+err.message);
      });
      return localStorage.getItem("allDep");
    }
  }
}
</script>


