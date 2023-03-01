<template>
  <div>
    <TemporaryListing :listing="listing" :prevpage="prev" :nextpage="next" />
    <v-row>
      <v-col>
        <ListingExtras :listing="listing"/>
      </v-col>
      <v-col>
        <TheReviews :listing="listing"/>
      </v-col>
    </v-row>
    <ListingCard :listings="listings" :currentLocation="listing.location.stateName"/>
    <DisplayStates :cities="cities"/>
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    console.log("p",params)
    const url = baseURL + '/api/listing/' + params.slug
    return await $axios.$get(url).then((res) => {
      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        Listings.push(new Listing(res.listings[i]))
      }
      const listing = new Listing(res.listing)

      return {
        listing,
        listings: Listings,
        cities: res.cities,
        next: res.next,
        prev: res.prev,
      }
    })
  },
  data() {
    return {
      listingName: null,
      location: null,
      next: null,
      prev: null,
      back_more: null,
      back: null
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
<style>
.nuxt-content p {
  margin-bottom: 20px;
}
.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
}
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
