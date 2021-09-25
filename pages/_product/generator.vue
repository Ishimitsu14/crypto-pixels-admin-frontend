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
            <v-checkbox
              v-model="generateConfig.isAttributes"
              class="mr-2"
              label="Generate with attributes"
            />
          </div>
          <v-btn
            color="primary"
            class="mt-5"
            :disabled="disableGenerateButton"
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
      isAttributes: false
    }
  }),
  computed: {
    disableGenerateButton () {
      return !(this.generateConfig.countImages > 0)
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
