<template>
  <div>
    <v-form>
      <v-container class="py-2">
        <v-row class="d-flex m-auto" justify="center">
          <v-col class="d-flex m-auto" :md="5" cols="12">
            <v-select
              v-model="selectedCountryStore"
              :items="countries"
              label="Select target Countries"
              item-text="country"
              item-value="code"
              hide-details
              prepend-icon="mdi-earth"
              single-line
              dense
            ></v-select>
          </v-col>
          <v-col class="d-flex m-auto" :md="5" cols="12">
            <v-select
              v-model="selectedCategoryStore"
              :items="categories"
              label="Select target Category"
              hide-details
              prepend-icon="mdi-filter-variant"
              single-line
              dense
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider class="mb-5" />
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

@Component({
  computed: {
    ...mapGetters(['selectedCategory', 'selectedCountry']),
  },
  methods: {
    ...mapMutations(['updateSelectedCategory', 'updateSelectedCountry']),
  },
})
export default class NewsFilter extends Vue {
  @Prop() reloadNews!: Function

  title: string = ''
  countries: Array<{ country: string; code: string }> = [
    {
      country: 'India',
      code: 'in',
    },
    {
      country: 'United State Of America',
      code: 'us',
    },
    { country: 'China', code: 'ch' },
    {
      country: 'United Arab',
      code: 'ua',
    },
  ]

  categories: Array<string> = [
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ]

  selectedCountry!: string
  selectedCategory!: string
  updateSelectedCategory!: Function
  updateSelectedCountry!: Function

  get selectedCategoryStore() {
    return this.selectedCategory
  }

  set selectedCategoryStore(value) {
    this.updateSelectedCategory(value)
    this.reloadNews()
  }

  get selectedCountryStore() {
    return this.selectedCountry
  }

  set selectedCountryStore(value) {
    this.updateSelectedCountry(value)
    this.reloadNews()
  }
}
</script>
<style scoped></style>
