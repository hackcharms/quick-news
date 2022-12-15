<template>
  <div>
    <v-container>
      <h1 class="pb-6 text-center">
        Top Headlines in {{ getCountryValueBasedOnKey('country') }}
      </h1>
      <NewsIndexComponent :news-data="newsData" />
    </v-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { mapGetters, mapMutations, mapActions } from 'vuex'

import { NewsInterface } from '~/interfaces'

import NewsCardSkeleton from '~/components/skeleton/NewsCardSkeleton.vue'
import { getCountry } from '@/utils'

import NewsIndexComponent from '@/components/NewsIndex.vue'

@Component({
  components: { NewsCardSkeleton, NewsIndexComponent },
  computed: {
    ...mapGetters([
      'isNewsLoading',
      'selectedCategory',
      'selectedCountry',
      'newsData',
    ]),
  },
  methods: {
    ...mapMutations(['updateIsnewsLoading']),
    ...mapActions(['resetPaginatorCurrentPage']),
  },
})
export default class Country extends Vue {
  newsData!: Array<NewsInterface | null>

  selectedCountry!: string

  updateIsnewsLoading!: Function

  resetPaginatorCurrentPage!: Function

  getCountry: Function = getCountry
  get getCountryValueBasedOnKey() {
    return this.getCountry('code')(this.selectedCountry)
  }

  async getNews() {
    this.updateIsnewsLoading(true)
    const newsData = await this.$axios.$get(`everything`, {
      params: {
        q: this.$route.params.country,
        pageSize: 100,
      },
    })

    this.$store.commit('updateNewsData', newsData.articles)

    this.resetPaginatorCurrentPage()
    this.updateIsnewsLoading(false)
  }

  async mounted() {
    await this.getNews()
  }
}
</script>
<style scoped></style>
