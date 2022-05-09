<template>
  <div class="signout">
    <!-- <h1>Créer un Compte</h1><a href="/add-department" v-if="existedUser().role == 1">/ Ajouter un Département</a>-->
    <table>
      <tr id="aDepartment">
        <td class="dep">Département:</td>
        <td class="dep">
          <select id="department">
            <option v-for="i in existedDepartment()" :key="i.id" :value="i.id">
              {{ i.name }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <td><span id="emailtext">Email:</span></td>
        <td>
          <input type="email" id="email" placeholder="Email" /><span
            id="emailErrorMsg"
          ></span>
        </td>
      </tr>
      <tr>
        <td><span id="passtext">Mot de passe:</span></td>
        <td>
          <input type="password" id="password" /><span
            id="passwordErrorMsg"
          ></span>
        </td>
      </tr>
      <tr>
        <td>Prenom:</td>
        <td>
          <input type="text" id="first_name" /><span
            id="first_nameErrorMsg"
          ></span>
        </td>
      </tr>
      <tr>
        <td>Nom:</td>
        <td>
          <input type="text" id="last_name" /><span
            id="last_nameErrorMsg"
          ></span>
        </td>
      </tr>
      <tr>
        <td><rien id="openRoleText">Role:</rien></td>
        <td>
          <rien id="openRoleValue"
            ><select id="Role">
              <option value="0">Utilisateur</option>
              <option value="1">Moderateur</option>
            </select></rien
          >
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <button v-show="Permission == true" id="AddUser" @click="addUser">
            Créer
          </button>
          <button v-show="Permission1 == false" id="UpUser" @click="upUser">
            Mettre a jour
          </button>
        </td>
      </tr>
    </table>
  </div>
  <div id="ResultCompte"></div>
  <table v-if="existedUser().role == 1">
    <tr v-for="i in existedAllUser()" :key="i.id">
      <td v-if="i.role == 1" class="moderateur">
        {{ i.first_name }} {{ i.last_name }} <em>&rArr;</em> {{ i.email }}
      </td>
      <td v-else>
        {{ i.first_name }} {{ i.last_name }} <em>&rArr;</em> {{ i.email }}
      </td>
      <td>
        <button
          @click="
            upDataUser(
              i.id,
              i.id_dep,
              i.first_name,
              i.last_name,
              i.email,
              i.role
            ),
              (Permission1 = false),
              (Permission = false)
          "
          :title="i.id"
          :id="i.id + 'u'"
        >
          up
        </button>
      </td>
      <td>
        <button @click="deleteUser(i.id)" :title="i.id" class="delete">
          del
        </button>
      </td>
    </tr>
  </table>

  <div style="margin-bottom: 60px"></div>
</template>
<style scoped lang="scss">
table {
  margin: auto;
  margin-top: 5px;
}
td {
  text-align: left;
  padding: 3px;
}
h1 {
  display: inline;
}
a {
  text-decoration: none;
}
.dep {
  padding-bottom: 15px;
}
.delete {
  color: red;
}
button {
  margin: 5px 5px 5px 0;
  cursor: pointer;
}
em {
  color: rgb(10, 6, 245);
  font-weight: 600;
}
#openRoleText,
#openRoleValue {
  display: none;
}
.moderateur {
  background: #ddd;
}
input {
  width: 190px;
  height: 20px;
}
select {
  width: 200px;
  height: 28px;
}
#ResultCompte {
  color: rgb(125, 56, 252);
  font-weight: 600;
}
</style>

