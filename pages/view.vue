<template>
  <div>
    <v-container>
      <v-row>
        <iframe
          class="col-12 height-70vh"
          :src="$route.query.url"
          frameborder="0"
          @error="handleError"
        ></iframe>
      </v-row>
    </v-container>
    <v-container class="p-4">
      <p>
        If above iFrame is not working you can click on the following button to
        view on actual domain.
      </p>
      <v-row class="d-flex" justify="center">
        <a :href="$route.query.url" class="d-block">
          <v-chip class="ma-2" color="primary" style="cursor: pointer">
            Full content
          </v-chip>
        </a>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class News extends Vue {
  handleError($e: any) {
    console.log('error dailed', $e)
    window.location.replace(this.$route.query.url as string)
  }
}
</script>
<style lang="scss" scoped>
.height-70vh {
  height: 70vh;
}
</style>
