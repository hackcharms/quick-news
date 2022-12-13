<template>
  <div>
    <v-container>
      <h1 class="pb-6 text-center">
        Top Headlines in
        <span class="text-capitalize">
          {{ $route.params.source.replaceAll('\-', ' ') }}
        </span>
      </h1>
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
import { Component, Vue } from 'vue-property-decorator'
// import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { NewsInterface } from '~/interfaces'
// import newDataFromFile from '~/static/news'
import NewsCardSkeleton from '~/components/skeleton/NewsCardSkeleton.vue'

@Component({
  components: { NewsCardSkeleton },
  computed: {
    ...mapGetters(['isNewsLoading']),
  },
  methods: {
    ...mapMutations(['updateIsnewsLoading']),
  },
})
export default class Source extends Vue {
  newsData: Array<NewsInterface | null> = []

  isNewsLoading!: boolean

  updateIsnewsLoading!: Function

  page: number = 1

  perPageData: number = 10

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
        sources: this.$route.params.source,
        pageSize: 100,
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
