<template>
  <div>
    <TheHeader />
    <div class="m-10 mt-5">
      <NuxtLink class="underline" to="/">Home</NuxtLink> ...
      <a :href="`${back_more}`" class="underline">{{ cities[0].state_name }}</a>
      ... <a :href="`${back}`" class="underline">{{ cities[0].city_name }}</a>
    </div>
    <ListingCard
      class="-mt-10"
      :listings="listings"
      :prevpage="page > 1 ? prev_page : ''"
      :nextpage="next_page"
      :current-location="currentLocation"
    />
    <Footer :cities="cities" />
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    const url =
      baseURL +
      '/api/state/' +
      params.state +
      '/city/' +
      params.city +
      '?page=' +
      params.page
    const page = params.page
    return await $axios.$get(url).then((res) => {
      let loc = ''
      if (params.city !== null && params.state !== null) {
        loc = res.cities[0].city_name + ', ' + res.cities[0].state_name
      } else if (params.city !== null) {
        loc = res.cities[0].city_name
      } else if (params.state !== null) {
        loc = res.states[0].state_name
      }
      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        Listings.push(new Listing(res.listings[i]))
      }

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
        page,
        back: '/states/' + params.state + '/city/' + params.city,
        back_more: '/states/' + params.state
      }
    })
  },
  data() {
    return {
      page: 1,
      full_path: '',
      currentLocation: null,
      prev_page: null,
      next_page: null,
      back: null,
      back_more: null,
      cities: null
    }
  },
  head() {
    const name =
      'Browse Rehabs in ' + this.currentLocation + ' | TopRatedRehabs.com'
    const description = 'Find Rehabs in ' + this.currentLocation
    if (this.currentLocation) {
      return {
        title: name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Rehabs in ' +
              this.currentLocation +
              '. Find a local listing for rehabs to treat addiction near you. '
          },
          {
            hid: 'twitter:title',
            name: 'twitter:title',
            content: name
          },
          {
            hid: 'twitter:description',
            name: 'twitter:description',
            content: description
          },
          {
            hid: 'og:title',
            property: 'og:title',
            content: name
          },
          {
            hid: 'og:description',
            property: 'og:description',
            content: description
          },
          {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: name
          }
        ]
      }
    } else {
      return {
        title: 'Drug and Alcohol Rehabs and Detoxes',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              '. Find a local listing for rehabs to treat addiction near you. '
          }
        ]
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
