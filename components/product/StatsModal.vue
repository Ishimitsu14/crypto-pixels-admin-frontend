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
          Stats #{{ product.id }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <div class="d-flex flex-column stats">
                <div
                  v-for="(stat, index) in product.stats"
                  :key="index"
                  class="d-flex stats__item"
                >
                  {{ stat.name }}: {{ stat.value }}
                  <v-tooltip
                    top
                    :open-on-hover="false"
                  >
                    <template #activator="{ on }">
                      <v-btn
                        icon
                        @click="copy($event, on, `${stat.name}: ${stat.value}`)"
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
  name: 'StatsModal',
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
.stats {
  margin: 5px 0;
  &__item {
    display: flex;
    align-items: center;
    background: #565656;
    padding: 5px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
