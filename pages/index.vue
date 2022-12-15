<template>
  <div>
    <v-container>
      <NewsFilter @reload-news="getNews" />
      <NewsIndexComponent :news-data="newsData" />
    </v-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import NewsIndexComponent from '../components/NewsIndex.vue'

import { NewsInterface } from '~/interfaces'

import NewsCardSkeleton from '~/components/skeleton/NewsCardSkeleton.vue'

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
export default class NewsIndex extends Vue {
  newsData!: Array<NewsInterface | null>
  selectedCategory!: string
  selectedCountry!: string

  updateIsnewsLoading!: Function
  resetPaginatorCurrentPage!: Function

  async getNews() {
    this.updateIsnewsLoading(true)
    const newsData = await this.$axios.$get(`everything`, {
      params: {
        q:
          this.selectedCategory +
          (this.selectedCountry && this.selectedCategory && ' OR ') +
          this.selectedCountry,
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
