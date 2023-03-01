<template>

  <div class="m-8">
    <h1 class="font-bold text-4xl">
      Rehab Listings in
      {{
        currentLocation !== '' ? currentLocation : listings[0].loc
      }}
    </h1>
    <ul class="flex flex-wrap">
      <li
        v-for="listing of listings"
        :key="listing.domainSlugs.rehabs"
        class="xs:w-full md:w-1/2 px-2 xs:mb-6 md:mb-12 listing-card shadow"
      >
        <NuxtLink
          :to="{
            name: 'browse-slug',
            params: { slug: listing.domainSlugs.rehabs }
          }"
          class="flex transition-shadow duration-150 ease-in-out shadow-sm hover:shadow-md xxlmax:flex-col"
        >
          <img
            class="h-48 xxlmin:w-1/2 xxlmax:w-full object-cover"
            :src="`${
              listing.photos !== undefined && listing.photos[0] !== undefined
                ? listing.photos[0].fileName
                : require(`~/assets/rehab-center.png`)
            }`"
          />
          <div
            class="p-6 flex flex-col justify-between xxlmin:w-1/2 xxlmax:w-full"
          >
            <h2 class="font-bold">{{ listing.name }}</h2>
            <p>{{ listing.address.streetAddress }}</p>
            <p class="font-bold text-gray-600 text-sm">
              {{ listing.address.city }}, {{ listing.address.region }}
              {{ listing.address.zipCode }}
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div class="text-center font-extrabold underline mb-4 text-xl">
      <NuxtLink
        v-if="prevpage && parseInt(prevpage.split('/').pop()) > 0"
        :to="prevpage"
      >
        Prevs Page
      </NuxtLink>
      <NuxtLink v-if="nextpage" class="m-2" :to="nextpage">
        Next Page
      </NuxtLink>
    </div>
    <div class="text-center font-extrabold mb-4 text-xl">
      <p class="mt-4">
        Want to claim a listing or advertise? Send us an

        <a
          href="mailto:joseph@sovrinmind.com"
          target="_blank"
          class="font-bold hover:underline underline hover:extrabold"
          >email</a
        >
        and we will get back to you soon!
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    listings: {
      type: Array,
      default: () => null
    },
    cities: {
      type: Array,
      default: () => null
    },
    pagination: {
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
    },
    currentLocation: {
      type: String,
      default: () => ''
    }
  },
  methods: {
    hasItems(item) {
      if (item !== null && item !== undefined) {
        if (item.length > 0) {
          return true
        }
      }
      return false
    }
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
