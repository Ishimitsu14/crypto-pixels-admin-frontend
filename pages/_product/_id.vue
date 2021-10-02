<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="mb-10">
          Unicorn #{{ product.id }}
        </h1>
        <v-form>
          <v-row>
            <v-col>
              <div style="width: 100%" class="d-flex flex-column">
                <div class="d-flex mb-8">
                  <div class="d-flex flex-column mr-8">
                    <h3 class="mb-5">
                      Id
                    </h3>
                    <div>
                      {{ product.id }}
                    </div>
                  </div>
                  <div class="d-flex flex-column mr-8">
                    <h3 class="mb-5">
                      Uuid
                    </h3>
                    <div>
                      {{ product.uuid }}
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <h3 class="mb-5">
                      Status
                    </h3>
                    <div>
                      {{ status }}
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <div style="width: 25%" class="d-flex flex-column mr-8">
                    <h3 class="mb-5">
                      Attributes
                    </h3>
                    <div
                      v-for="(attribute, index) in product.attributes"
                      :key="index"
                      class="d-flex"
                    >
                      <div style="width: 120px">
                        {{ attribute.trait_type }}
                      </div>
                      <div>
                        {{ attribute.value }}
                      </div>
                    </div>
                  </div>
                  <div style="width: 25%" class="d-flex flex-column mr-8">
                    <h3 class="mb-5">
                      Stats
                    </h3>
                    <div
                      v-for="(stat, index) in product.stats"
                      :key="index"
                      class="d-flex"
                    >
                      <div>
                        {{ stat.name }}: {{ stat.value }}
                      </div>
                    </div>
                  </div>
                  <div v-if="src" class="d-flex flex-column">
                    <h3 class="mb-5">
                      Image
                    </h3>
                    <img class="poster mb-6" :src="src" :alt="`Unicorn #${product.id}`" />
                    <div
                      v-if="product.status === statuses.NOT_UPLOADED.value"
                      class="d-flex flex-column"
                    >
                      <v-file-input
                        v-model="uploadImage"
                        label="Upload image for change"
                        show-size
                        class="mr-8"
                        style="width: 100%"
                        accept="image/png"
                      />
                      <v-btn @click="upload">
                        Upload and change
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { IProduct } from '~/types/IProduct'
import requestProduct from '~/requests/product'
import { statuses } from '~/constants/statuses'

export default Vue.extend({
  data: () => ({
    product: {} as IProduct,
    src: '',
    uploadImage: {} as File | object,
    statuses
  }),
  computed: {
    status () {
      let status = ''
      Object.keys(statuses).forEach((i: string) => {
        if (statuses[i].value === this.product.status) {
          status = statuses[i]?.text
        }
      })
      return status
    }
  },
  async created () {
    await this.getProduct()
  },
  methods: {
    async upload () {
      if (this.uploadImage) {
        const formData = new FormData()
        // @ts-ignore
        formData.append('file', this.uploadImage)
        try {
          await requestProduct(this.$axios).upload(formData, this.product.id)
          await this.getProduct()
        } catch (e) {
          console.log(e)
        }
      }
    },
    async getProduct () {
      this.product = await requestProduct(this.$axios).find(parseInt(this.$route.params.id))
      await this.setSrc()
    },
    async setSrc () {
      this.src = await requestProduct(this.$axios).getImageData(this.product.uuid)
    }
  }
})
</script>

<style lang="scss" scoped>
.poster {
  width: 400px;
}
</style>
