<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title style="width: 100%">
            <div class="d-flex justify-space-between" style="width: 100%">
              Gifs
              <router-link to="/product/generator">
                Generator
              </router-link>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="generatedItems"
            >
              <template
                #item.product="{ item }"
              >
                <img style="width: 200px" :src="getProductSrc(item)"/>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="d-flex flex-column">
          <div class="d-flex mb-5">
            <v-file-input
              v-model="tiles"
              label="Upload archive with source images"
              show-size
              class="mr-8"
            />
          </div>
          <div class="d-flex align-center">
            <v-text-field
              v-model="sizeUploadTiles.width"
              class="mr-2"
              label="Width of images"
            />
            <v-text-field
              v-model="sizeUploadTiles.height"
              class="mr-2"
              label="Height of images"
            />
            <v-btn
              color="primary"
              :disabled="disableUploadButton"
              @click="uploadTiles"
            >
              Upload
            </v-btn>
          </div>
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
import product from '~/requests/product'

export default Vue.extend({
  name: 'Product',
  async asyncData (ctx: Context): Promise<object> {
    const generatedItems = await product(ctx.$axios).get()
    return {
      generatedItems
    }
  },
  data: () => ({
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Meta Data', value: 'json' },
      { text: 'Sold', value: 'is_sold' },
      { text: 'Attributes', value: 'attributes' },
      { text: 'Created At', value: 'createdAt' },
      { text: 'Product', value: 'product', sortable: false }
    ],
    generatedItems: [],
    tiles: '',
    loaded: false,
    asyncMessage: { type: '', message: '' },
    sizeUploadTiles: { width: 0, height: 0 }
  }),
  computed: {
    disableUploadButton () {
      return this.tiles && (this.sizeUploadTiles.width <= 0 && this.sizeUploadTiles.height <= 0)
    }
  },
  methods: {
    async uploadTiles () {
      if (this.tiles) {
        const formData = new FormData()
        formData.append('source_tiles', this.tiles)
        this.loaded = true
        this.asyncMessage = { type: '', message: '' }
        try {
          const response = await product(this.$axios).uploadTiles(formData, this.sizeUploadTiles)
          this.loaded = false
          this.asyncMessage = { type: 'success', message: response.success.message }
        } catch (e) {
          this.loaded = false
          this.asyncMessage = { type: 'success', message: e.response.error.message }
        }
      }
    },
    getProductSrc (product: any) {
      return `${process.env.API_URL}/product/${product.uuid}`
    }
  }
})
</script>

<style scoped>

</style>
