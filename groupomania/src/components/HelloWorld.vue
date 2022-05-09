<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <!--<p>
      {{ voila[0].name }}
      <ul>
        <li v-for="i in voila" :key="i.id">{{ i.name }}</li>
      </ul>
    </p>-->
    <p>
      Facilitons la communication entre collègues<br />

      <b>Réseau social interne</b> - A l'attention de nos employés.<br />
      Enregistrez-vous, Connectez-vous et partagez vos contenus et opinions.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    voila: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 0px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #c30;
}
.hello {
  text-align: left;
}
</style>
