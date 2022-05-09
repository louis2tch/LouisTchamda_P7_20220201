<template>
  <div class="mainBody">
    <div style="padding-left: -40px">
      <img alt="Vue logo" src="@/assets/logo-groupomania.png" />
    </div>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/login" v-if="existedUser().token == ''"
        >Se connecter</router-link
      >
      <a href="#" @click="deconnectUser" to="/login" v-else class
        >Se deconnecter</a
      >|
      <!--<router-link to="/share-gifs">Partage de gifs</router-link> |-->
      <router-link to="/share-articles"
        >Chat<!--Partage d'articles--></router-link
      >
    </nav>
    <section id="mainSection">
      <div class="container">
        <div class="item">
          <span class="userLogin" v-if="existedUser().token != ''"
            ><em>[{{ existedUser().email }}]</em> Bonjour
            {{ existedUser().first_name }}!
          </span>
          <a href="/signup"
            ><button class="subMenu" v-if="existedUser().role == 1">
              &bull;Utilisateurs
            </button></a
          >
          <a href="/add-department"
            ><button class="subMenu" v-if="existedUser().role == 1">
              &bull;Acces aux Departements
            </button></a
          >
          <a href="/signup" v-if="existedUser().token == ''"
            ><button class="subMenu">&bull;Créer un Compte</button></a
          >
          <button
            class="subMenu"
            v-else
            @click="deconnectUser"
            alt="Deconnexion"
          >
            <i class="fa fa-power-off fa-2x rougeatre" title="Deconnexion"></i
            ><!--<img src="@/images/deconnexion-btn2.png" width="18" >-->
          </button>
        </div>
        <div class="item">
          <router-view />
        </div>
      </div>
    </section>
    <footer>
      <div class="logo">Groupomania</div>
      <div><a href="/">© All Rights Reserved 2022</a></div>
      <ul>
        <!--<li><i class="fa  fa-user-plus"></i>Devenir partenaire</li>
        <li><i></i>Mentions légales</li>
        <li><a href="/">© All Rights Reserved 2022</a></li>-->
      </ul>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}
body {
  margin: 0;
}
.mainBody {
  max-width: 820px;
  margin: 0 auto;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    padding: 0 10px;

    &.router-link-exact-active {
      color: #c30;
    }
  }
}
.rougeatre {
  color: #c30;
}
#mainSection .container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-around;
}

#mainSection .item {
  background: #f6f6f6;
  border-radius: 20px;
  margin: 0 22px 22px 22px;
  padding: 23px 20px;
  width: 100%;
  text-align: right;
  box-shadow: 2px 1px 0px rgba(0, 0, 0, 0.04), 2px 5px 10px rgba(0, 0, 0, 0.15);
}
.deconnect {
  cursor: pointer;
}
.subMenu {
  border: 0;
  background: transparent;
  cursor: pointer;
  margin-right: 5px;
}
footer {
  font-size: 14px;
}
footer a {
  text-decoration: none;
}
footer li {
  font-size: 12px;
  display: inherit;
}
.userLogin {
  font-size: 13px;
  margin: 0 10px;
  color: green;
  float: left;
}

@media only screen and (max-width: 769px) {
  .mainBody {
    max-width: 100%;
    margin: 3px auto;
  }
  footer li {
    font-size: 14px;
    display: inherit;
  }
  .userLogin {
    font-size: 13px;
    margin: 0 10px;
    float: none;
  }
  .subMenu {
    font-size: 14px;
  }
  div img {
    /*width: 90%;*/
  }
}

@media only screen and (max-width: 512px) {
  div img {
    width: 90%;
  }
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
      zeroUser:
        '[{"id":"","id_dep":"","role":"","token":"", "first_name":"","last_name":""}]',
    };
  },
  methods: {
    deconnectUser() {
      localStorage.setItem("oneUser", this.zeroUser);
      //localStorage.removeItem("oneUser");
      let a = localStorage.getItem("oneUser");
      location.reload();
      a = JSON.parse(a);
      return a[0];
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
  },
};
</script>

