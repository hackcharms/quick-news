<template>
  <!-- :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" -->
  <v-sheet class="pa-2" max-width="500">
    <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  // Vuetify components provide
  // a theme variable that is
  // used to determine dark
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
