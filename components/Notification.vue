<template>
  <div class="notification">
    <v-alert
      v-for="notification in notifications"
      :key="notification.uuid"
      v-model="notification.isShow"
      dismissible
      class="notification__item"
      :type="notification.type"
    >
      {{ notification.message }}
    </v-alert>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'Notification',
  data: () => ({
    notifications: []
  }),
  created () {
    this.setNotifications()
  },
  methods: {
    setNotifications () {
      this.$nuxtSocket({ channel: '/', reconnection: true }).on('notification', (msg) => {
        this.notifications = JSON.parse(msg).map(item => ({ ...item, isShow: true }))
        const audio = new Audio('/sounds/notify.mp3')
        audio.play()
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 20px;
  top: 70px;
  z-index: 999;

  &__item {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>
