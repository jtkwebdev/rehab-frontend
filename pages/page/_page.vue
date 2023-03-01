<template>
  <div>
    <div class="mt-3 m-10">
      <NuxtLink to="/" class="m-10 mt-3 text-2xl"
        >Search Rehabs by States</NuxtLink
      >
    </div>
    <ListingCard
      :listings="listings"
      :prevpage="prev_page"
      :nextpage="next_page"
    />
    <DisplayStates :states="states" />
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    const url = baseURL + '/api/states?page=' + params.page
    const page = params.page
    return await $axios.$get(url).then((res) => {
      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        Listings.push(new Listing(res.listings[i]))
      }

      return {
        listings: Listings,
        cities: res.cities,
        states: res.states,
        next_page: res.next_page !== -1 ? '/page/' + res.next_page : null,
        prev_page: res.next_page !== -1 ? '/page/' + res.prev_page : null,
        page
      }
    })
  },
  data() {
    return {
      page: 1,
      full_path: '',
      cities: null,
      states: null,
      next_page: null,
      prev_page: null
    }
  },
  head() {
    const currentLocation =
      this.currentLocation + ', ' + this.listings[0].address.zip_code
    let name = 'Browse Rehabs in ' + currentLocation
    if (this.page > 1) {
      name += ' Page ' + this.page
    }
    name += '| TopRatedRehabs.com'
    const description = 'Rehabs in ' + currentLocation + this.getZips()
    if (this.currentLocation) {
      return {
        title: name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              'Rehabs in ' +
              currentLocation +
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
              'Find a local listing for rehabs to treat addiction near you. '
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
        arc.push(listings[i].address.zip_code.toString())
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
