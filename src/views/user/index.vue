<template lang="html">
  <div class="user_container">
    {{user.id}}
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
    console.log(this.user)
  }
}
</script>

<style lang="css">
</style>
