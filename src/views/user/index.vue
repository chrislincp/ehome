<template lang="html">
  <div class="user_container">
    <iframe src="http://192.168.0.193/aa/" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    setTimeout(() => {
      console.log(this.user)
    }, 1000)
  }
}
</script>

<style lang="css">
  .user_container {
    position: fixed;
    width: 100%;
    height: 100%;
  }
</style>
