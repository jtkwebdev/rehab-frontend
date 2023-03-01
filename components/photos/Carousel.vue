<template>
  <div>
    <div class="flex flex-col bg-gray-100 m-auto p-auto">
      <div class="flex overflow-x-scroll pb-10 hide-scroll-bar">
        <div class="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
          <Modal
            v-if="onDisplay !== null"
            :photo="photos[onDisplay]"
            @close="killPop"
          />
          <div
            v-for="(photo, id) in photos"
            :key="id"
            class="inline-block px-3"
            @click="showPop(id)"
          >
            <div
              class="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <img :src="photo.fileName" :alt="photo.altText" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Photos/Modal'
export default {
  components: { Modal },
  props: {
    photos: {
      type: Array,
      default: () => null
    }
  },
  data() {
    return {
      onDisplay: null
    }
  },
  methods: {
    showPop(id) {
      this.onDisplay = id
    },
    killPop() {
      this.onDisplay = null
    }
  }
}
</script>

<style scoped>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}
</style>
