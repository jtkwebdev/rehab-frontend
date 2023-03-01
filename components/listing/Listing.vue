<template>
  <article
    class="flex -mt-10 lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
    id="listing"
  >
    <div class="relative lg:w-1/4 xs:w-full xs:h-84 lg:h-full post-left">
      <div v-if="listing.hasDefaultPhoto">
        <img
          v-if="hasItems(listing.photos) && listing.photos !== undefined"
          :src="`${
            listing.photos !== undefined
              ? listing.photos[0].fileName
              : require(`~/assets/rehab-center.png`)
          }`"
          class="absolute h-full w-full object-cover opacity-25"
        />
      </div>
      <div class="overlay"></div>
      <div class="absolute top-32 left-32 text-black">
        <div class="mt-16 -mb-3 flex uppercase text-sm">
          <p class="mr-3">
            {{ listing.address.streetAddress }},
            {{ listing.address.city }}
            {{ listing.location.stateName }},
            {{ listing.address.zipCode }}
          </p>
        </div>
        <h1
          class="lg:text-4xl md:text-3xl sm:text-2xl mt-4 font-bold leading-tight text-center text-black"
        >
          {{ listing.name }}
        </h1>
        <p
          class="mt-4 text-xs text-gray-800 underline -mt-2 font-semibold text-base uppercase font-bold text-base"
        >
          <small
            ><a :href="`mailto:business@sovrinmind.com`" target="_blank"
              >Claim This Listing</a
            ></small
          >
        </p>
        <div
          class="font-hairline leading-5 ease-out text-black font-bold text-xl mt-4"
        >
          <p>{{ listing.address.streetAddress }}</p>
          <p>
            {{ listing.address.region }},
            {{ listing.address.zipCode }}
          </p>
        </div>
        <div
          class="flex post-left lg:w-full md:w-full sm:w-full xs:w-full xs:py-8 xs:px-1 md:px-3 lg:py-8 lg:px-1 lg:text-base"
        >
          <ul
            class="grid lg:grid-cols-3 px-2 md:grid-cols-6 sm:grid-cols-5 xs:grid-cols-5 divide-x divide-green-500"
          >
            <div v-if="listing.phone !== null">
              <li
                v-for="(number, id) in listing.phone"
                :key="id"
                class="inline px-45 py-2"
              >
                <a
                  v-if="number !== null && number.description !== 'Tracking'"
                  class="bg-yellow-100"
                  :href="`${tel}${number.telLink}`"
                  target="_blank"
                >
                  <span
                    class="truncate uppercase tracking-wider font-medium px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear text-sm md:text-sm lg:text-sm xs:text-xs"
                  >
                    Call Now
                  </span>
                </a>
              </li>
            </div>
            <li
              v-for="(tag, id) in listing.socialMedia"
              :key="id"
              class="inline px-45 py-2 bg-yellow-100"
            >
              <a class="" :href="`${tag.url}`" target="_blank">
                <span
                  class="truncate uppercase tracking-wider font-medium px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear text-sm md:text-sm lg:text-sm xs:text-xs"
                >
                  {{ tag.type }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex absolute text-left top-3rem right-3rem">
        <NuxtLink
          to="/"
          class="mr-8 text-xl self-center font-bold hover:underline uppercase"
        >
          All listings
        </NuxtLink>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-2/3 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
    THIS IS WHERE THE RIGHT COL STARTS
      <div class="flex w-full bg-blue-200">
        <div
          class="w-full bg-white rounded shadow-lg p-8 m-4 w-full md:mx-auto"
        >
          <h1 class="font-bold text-5xl mb-5">{{ listing.name }}</h1>
          <ul v-if="listing.treatmentPhilosophy">
            <li v-for="(tp, id) in listing.treatmentPhilosophy" :key="id">
              <p class="text-2xl">{{ tp.description }}</p>
            </li>
          </ul>
          <p class="pb-4">Post last updated: 04/30/2021</p>
          <div
            class="mt-8 -mb-3 flex uppercase text-2xl text-center content-center"
          >
            <div>
              <p class="mr-3">
                <strong class="bold underline">Location:</strong>
                {{ listing.address.streetAddress }}, <br />
                {{ listing.address.city }}
                {{ listing.location.stateName }},
                {{ listing.address.zipCode }}
              </p>
            </div>
            <div class="justify-center text-center content-center">
              <ul v-if="listing.phone">
                <li v-for="(number, id) in listing.phone" :key="id">
                  <button
                    class="text-gray-800 text-4xl font-semibold bg-blue-300 p-4 ml-5 hover:bg-blue-400"
                    :href="`${tel}${number.telLink}`"
                  >
                    Call Now
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div class="bg-gray-100">
        <h1
          class="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800"
        >
          Photos
        </h1>
        <Carousel :photos="listing.photos" />
      </div>
      <AddReview />
      <ul v-if="listing.ratings">
        <li v-if="listing.ratings.accommodationsAmenities">
          {{ listing.ratings.accommodationsAmenities.display }}
          {{ listing.ratings.accommodationsAmenities.count }}
          {{ listing.ratings.accommodationsAmenities.value }}
        </li>
        <li v-if="listing.ratings.treatmentEffectiveness">
          {{ listing.ratings.treatmentEffectiveness.display }}
          {{ listing.ratings.treatmentEffectiveness.count }}
          {{ listing.ratings.treatmentEffectiveness.value }}
        </li>
        <li v-if="listing.ratings.mealsNutrition">
          {{ listing.ratings.mealsNutrition.display }}
          {{ listing.ratings.mealsNutrition.count }}
          {{ listing.ratings.mealsNutrition.value }}
        </li>
        <li v-if="listing.ratings.overall">
          {{ listing.ratings.overall.display }}
          {{ listing.ratings.overall.count }}
          {{ listing.ratings.overall.value }}
        </li>
        <li v-if="listing.ratings.publishedReviewsCount">
          {{ listing.ratings.publishedReviewsCount }}
        </li>
      </ul>
      <ul v-if="listing.environmentalSetting">
        <li v-for="(setting, id) in listing.environmentalSetting" :key="id">
          {{ setting }}
        </li>
      </ul>
      <h2 v-if="listing.highlights">Highlights</h2>
      <ul v-if="listing.highlights">
        <li v-for="(highlight, id) in listing.highlights" :key="id">
          {{ highlight.title }}
        </li>
      </ul>
      <h2 v-if="listing.specializations">Specializations</h2>
      <ul>
        <li v-for="(spec, id) in listing.specializations" :key="id">
          <h3>{{ spec.title }}</h3>
          <p>{{ spec.description }}</p>
        </li>
      </ul>
      <div v-if="listing.staff">
        <ul>
          <li v-for="(person, id) in sortWeight(listing.staff)" :key="id">
            <p>
              <strong>{{ person.name }}</strong>
            </p>
            <p>{{ person.title }}</p>
            <p>{{ person.bio }}</p>
            <p>{{ person.weight }}</p>
            <p><img :src="person.fileName" /></p>
          </li>
        </ul>
      </div>
      <div v-if="listing.editorialReview">
        <ul>
          <li v-for="(editorial, id) in listing.editorialReview" :key="id">
            Editorial: {{ editorial.editorial }} Author: {{ editorial.author }}
            {{ editorial.assignedAt }}
            {{ editorial.publishedAt }}
            {{ editorial.status }}
            <ul v-if="editorial.attachments">
              <li v-in="attachment in editorial.attachments">
                <a :href="attachment"> {{ attachment }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-if="listing.popularity">
        <p class="font-semibold text-gray-900">
          Popularity: {{ listing.popularity }}
        </p>
      </div>
      <div v-if="listing.reviews">
        <ul>
          <li v-for="(review, id) in listing.reviews" :key="id">
            <p>{{ review.text }}</p>
            <p>{{ review.author }}</p>
            <ul v-if="review.ratings">
              <li>
                Treatment Effectiveness:
                {{ review.ratings.treatmentEffectiveness }}
              </li>
              <li>
                Accomodations &amp; Amenities:
                {{ review.ratings.accommodationsAmenities }}
              </li>
              <li>
                Meals &amp; Nutrition: {{ review.ratings.mealsNutrition }}
              </li>
            </ul>
            <ul v-if="review.status">
              <li>Display: {{ review.status.display }}</li>
              <li>Name: {{ review.status.name }}</li>
              <li>Type: {{ review.status.review }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-if="listing.testimonials">
        <ul>
          <li v-for="(testimony, id) in listing.testimonials" :key="id">
            {{ testimony.text }}
            {{ testimony.author }}
          </li>
        </ul>
      </div>
      <div v-if="listing.insuranceAccepted">
        <ul>
          <li v-for="(insurer, id) in listing.insuranceAccepted" :key="id">
            {{ insurer }}
          </li>
        </ul>
      </div>
      <div v-if="listing.service">
        <ul>
          <li v-for="(service_name, id) in listing.service" :key="id">
            {{ service_name }}
          </li>
        </ul>
      </div>
      <div v-if="listing.genderRestrictions">
        <ul>
          <li v-for="(restriction, id) in listing.genderRestrictions" :key="id">
            {{ restriction }}
          </li>
        </ul>
      </div>
      <div v-if="listing.programTypes">
        <ul>
          <li v-for="(type, id) in listing.programTypes" :key="id">
            {{ type }}
          </li>
        </ul>
      </div>
      <div v-if="listing.financingAvailable">
        <strong>Financing Available: </strong>
        {{ listing.financingAvailable }}
        <ul v-if="listing.financing">
          <li v-for="(finance, id) in listing.financing" :key="id">
            {{ finance }}
          </li>
        </ul>
      </div>
      <div v-if="listing.showPricingToCustomer">
        <ul v-if="listing.pricing">
          <li v-for="(price, id) in listing.pricing" :key="id">
            <p>${{ price.pricing }} / {{ price.days }} {{ price.displayAs }}</p>
            <p>Description: {{ price.description }}</p>
          </li>
        </ul>
      </div>
      <div v-if="listing.ageRangeSpecializations">
        <strong>Age Range Specializations</strong>
        <ul>
          <li v-for="(age, id) in listing.ageRangeSpecializations" :key="id">
            {{ age }}
          </li>
        </ul>
      </div>
      <div v-if="listing.programTypes">
        <ul>
          <li v-for="(type, id) in listing.programTypes" :key="id">
            {{ type }}
          </li>
        </ul>
      </div>
      <div v-if="listing.treatmentTypes">
        <ul>
          <li v-for="(type, id) in listing.treatmentTypes" :key="id">
            {{ type }}
          </li>
        </ul>
      </div>
      <div v-if="listing.category">
        <ul>
          <li v-for="(c, id) in listing.category" :key="id">{{ c }}</li>
        </ul>
      </div>
      <div v-if="listing.pressMediaLinks">
        <ul>
          <li
            v-for="(link, id) of sortWeight(listing.pressMediaLinks)"
            :key="id"
            :class="{
              'font-semibold': link.depth === 2
            }"
          >
            <a
              :href="`${link.url}`"
              class="hover:underline"
              target="_blank"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
              >{{ link.anchor }}</a
            >
          </li>
        </ul>
      </div>
      <div v-if="listing.timeZone">Timezone: {{ listing.timeZone }}</div>

      <!-- table of contents -->
      <nav class="pb-6">
        <ul>
          <li
            v-for="(link, id) of listing.treatmentLinks"
            :key="id"
            :class="{
              'font-semibold': link.depth === 2
            }"
          >
            <a
              :href="`${link.url}`"
              class="hover:underline"
              target="_blank"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
              >{{ link.type }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </article>
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
      https: 'https://'
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
<style class="postcss">
.listing-card {
  border-radius: 8px;
}
.listing-card a {
  background-color: #fff;
  border-radius: 8px;
}
.listing-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
