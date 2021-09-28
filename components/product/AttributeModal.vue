<template>
  <v-dialog
    :value="isShow"
    persistent
    max-width="600px"
    @click:outside="$emit('close')"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">
          Attributes #{{ product.id }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <div class="d-flex flex-column attributes">
                <div
                  v-for="(attribute, index) in product.attributes"
                  :key="index"
                  class="d-flex attributes__item"
                >
                  <div
                    class="attributes__name"
                  >
                    {{ attribute.trait_type }}
                    <v-tooltip
                      top
                      :open-on-hover="false"
                    >
                      <template #activator="{ on }">
                        <v-btn
                          :key="`value-${index}`"
                          icon
                          @click="copy($event, on, attribute.trait_type)"
                        >
                          <v-icon small>
                            mdi-content-copy
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Copied successfully</span>
                    </v-tooltip>
                  </div>
                  <div
                    class="attributes__value"
                  >
                    {{ attribute.value }}
                    <v-tooltip
                      top
                      :open-on-hover="false"
                    >
                      <template #activator="{ on }">
                        <v-btn
                          :key="`value-${index}`"
                          icon
                          @click="copy($event, on, attribute.value)"
                        >
                          <v-icon small>
                            mdi-content-copy
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>Copied successfully</span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { IProduct } from '~/types/IProduct'

export default Vue.extend({
  name: 'AttributeModal',
  props: {
    product: {
      type: Object as () => IProduct,
      required: true
    },
    isShow: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async copy ($event: any, tooltip: any, text: string): Promise<void> {
      const cb = navigator.clipboard
      await cb.writeText(text)
      tooltip.click($event)
      setTimeout(() => tooltip.click($event), 1000)
    }
  }
})
</script>

<style lang="scss" scoped>
.attributes {
  margin: 5px 0;
  &__item {
    background: #565656;
    padding: 5px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
  &__name, &__value {
    width: 50%;
  }
}
</style>
