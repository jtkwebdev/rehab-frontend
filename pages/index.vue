<template>
  <div class="m-8">
    <DisplayStates :states="states" :autoCompleteItems="autoCompleteItems"/>
    <ListingCard
      :listings="listings"
      :states="states"
      :nextpage="next_page"
      :prevpage="prev_page"
    />
  </div>
</template>
<script>
import fs from 'fs'
import Listing from '@/components/ListingClass'

export default {
  middleware({ $gtm }) {
    $gtm.push({ site: 'index' })
  },
  async asyncData({ $axios }) {
    const baseURL = $axios.defaults.baseURL
    const url = baseURL + '/api/states'
    return await $axios.$get(url).then((res) => {

      const Listings = []
      let i
      for (i = 0; i < res.listings.length; i++) {
        fs.writeFile("data.txt", JSON.stringify(res.listings[i]), function(err){
          if(err){console.log(err)}
        })

        Listings.push(new Listing(res.listings[i]))
      }
      return {
        listings: Listings,
        cities: res.cities,
        states: res.states,
        next_page: res.next_page !== -1 ? '/page/' + res.next_page : null,
        prev_page: res.prev_page !== -1 ? '/page/' + res.prev_page : null,
        currentLocation: 'Browse by State'
      }
    })
  },
  data() {
    return {
      page: 1,
      full_path: '',
      params: '',
      currentLocation: '',
      autoCompleteItems: []
    }
  },
  head() {
    const name =
      'Browse the best Rehabs in America. Find a local listing for rehabs to treat addiction near you.'
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
        title:
          'Drug and Alcohol Rehabs and Detoxes' + process.env.npm_package_name
      }
    }
  },
  created: function(){
    this.states.forEach(e=>this.autoCompleteItems.push({
      text: e.state_name,
      value: e.slug_state_name
    }))
   // console.log(this.autoCompleteItems)
    
  },
  methods: {
    getZips() {
      const states = this.states
      const onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index
      }
      const arc = []
      let i
      for (i = 0; i < states.length; i++) {
        arc.push(states[i].state_name)
      }
      return arc.filter(onlyUnique).join(', ')
    }
  }
}
</script>
<style class="postcss">
.article-card {
  border-radius: 8px;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
