<template>
  <v-card class="mx-auto" width="500">
    <v-img
      class="align-end"
      height="200px"
      :src="news?.urlToImage"
      @error="imageErrorHandle"
    >
      <v-card-title class="bg-gradient">
        <NuxtLink
          :to="`/view/?url=${news?.url}`"
          class="text-decoration-none text-custom-hover"
        >
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
        <v-col cols="12" md="6">
          <time>
            {{ dateToHuman(news?.publishedAt) }}
          </time>
        </v-col>
        <v-col cols="12" md="6" left>
          <v-btn
            rel="author"
            href="#"
            class="text-none text-custom-hover"
            rounded
            small
          >
            <v-icon left> mdi-account-outline </v-icon>
            {{ news?.author || 'Unknown' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <article v-html="news?.description"></article>
    </v-card-text>

    <v-card-actions>
      <v-btn
        v-if="news?.source.id"
        :to="`/source/${news?.source.id}`"
        class="text-none text-custom-hover"
        target="active"
        outlined
        rounded
        small
      >
        <v-icon left> mdi-origin </v-icon>
        {{ news?.source.name }}
      </v-btn>

      <v-btn
        v-if="selectedCountry"
        :href="`/country/${selectedCountry}`"
        class="text-none text-custom-hover"
        target="active"
        outlined
        rounded
        small
      >
        <v-icon left> mdi-earth </v-icon>
        <address>
          {{ getCountry('code')(selectedCountry)('country') }}
        </address>
      </v-btn>
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
.text-custom-hover {
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
