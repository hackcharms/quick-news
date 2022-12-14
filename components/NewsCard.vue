<template>
  <v-card class="mx-auto" width="500">
    <v-img
      class="white--text align-end"
      height="200px"
      :src="news?.urlToImage"
      @error="imageErrorHandle"
    >
      <v-card-title class="bg-gradient">
        <NuxtLink :to="`/view/?url=${news?.url}`" class="text-decoration-none">
          #{{ index }} {{ news?.title }}
        </NuxtLink>
      </v-card-title>

      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            v-if="news?.urlToImage && !imageLoadError"
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
        :to="`/source/${news?.source.id}`"
        class="text-decoration-none d-block"
      >
        <v-chip class="ma-2" outlined style="cursor: pointer">
          <v-icon left> mdi-origin </v-icon>
          {{ news?.source.name }}
        </v-chip>
      </NuxtLink>

      <NuxtLink
        v-if="selectedCountry"
        :to="`/country/${selectedCountry}`"
        class="text-decoration-none d-block"
      >
        <v-chip class="ma-2" outlined style="cursor: pointer">
          <v-icon left> mdi-earth </v-icon>
          <!-- {{ getCountryCompleteName(selectedCountry) }} -->
          {{ getCountry('code')(selectedCountry)('country') }}
        </v-chip>
      </NuxtLink>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { NewsInterface } from '~/interfaces'
import { dateToHuman, getCountryCompleteName, getCountry } from '@/utils'
import { countries } from '~/assets/coutries'

@Component({
  computed: {
    ...mapGetters(['selectedCountry']),
  },
})
export default class News extends Vue {
  @Prop(Object) news!: NewsInterface | null
  @Prop(Number) index!: number

  selectedCountry!: string

  imageLoadError: boolean = false

  countries = countries
  getCountryCompleteName = getCountryCompleteName
  getCountry: Function = getCountry

  dateToHuman: Function = dateToHuman

  imageErrorHandle() {
    this.imageLoadError = true
  }
}
</script>

<style lang="scss" scoped>
a {
  transition: transform 0.5s ease;
  color: rgb(227, 213, 213);
  &:hover {
    color: white;
    transform: scale(1.02);
  }
}
.bg-gradient {
  background-image: linear-gradient(transparent, black);
}
</style>
