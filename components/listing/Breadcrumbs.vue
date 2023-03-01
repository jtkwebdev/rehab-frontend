<template>
  <div id="breadcrumbs">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: {
    back: {
      type: String,
      default: () => null
    },
    backMore: {
      type: String,
      default: () => null
    },
    location: {
      type: Object,
      default: () => null
    }
  },
  data(){
    return {
      items: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: this.location.stateName,
          disabled: false,
          href: this.backMore,
        },
        {
          text: this.location.cityName,
          disabled: false,
          href: this.back,
        },
      ],
    }
  },
}
</script>