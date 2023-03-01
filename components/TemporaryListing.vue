<template>
    <v-container>
      <Breadcrumbs :location="location" :back-more="back_more" :back="back"/>
      <ListingProfile :listing="listing"/>
    </v-container>
</template>
<script>
export default {
  props: {
    listing: {
      type: Object,
      default: () => null
    },
    nextpage: {
      type: String,
      default: () => ''
    },
    prevpage: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      tel: 'tel://',
      http: 'http://',
      https: 'https://',
      location: this.listing.location,
      back:
          '/states/' +
          this.listing.location.slugStateName +
          '/city/' +
          this.listing.location.slugCityName,
        back_more: '/states/' +this.listing.location.slugStateName,
        x: this.listing.location.slugStateName
    }
  },
  head() {
    const listing = this.listing
    let photo = null
    if (listing.photos !== null) {
      const newPhoto = this.listing.photos
      if (this.hasItems(newPhoto)) {
        photo = this.listing.photos[0].fileName
      }
    } else {
      photo = ''
    }
    const description =
      this.hasItems(listing.treatmentPhilosophy) === true
        ? this.listing.treatmentPhilosophy[0].description +
          ' | TopRatedRehabs.com'
        : 'TopRatedRehabs.com'
    const name = this.listing.name + ' | TopRatedRehabs.com'
    if (listing) {
      return {
        title:
          listing.name +
          ' Rehab in ' +
          listing.address.city +
          ', ' +
          listing.address.region +
          ' | TopRatedRehabs.com',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content:
              this.currentLocation +
              '. Find a local listing for rehabs to treat addiction near you. ' +
              listing.treatmentPhilosophy
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
            content: 'Photo of ' + name
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
    hasItems(item) {
      if (item !== null && item !== undefined) {
        if (item.length > 0) {
          return true
        }
      }
      return false
    },
    sortWeight(object) {
      if( object.weight===undefined || object.weight === null){
        return object
      }
      else {
        return object.pressMediaLinks.sort((a,b)=> a.weight < b.weight ? 1 : -1);
      }
    },
  }
}
</script>
