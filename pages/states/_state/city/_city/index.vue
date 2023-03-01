<template>
  <div>
    <Breadcrumbs :location="location" :back-more="back_more" :back="back" />
    <ListingCard
      :listings="listings"
      :prevpage="page > 1 ? prev_page : ''"
      :nextpage="next_page"
      :current-location="currentLocation"
    />
    <DisplayStates :cities="cities" />
    {{ next_page }} {{ prev_page }}
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    const url = baseURL + '/api/state/' + params.state + '/city/' + params.city
    return await $axios.$get(url).then((res) => {
      let loc = ''
      if (params.city !== null && params.state !== null) {
        loc = res.city.city_name + ', ' + res.city.state_name
      } else if (params.city !== null) {
        loc = res.city.city_name
      } else if (params.state !== null) {
        loc = res.states[0].state_name
      }
      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        Listings.push(new Listing(res.listings[i]))
      }

      const page = params.page != null ? params.page : 1
      return {
        listings: Listings,
        cities: res.cities,
        next_page:
          res.next_page !== -1
            ? '/states/' +
              params.state +
              '/city/' +
              params.city +
              '/page/' +
              res.next_page
            : null,
        prev_page:
          res.prev_page !== -1
            ? '/states/' +
              params.state +
              '/city/' +
              params.city +
              '/page/' +
              res.prev_page
            : null,
        currentLocation: loc,
        city: res.city,
        back: '/states/' + params.state + '/city/' + params.city,
        back_more: '/states/' + params.state,
        location: {
          stateName: params.state,
          cityName: params.city
        },
        page
      }
    })
  },
  data() {
    return {
      page: 1,
      full_path: '',
      currentLocation: null,
      next_page: null,
      prev_page: null,
      back: null,
      back_more: null,
      cities: null
    }
  },
  head() {
    if (this.currentLocation) {
      return {
        title: 'Rehabs in ' + this.currentLocation
      }
    } else {
      return {
        title: 'Drug and Alcohol Rehabs and Detoxes'
      }
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    getZips() {
      const listings = this.listings
      const onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index
      }
      const arc = []
      let i
      for (i = 0; i < listings.length; i++) {
        arc.push(listings[i].address.zipCode)
      }
      return arc.filter(onlyUnique).join(', ')
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
