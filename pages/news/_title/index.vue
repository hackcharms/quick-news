<template>
  <div>
    <NewsCard :news="news" />
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { NewsInterface } from '@/interfaces'

@Component({
  computed: {
    ...mapGetters(['newsData']),
  },
})
export default class Title extends Vue {
  newsData!: Array<NewsInterface | null>

  get news() {
    const news = this.newsData.find(
      (news) => news?.title === this.$route.params.title
    )
    if (!news?.title) {
      this.$router.push('/')
    }
    return news
  }

  mounted() {}
}
</script>
<style scoped></style>
