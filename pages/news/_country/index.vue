<template>
  <div>
    {{ $route.fullPath }}
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export default class Country extends Vue {}
</script>
<style scoped></style>
