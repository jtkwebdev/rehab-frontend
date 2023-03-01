<template>
  <div
    v-on-clickaway="closeMenu"
    class="relative inline-block text-left text-gray-800"
  >
    <div>
      <span class="rounded-md shadow-sm">
        <button
          id="options-menu"
          type="button"
          class="inline-flex items-center justify-between w-full rounded-md border border-gray-300 h-10 px-4 py-4 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-800 transition ease-in-out duration-150 btn-focus"
          aria-haspopup="true"
          aria-expanded="true"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span> {{ label }} </span>
          <img
            src="https://s.svgbox.net/hero-solid.svg?ic=chevron-down&fill=grey-800"
            class="-mr-1 ml-2 h-5 w-5"
          />
        </button>
      </span>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isMenuOpen"
        class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg text-sm overflow-hidden border z-20"
      >
        <div
          class="rounded-md bg-white shadow-xs"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div>
            <div class="bg-gray-100 p-4 flex items-center">
              <div class="w-full">
                <p class="font-semibold text-base">Rate Your Experience</p>
                <strong
                  class="flex items-center justify-between w-full focus:outline-none"
                >
                  <p class="text-gray-600">How great was the service?</p>
                </strong>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="py-1">
            <button
              v-for="rate in ratings"
              :key="rate.rank"
              class="p-4 flex items-center space-x-2 w-11/12"
              @click.prevent="setValue(rate)"
            >
              <span> {{ rate.description }} </span>
            </button>
          </div>
          <div class="border-t border-gray-100"></div>
          <div class="py-1">
            <strong
              class="p-4 flex items-center space-x-2"
              @click="closeMenu"
              @click.native="isMenuOpen = false"
            >
              <img
                src="https://s2.svgbox.net/loaders.svg?ic=circles"
                class="h-6 w-6"
              />
              <span> Cancel </span>
            </strong>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  props: {
    ratingType: {
      type: Object,
      default: () => null
    },
    value: {
      type: Object,
      default: () => null
    }
  },
  data() {
    const ratings = [
      {
        rank: 5,
        description: '(5/5) Amazing'
      },
      {
        rank: 4,
        description: '(4/5) Great'
      },
      {
        rank: 3,
        description: '(3/5) Average'
      },
      {
        rank: 2,
        description: '(2/5) Bad'
      },
      {
        rank: 1,
        description: '(1/5) Terrible'
      }
    ]
    return {
      isMenuOpen: false,
      rating: null,
      ratings
    }
  },
  computed: {
    label() {
      return this.rating ? this.rating.description : 'Select Rating'
    }
  },
  methods: {
    closeMenu() {
      this.isMenuOpen = false
    },
    setValue(val) {
      this.isMenuOpen = false
      this.rating = val
      this.$emit('input', val.rank)
    }
  }
}
</script>
