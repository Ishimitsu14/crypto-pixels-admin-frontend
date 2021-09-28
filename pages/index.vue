<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <h1>Rarity</h1>
        <v-treeview :items="rarity" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import product from '../requests/product'
import { IProductRarity } from '~/types/IProduct'

export default Vue.extend({
  name: 'Home',
  data: () => ({
    rarity: [] as IProductRarity[]
  }),
  async created () {
    this.rarity = await product(this.$axios).rarity()
  }
})

</script>
