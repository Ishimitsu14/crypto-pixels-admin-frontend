<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title style="width: 100%">
            <div class="d-flex justify-space-between" style="width: 100%">
              Products
              <router-link to="/product/generator">
                Generator
              </router-link>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="products"
              :options.sync="options"
              :server-items-length="total"
              :footer-props="{ itemsPerPageOptions: [ 10, 30, 50, 100 ] }"
            >
              <template
                #item.product="{ item }"
              >
                <img :data-image="item.uuid" style="width: 200px">
              </template>
              <template
                #item.attributes="{ item }"
              >
                <v-btn color="primary" @click="showAttributes(item)">
                  Show attributes
                </v-btn>
              </template>
              <template
                #item.stats="{ item }"
              >
                <v-btn color="primary" @click="showStats(item)">
                  Show stats
                </v-btn>
              </template>
              <template
                #item.status="{ item }"
              >
                <v-alert :color="getStatusColor(item.status)" class="text-no-wrap mb-0" style="padding: 5px 10px">
                  {{ getStatusName(item.status) }}
                </v-alert>
              </template>
              <template
                #item.actions="{ item }"
              >
                <div class="d-flex flex-column">
                  <v-btn icon color="green" :to="`/product/${item.id}`">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="item.status === statuses.NOT_UPLOADED.value"
                    icon
                    color="red"
                    @click="destroy(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
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
              accept=".zip"
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
    <attribute-modal
      :is-show="isShowAttributes"
      :product="currentProduct"
      @close="hideAttributes"
    />
    <stats-modal
      :is-show="isShowStats"
      :product="currentProduct"
      @close="hideStats"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import requestProduct from '~/requests/product'
import AttributeModal from '~/components/product/AttributeModal.vue'
import { IProduct } from '~/types/IProduct'
import StatsModal from '~/components/product/StatsModal.vue'
import { statuses } from '~/constants/statuses'

export default Vue.extend({
  name: 'Product',
  components: { StatsModal, AttributeModal },
  data: () => ({
    headers: [
      { text: 'Id', value: 'id' },
      { text: 'Uuid', value: 'uuid' },
      { text: 'Attributes', value: 'attributes' },
      { text: 'Stats', value: 'stats' },
      { text: 'Status', value: 'status' },
      { text: 'Product', value: 'product', sortable: false },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    products: [] as IProduct[],
    tiles: {} as File | object,
    loaded: false,
    asyncMessage: { type: '', message: '' },
    sizeUploadTiles: { width: 0, height: 0 },
    options: {
      itemsPerPage: 10,
      page: 1,
      sortBy: [] as string[],
      sortDesc: [] as number[]
    },
    total: 0,
    currentProduct: {} as IProduct | object,
    isShowAttributes: false,
    isShowStats: false,
    statuses
  }),
  computed: {
    disableUploadButton () {
      return this.tiles && (this.sizeUploadTiles.width <= 0 && this.sizeUploadTiles.height <= 0)
    }
  },
  watch: {
    options () {
      this.getProducts()
    }
  },
  methods: {
    async destroy (item: IProduct) {
      const response = await requestProduct(this.$axios).destroy(item.id)
      if (response.success) {
        await this.getProducts()
      }
    },
    hideAttributes () {
      this.currentProduct = {}
      this.isShowAttributes = false
    },
    showAttributes (product: IProduct) {
      this.currentProduct = product
      this.isShowAttributes = true
    },
    hideStats () {
      this.currentProduct = {}
      this.isShowStats = false
    },
    showStats (product: IProduct) {
      this.currentProduct = product
      this.isShowStats = true
    },
    async getProducts () {
      const params: { page: number; perPage: number, sortBy: string, sortDesc: number } = {
        perPage: this.options.itemsPerPage,
        page: this.options.page,
        sortBy: this.options.sortBy[0] ? this.options.sortBy[0] : '',
        sortDesc: this.options.sortDesc[0] ? -1 : 1
      }
      const { products, total } = await requestProduct(this.$axios).get(params)
      this.total = total
      products.forEach((product: any) => this.getProductSrc(product))
      this.products = products
    },
    async uploadTiles () {
      if (this.tiles) {
        const formData = new FormData()
        // @ts-ignore
        formData.append('source_tiles', this.tiles)
        this.loaded = true
        this.asyncMessage = { type: '', message: '' }
        try {
          const response = await requestProduct(this.$axios).uploadTiles(formData, this.sizeUploadTiles)
          this.loaded = false
          this.asyncMessage = { type: 'success', message: response.success.message }
        } catch (e) {
          this.loaded = false
          this.asyncMessage = { type: 'success', message: e.response.error.message }
        }
      }
    },
    async getProductSrc (product: IProduct) {
      const image = await requestProduct(this.$axios).getImageData(product.uuid)
      const el = document.querySelector(`[data-image="${product.uuid}"]`)
      if (el) {
        el.setAttribute('src', image)
      }
    },
    getStatusName (statusNumber: number) {
      let status = ''
      Object.keys(statuses).forEach((i: string) => {
        if (statuses[i].value === statusNumber) {
          status = statuses[i]?.text
        }
      })
      return status
    },
    getStatusColor (statusNumber: number) {
      let color = ''
      let status: { text: string, value: number } = { text: '', value: 0 }
      Object.keys(statuses).forEach((i: string) => {
        if (statuses[i].value === statusNumber) {
          status = statuses[i]
        }
      })
      if (status && status.value) {
        switch (status.value) {
          case statuses.NOT_UPLOADED.value:
            color = 'gray'
            break
          case statuses.UPLOADED_TO_IPFS.value:
            color = 'primary'
            break
          case statuses.PENDING_SELL.value:
            color = 'warning'
            break
          case statuses.GIVE_AWAY.value:
            color = 'info'
            break
          case statuses.SOLD.value:
            color = 'success'
            break
        }
      }
      return color
    }
  }
})
</script>

<style lang="scss" scoped></style>
