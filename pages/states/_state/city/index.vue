<template>
  <div>
    <div class="m-10 mt-5">
      <NuxtLink class="underline" to="/">Home</NuxtLink>
    </div>
    <ListingCard
      :listings="listings"
      :prevpage="page > 1 ? prev_page : ''"
      :nextpage="next_page"
      :current-location="currentLocation"
    />
    <DisplayStates :cities="cities" />
  </div>
</template>
<script>
import Listing from '@/components/ListingClass'

export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    const url = baseURL + '/api/state/' + params.id + '?page=' + params.page
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
        next_page:
          res.next_page !== -1
            ? '/states/' + params.id + '/page/' + res.next_page
            : null,
        prev_page:
          res.prev_page !== -1
            ? '/states/' + params.id + '/page/' + res.prev_page
            : null,
        currentLocation: res.cities[0].city_name,
        page
      }
    })
  },
  data() {
    return {
      page: 1,
      full_path: '',
      currentLocation: '',
      prev_page: null,
      next_page: null
    }
  },
  head() {
    const listing = this.listing
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
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
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