<script>
export default {
  /* name: 'HomeTemplate',
  props: {
    msg: String
  },*/

  data() {
    return {
      Permission: true,
      Permission1: true,
      zeroUser:
        '[{"id":"","id_dep":"","role":"","token":"", "first_name":"","last_name":""}]',
    };
  },
  methods: {
    existedDepartment() {
      var a = this.lanceDep();
      a = JSON.parse(a);
      return a;
    },
    existedAllUser() {
      var a = this.lanceUser();
      a = JSON.parse(a);
      return a;
    },
    existedUser() {
      var a = localStorage.getItem("oneUser");
      if (a != "") {
        //var a = this.lanceUser();
        a = JSON.parse(a);
        //alert(a[0].role);
        return a[0];
      } else {
        return JSON.parse(this.zeroUser);
      }
    },
    deleteUser(xid) {
      //let xid = document.getElementById("UpUser").dataset.id;
      /*let z = {user:{
                      first_name : document.getElementById("first_name").value,
                      last_name : document.getElementById("last_name").value,
                      role : document.getElementById("Role").value,
                    }
              }; */
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
      if (confirm("Aimeriez vous réellement supprimer cet utilisateur?"))
        fetch(`http://localhost:3000/api/auth/${xid}`, {
          method: "delete",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: x,
          } /*, 
       body: JSON.stringify(z)*/,
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            }
          })
          .then(function (value) {
            let d = "";
            for (let i of value.v) {
              d += `{"id":"${i.id}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}", "role":"${i.role}"}, `;
            }
            d = d.substring(0, d.length - 2); //supprime la derniere virgule
            d = `[${d}]`;
            localStorage.setItem("allUser", d);
            location.reload();
          })
          .catch(function (err) {
            alert("Une Erreur est survenue: DELETE USER " + err.message);
          });
    },
    addUser() {
      /* document.getElementById("NameErrorMsg").innerHTML = 
      (/^$/.test(document.getElementById("fisrt_name").value))?"<font color=red size=6 title='Champs obligatoire'>*</font>":"";
      let stop = false;
      if(/^$/.test(document.getElementById("first_name").value)) stop=true;*/

      let z = {
        user: {
          id_dep: document.getElementById("department").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
        },
      };
      document.getElementById("passwordErrorMsg").innerHTML = /^$/.test(
        document.getElementById("password").value
      )
        ? "Champs obligatoire"
        : "";

      document.getElementById("first_nameErrorMsg").innerHTML = /^$/.test(
        document.getElementById("first_name").value
      )
        ? "Champs obligatoire"
        : "";

      document.getElementById("last_nameErrorMsg").innerHTML = /^$/.test(
        document.getElementById("last_name").value
      )
        ? "Champs obligatoire"
        : "";

      document.getElementById("emailErrorMsg").innerHTML =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          document.getElementById("email").value
        )
          ? ""
          : "email Incorrect, '@' ";

      let stop = false;
      //alert("1" + stop);
      if (
        /^$/.test(document.getElementById("first_name").value) ||
        /^$/.test(document.getElementById("last_name").value) ||
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          document.getElementById("email").value
        ) === false
      ) {
        stop = true;
      }
      //alert("2" + stop);
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
      if (stop === false)
        fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: x,
          },
          body: JSON.stringify(z),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json();
            }
          })
          .then(function (value) {
            let d = "";
            for (let i of value.v) {
              d += `{"id":"${i.id}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}"}, `;
            }
            d = d.substring(0, d.length - 2); //supprime la derniere virgule
            d = `[${d}]`;
            localStorage.setItem("allUser", d);
            document.getElementById("ResultCompte").style.display = "block";
            document.getElementById("ResultCompte").innerHTML = "Compte crée";
            alert("Votre compte a ete cree avec succes: " + value.v[0].email);
            window.location.replace("/login");
            //location.reload();
          })
          .catch(function (err) {
            console.log("Une Erreur est survenue: ADD USER " + err.message);
          });
    },
    upDataUser(xid, xid_dep, xfirst_name, xlast_name, xemail, xrole) {
      document.getElementById("email").value = xemail;
      document.getElementById("first_name").value = xfirst_name;
      document.getElementById("last_name").value = xlast_name;
      document.getElementById("password").disabled = "disabled";
      document.getElementById("passtext").style.color = "#ccc";
      document.getElementById("email").disabled = "disabled";
      document.getElementById("email").style.color = "#999";
      document.getElementById("emailtext").style.color = "#ccc";

      document.getElementById("aDepartment").style.color = "#ccc";
      document.getElementById("department").value = xid_dep;
      document.getElementById("department").disabled = "disabled";
      document.getElementById("department").style.color = "#999";

      document.querySelector("#openRoleText").style.display = "block";
      document.querySelector("#openRoleValue").style.display = "block";
      document.getElementById("Role").value = xrole;

      document.getElementById("UpUser").dataset.id = xid;

      //return "Permission=''";
    },
    upUser() {
      let xid = document.getElementById("UpUser").dataset.id;
      let z = {
        user: {
          first_name: document.getElementById("first_name").value,
          last_name: document.getElementById("last_name").value,
          role: document.getElementById("Role").value,
        },
      };
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
      fetch(`http://localhost:3000/api/auth/${xid}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: x,
        },
        body: JSON.stringify(z),
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          let d = "";
          for (let i of value.v) {
            d += `{"id":"${i.id}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}", "role":"${i.role}"}, `;
          }
          d = d.substring(0, d.length - 2); //supprime la derniere virgule
          d = `[${d}]`;
          localStorage.setItem("allUser", d);
          location.reload();
        })
        .catch(function (err) {
          alert("Une Erreur est survenue: UP USER " + err.message);
        });
    },
    lanceDep() {
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;

      fetch("http://localhost:3000/api/department", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: x,
        } /*, 
       body: JSON.stringify(z)*/,
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          let d = "";
          for (let i of value.v) {
            d += `{"id":"${i.id}", "name":"${i.name}", "coment":"${i.comment}"}, `;
          }
          d = d.substring(0, d.length - 2); //supprime la derniere virgule
          d = `[${d}]`;
          localStorage.setItem("allDep", d);
        })
        .catch(function (err) {
          alert("Une Erreur est survenue: ALL DEP " + err.message);
        });
      return localStorage.getItem("allDep");
    },
    lanceUser() {
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token;
      fetch("http://localhost:3000/api/auth/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: x,
        } /*, 
       body: JSON.stringify(z)*/,
      })
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (value) {
          let d = "";
          for (let i of value.v) {
            d += `{"id":"${i.id}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}", "role":"${i.role}"}, `;
          }
          d = d.substring(0, d.length - 2); //supprime la derniere virgule
          d = `[${d}]`;
          localStorage.setItem("allUser", d);
        })
        .catch(function (err) {
          alert("Une Erreur est survenue: ALL USERS" + err.message);
        });
      return localStorage.getItem("allUser");
    },
  },
};
</script>

