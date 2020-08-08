<template>
<div></div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({ dark: state => state.dark })
  },
  created(){
    this.$store.commit("", {
      nome: "",
      icone: "",
      comando: "",
    });
  }
}
</script>

<style>

</style>