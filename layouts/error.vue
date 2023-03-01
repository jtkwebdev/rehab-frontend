<template>
  <div>
    <div class="m-8 text-center align-center">
      <h1 v-if="error.statusCode === 404" class="text-4xl">Page not found</h1>
      <h1 v-if="error.statusCode > 500" class="text-4xl">Internal Error</h1>
      <h1 v-else class="text-4xl">An error occurred</h1>
      <NuxtLink class="text-4xl underline font-bold" to="/"
        >Browse Rehabs</NuxtLink
      >
    </div>
  </div>
</template>
<script>
export default {
  layout: 'blog',
  props: {
    error: {
      type: Object,
      default: () => null
    }
  },
  head: {
    title: 'Search Drug Rehabs / Detoxes By State | ' + 'Rehabs Now',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Find a local listing for rehabs to treat addiction near you. ' +
          process.env.npm_package_description
      }
    ]
  }
}
</script>

<style class="postcss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.article-card a {
  background-color: #fff;
  border-radius: 8px;
}
.article-card img div {
  border-radius: 8px 0 0 8px;
}
</style>
