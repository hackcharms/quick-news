<template>
  <div>
    <v-container>
      <NewsFilter :reloadNews="getNews" />
      <v-row v-if="isNewsLoading">
        <v-col v-for="index in 2" :key="index" class="col-12 col-md-6">
          <NewsCardSkeleton />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col
          v-for="(news, index) in newsBasedOnPage"
          :key="`${news?.source.id}-${index}`"
        >
          <NewsCard :news="news" :index="newsIndex(index)" />
        </v-col>
      </v-row>
      <v-row class="d-flex my-4" justify="center">
        <Paginator v-model="page" :length="pageLength" />
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
// import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { NewsInterface } from '~/interfaces'
// import newDataFromFile from '~/static/news'
import NewsCardSkeleton from '~/components/skeleton/NewsCardSkeleton.vue'

@Component({
  components: { NewsCardSkeleton },
  computed: {
    ...mapGetters(['isNewsLoading', 'selectedCategory', 'selectedCountry']),
  },
  methods: {
    ...mapMutations(['updateIsnewsLoading']),
  },
})
export default class extends Vue {
  newsData: Array<NewsInterface | null> = []

  isNewsLoading!: boolean
  selectedCategory!: string
  selectedCountry!: string
  updateIsnewsLoading!: Function

  page: number = 1

  perPageData: number = 10

  @Watch('page')
  watchpage(value: number, old: number) {
    console.log('page Watched value', value, old)
  }

  get pageLength() {
    return Math.ceil(this.newsData.length / this.perPageData)
  }

  get newsBasedOnPage() {
    return this.newsData.slice(
      (this.page - 1) * this.perPageData,
      this.page * this.perPageData
    )
  }

  async getNews() {
    const newsData = await this.$axios.$get(`top-headlines`, {
      params: {
        category: this.selectedCategory,
        country: this.selectedCountry,
      },
    })
    this.newsData = newsData.articles as NewsInterface[]
    this.updateIsnewsLoading(false)
  }

  newsIndex(index: number): number {
    return (this.page - 1) * this.perPageData + index + 1
  }

  async mounted() {
    await this.getNews()
  }
}
</script>
<style scoped></style>
