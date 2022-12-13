<template>
  <v-card class="mx-auto" max-width="500">
    <v-img class="white--text align-end" height="200px" :src="news?.urlToImage">
      <v-card-title>#{{ index }} {{ news?.title }}</v-card-title>

      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ dateToHuman(news?.publishedAt) }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ news?.author }}</div>
      <div v-html="news?.description"></div>
    </v-card-text>

    <v-card-actions>
      <NuxtLink v-if="news?.source.id" :to="`/news/${news?.source.id}`">
        <v-chip class="ma-2" color="success" outlined>
          <v-icon left> mdi-server-plus </v-icon>
          {{ news?.source.name }}
        </v-chip>
      </NuxtLink>

      <v-btn color="orange" text> Read More </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { NewsInterface } from '~/interfaces'
import { dateToHuman } from '@/utils'

@Component
export default class News extends Vue {
  @Prop() news!: NewsInterface | null
  @Prop() index!: number

  dateToHuman: Function = dateToHuman
}
</script>
