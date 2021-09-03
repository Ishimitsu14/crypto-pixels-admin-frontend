<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex flex-column align-start">
          <div class="d-flex align-center mb-2">
            <v-text-field
              v-model="generateConfig.countImages"
              class="mr-2"
              label="Number of images"
            />
          </div>
          <div class="d-flex align-center mb-5">
            <v-text-field
              v-model="generateConfig.width"
              class="mr-2"
              label="Width of images"
            />
            <v-text-field
              v-model="generateConfig.height"
              label="Height of images"
            />
          </div>
          <v-btn
            color="primary"
            class="mt-5"
            :disabled="disabledGenerate"
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
import gif from '../../requests/product'

export default Vue.extend({
  name: 'Generator',
  data: () => ({
    generateConfig: {
      countImages: 0,
      width: 0,
      height: 0
    }
  }),
  computed: {
    disableGenerate () {
      return this.generateConfig.countImages <= 0 && this.generateConfig.width <= 0 && this.generateConfig.height
    }
  },
  methods: {
    async generate () {
      try {
        await gif(this.$axios).generate(this.generateConfig)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style scoped>

</style>
