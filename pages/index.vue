<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1>Stats</h1>
      <v-treeview :items="stats"></v-treeview>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import product from '../requests/product'

export default Vue.extend({
  name: 'Home',
  data: () => ({
    stats: {}
  }),
  async created () {
    this.stats = await product(this.$axios).stats()
  }
})

</script>
