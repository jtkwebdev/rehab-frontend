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
    <DisplayStates :cities="cities" />
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    const url = baseURL + '/api/state/' + params.state + '?page=' + params.page
    const page = params.page

    return await $axios.$get(url).then((res) => {
      let loc = ''
      if (params.id !== null) {
        loc = res.cities[0].state_name
      } else if (params.city) {
        loc = res.cities[0].city_name
      }
      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        Listings.push(new Listing(res.listings[i]))
      }

      return {
        listings: Listings,
        cities: res.cities,
        next_page: '/states/' + params.state + '/page/' + res.next_page,
        prev_page: '/states/' + params.state + '/page/' + res.prev_page,
        currentLocation: loc,
        page
      }
    })
  },

  data() {
    return {
      page: 1,
      full_path: '',
      currentLocation: '',
      listings: null,
      cities: [],
      next_page: '',
      prev_page: ''
    }
  },
  head() {
    const listing = this.listings[0]
    const treatmentPhilosophy =
      listing.treatment_philosophy != null
        ? listing.treatment_philosophy
        : 'Get help now.'
    const name =
      'Browse Rehabs in ' + this.currentLocation + ' | TopRatedRehabs.com'
    const description = 'Find Rehabs in ' + this.currentLocation
    const photo = this.listings[0].photos
      ? this.listings[0].photos[0].file_name
      : null
    const photoAlt =
      'Photo of ' +
      this.listings[0].name +
      ' Treatment Center at TopRatedRehabs'
    if (this.currentLocation) {
      return {
        title: name,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              this.currentLocation +
              '. Find a local listing for rehabs to treat addiction near you. ' +
              treatmentPhilosophy
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
            hid: 'twitter:image',
            name: 'twitter:image',
            content: photo
          },
          {
            hid: 'twitter:image:alt',
            name: 'twitter:image:alt',
            content: photoAlt
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
            hid: 'og:image',
            property: 'og:image',
            content: photo
          },
          {
            hid: 'og:image:secure_url',
            property: 'og:image:secure_url',
            content: photo
          },
          {
            hid: 'og:image:alt',
            property: 'og:image:alt',
            content: photoAlt
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
