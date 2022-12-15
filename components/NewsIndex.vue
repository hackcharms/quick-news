<template>
  <div>
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
      <Paginator v-model="paginatorCurrentPage" :page-length="pageLength" />
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
// import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { NewsInterface } from '~/interfaces'
// import newDataFromFile from '~/static/news'
import NewsCardSkeleton from '~/components/skeleton/NewsCardSkeleton.vue'

@Component({
  components: { NewsCardSkeleton },
  computed: {
    ...mapGetters([
      'isNewsLoading',
      'paginatorCurrentPage',
      'selectedCategory',
      'selectedCountry',
    ]),
  },
  methods: {
    ...mapMutations(['updateIsnewsLoading']),
  },
})
export default class NewsIndexComponent extends Vue {
  @Prop(Array) newsData!: NewsInterface[] | []

  isNewsLoading!: boolean
  selectedCategory!: string
  selectedCountry!: string
  updateIsnewsLoading!: Function

  //   paginatorCurrentPage!: number

  perPageData: number = 10

  get pageLength() {
    return Math.ceil(this.newsData.length / this.perPageData)
  }

  get newsBasedOnPage() {
    return this.newsData.slice(
      (this.paginatorCurrentPage - 1) * this.perPageData,
      this.paginatorCurrentPage * this.perPageData
    )
  }

  get paginatorCurrentPage() {
    return this.$store.getters.paginatorCurrentPage
  }

  set paginatorCurrentPage(value) {
    this.$store.commit('updatePaginatorCurrentPage', value)
  }

  newsIndex(index: number): number {
    return (this.paginatorCurrentPage - 1) * this.perPageData + index + 1
  }
}
</script>
<style scoped></style>
