<template>
  <v-card class="mx-auto" width="500">
    <v-img class="white--text align-end" height="200px" :src="news?.urlToImage">
      <v-card-title>
        <a :href="news?.url" class="text-decoration-none">
          #{{ index }} {{ news?.title }}</a
        >
      </v-card-title>

      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            v-if="news?.urlToImage"
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
          <v-col v-else class="black fill-height">
            <v-icon class="col-12" min-height="200px"> mdi-note-alert </v-icon>
          </v-col>
        </v-row>
      </template>
    </v-img>

    <v-card-subtitle class="pb-0">
      <v-row class="pb-2">
        <v-col>
          {{ dateToHuman(news?.publishedAt) }}
        </v-col>
        <v-col left>
          <v-chip small pill>
            <v-icon left> mdi-account-outline </v-icon>
            {{ news?.author || 'Unknown' }}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ news?.author }}</div>
      <div v-html="news?.description"></div>
    </v-card-text>

    <v-card-actions>
      <NuxtLink
        v-if="news?.source.id"
        :to="`/news/source/${news?.source.id}`"
        class="text-decoration-none d-block"
      >
        <v-chip class="ma-2" outlined style="cursor: pointer">
          <v-icon left> mdi-origin </v-icon>
          {{ news?.source.name }}
        </v-chip>
      </NuxtLink>

      <NuxtLink
        v-if="selectedCountry"
        :to="`/news/country/${selectedCountry}`"
        class="text-decoration-none d-block"
      >
        <v-chip class="ma-2" outlined style="cursor: pointer">
          <v-icon left> mdi-earth </v-icon>
          {{ getCountryCompleteName(selectedCountry) }}
        </v-chip>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { NewsInterface } from '~/interfaces'
import { dateToHuman, getCountryCompleteName } from '@/utils'
import { countries } from '~/assets/coutries'

@Component({
  computed: {
    ...mapGetters(['selectedCountry']),
  },
})
export default class News extends Vue {
  @Prop() news!: NewsInterface | null
  @Prop() index!: number

  selectedCountry!: string

  countries = countries
  getCountryCompleteName = getCountryCompleteName

  dateToHuman: Function = dateToHuman
}
</script>

<style lang="scss" scoped>
a {
  transition: transform 0.5s ease;
  &:hover {
    color: darkblue;
    transform: scale(1.02);
    box-shadow: 2px inset;
  }
}
</style>
