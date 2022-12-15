<template>
  <div v-if="pageLength > 1" class="text-center">
    <v-pagination
      :value="value"
      :length="pageLength"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
      :total-visible="7"
      @input="(input) => $emit('input', input)"
    ></v-pagination>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Paginator extends Vue {
  @Prop(Number) value!: number
  @Prop(Number) pageLength!: number
}
</script>
