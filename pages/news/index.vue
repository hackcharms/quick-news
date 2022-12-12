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
          v-for="(news, index) in newsData"
          :key="`${news?.source.id}-${index}`"
        >
          <NewsCard :news="news" />
        </v-col>
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

  async getNews() {
    const newsData = await this.$axios.$get(
      `top-headlines`,
      {
        params: {
          category: this.selectedCategory,
          country: this.selectedCountry,
        },
      }
      // (this.selectedCountry !== '' ? `country=${this.selectedCountry}` : '') +
      // (this.selectedCategory !== ''
      //   ? `categroy=${this.selectedCategory}`
      //   : '')
    )
    this.newsData = newsData.articles as NewsInterface[]
    this.updateIsnewsLoading(false)
  }

  async mounted() {
    await this.getNews()
  }
}
</script>
<style scoped></style>
