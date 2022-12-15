<template>
  <v-sheet class="mx-auto" width="500">
    <v-skeleton-loader type="card"></v-skeleton-loader>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
})
export default class NewsCardSkeleton extends Vue {
  theme!: {
    default: boolean
    isDark: boolean
  }
}
</script>
