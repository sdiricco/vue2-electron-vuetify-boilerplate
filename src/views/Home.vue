<template>
  <v-container class="d-flex align-center justify-center m-container">
    <v-btn outlined x-large color="primary" @click="onClick">click</v-btn>
  </v-container> 
</template>

<script lang="ts">
import * as api from "../frontend/api"
export default {
  name: "Home",
  methods:{
    async onClick(): Promise<void>{
      await api.showMessageBox({message: 'ciao', type: 'question', title: 'my title'})
    }
  }
};
</script>

<style scoped>
.m-container {
  height: 100%;
}
</style>
