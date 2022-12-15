<template>
  <div>
    <v-container>
      <h1 class="pb-6 text-center">
        Top Headlines in
        <span class="text-capitalize">
          {{ $route.params.source.replaceAll('\-', ' ') }}
        </span>
      </h1>
      <NewsIndexComponent :news-data="newsData" />
    </v-container>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { mapGetters, mapMutations, mapActions } from 'vuex'

import { NewsInterface } from '~/interfaces'

import NewsIndexComponent from '@/components/NewsIndex.vue'

import NewsCardSkeleton from '~/components/skeleton/NewsCardSkeleton.vue'

@Component({
  components: { NewsCardSkeleton, NewsIndexComponent },
  computed: {
    ...mapGetters(['isNewsLoading', 'newsData']),
  },
  methods: {
    ...mapMutations(['updateIsnewsLoading']),
    ...mapActions(['resetPaginatorCurrentPage']),
  },
})
export default class Source extends Vue {
  newsData!: Array<NewsInterface | null>

  isNewsLoading!: boolean

  updateIsnewsLoading!: Function

  resetPaginatorCurrentPage!: Function

  async getNews() {
    this.updateIsnewsLoading(true)
    const newsData = await this.$axios.$get(`everything`, {
      params: {
        sources: this.$route.params.source,
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
