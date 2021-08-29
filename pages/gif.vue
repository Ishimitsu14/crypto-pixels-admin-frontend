<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title style="width: 100%">
            <div class="d-flex justify-space-between" style="width: 100%">
              Gifs
              <router-link to="/gif/generator">
                Generator
              </router-link>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="gifs"
            >
              <template
                #item.src="{ item }"
              >
                <img style="width: 200px" :src="item.src"/>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex align-center">
          <v-file-input
            v-model="titles"
            placeholder="Загрузка архива"
            show-size
            class="mr-8"
          ></v-file-input>
          <v-btn
            color="primary"
            :disabled="!titles"
            @click="uploadTitles"
          >
            Upload
          </v-btn>
        </div>
        <div class="d-flex">
          <v-alert
            v-if="asyncMessage.type && asyncMessage.message"
            class="mt-4"
            :type="asyncMessage.type"
          >
            {{ asyncMessage.message }}
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import gif from '~/requests/gif'
import rootRequests from '~/requests/root'

export default Vue.extend({
  name: 'Gif',
  async asyncData (ctx: Context): Promise<object> {
    const gifs = await gif(ctx.$axios).get()
    return {
      gifs
    }
  },
  data: () => ({
    headers: [
      { text: 'Uuid', value: 'uuid' },
      { text: 'Image', value: 'src' }
    ],
    gifs: [],
    titles: '',
    loaded: false,
    asyncMessage: { type: '', message: '' }
  }),
  methods: {
    async uploadTitles () {
      if (this.titles) {
        const formData = new FormData()
        formData.append('source_titles', this.titles)
        this.loaded = true
        this.asyncMessage = { type: '', message: '' }
        try {
          const response = await rootRequests(this.$axios).uploadTitles(formData)
          this.loaded = false
          this.asyncMessage = { type: 'success', message: response.success.message }
        } catch (e) {
          this.loaded = false
          this.asyncMessage = { type: 'success', message: e.response.error.message }
        }
      }
    }
  }
})
</script>

<style scoped>

</style>
