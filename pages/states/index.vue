<template>
  <div>
    <div class="m-10 mt-5">
      <NuxtLink class="underline" to="/">Home</NuxtLink>
    </div>
    <DisplayStates :states="states" />
    <ListingCard :listings="listings" />
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    return await $axios.$get(baseURL + '/api/states').then((res) => {
      let currentLocation = ''
      if (params.city != null && params.state != null) {
        currentLocation =
          res.cities[0].city_name + ', ' + res.cities[0].state_name
      }
      if (params.city != null) {
        currentLocation = res.cities[0].state_name
      } else if (params.city) {
        currentLocation = res.cities[0].city_name
      }
      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        Listings.push(new Listing(res.listings[i]))
      }

      return {
        currentLocation,
        cities: res.cities,
        states: res.states,
        listings: Listings
      }
    })
  },
  data() {
    return {
      currentLocation: ''
    }
  },
  head() {
    const name =
      'Rehabs in ' +
      this.currentLocation +
      '. Find a local listing for rehabs to treat addiction near you.'
    const description =
      this.currentLocation +
      '. Find a local listing for rehabs to treat addiction near you.' +
      this.getZips()
    if (this.currentLocation) {
      return {
        title: name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: name
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
          }
        ]
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
