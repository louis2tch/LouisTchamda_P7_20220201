<template>
  <div class="home"> <s  v-if="existedUser().token != ''"></s>
    <!--<img alt="Vue logo" src="../assets/logo-groupomania.png">-->
    <HelloWorld :msg="msg" :voila="voila" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data (){
    return {
      voila : [
        {id:1, name: 'nous'},
        {id:2, name: 'vous'}
      ],
      msg : "Réseau social interne"
    }

  },
  methods: {
    deconnectUser() { 
     localStorage.setItem("oneUser",this.zeroUser);
      //localStorage.removeItem("oneUser");
      let a = localStorage.getItem("oneUser");
      //this.lanceUser();
      location.reload();
      a = JSON.parse(a);
      return a[0];
    },
    existedUser() {
      var a = localStorage.getItem("oneUser"); 
      if(a !=""){ //var a = this.lanceUser();
      a = JSON.parse(a);  
      if(a[0].token =='')
      this.$router.push('/login');
        return a[0]; 
      } else
      {
        return JSON.parse(this.zeroUser);
      }
        
    }
  }
}
</script>
