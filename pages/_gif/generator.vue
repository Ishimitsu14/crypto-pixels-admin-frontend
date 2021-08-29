<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex flex-column align-center">
          <img v-if="gif.src && gif.uuid" :src="gif.src">
          <v-btn
            color="primary"
            class="mt-5"
            @click="generate"
          >
            Generate
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import gif from '../../requests/gif'

export default Vue.extend({
  name: 'Generator',
  data: () => ({
    gif: {
      src: '',
      uuid: ''
    }
  }),
  methods: {
    async generate () {
      try {
        const response = await gif(this.$axios).generate()
        this.gif = { src: response.gif, uuid: response.uuid }
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
