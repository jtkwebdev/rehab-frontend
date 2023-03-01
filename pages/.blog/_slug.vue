<template>
  <article
    class="flex lg:h-screen w-screen lg:overflow-hidden xs:flex-col lg:flex-row"
  >
    <div class="relative lg:w-1/2 xs:w-full xs:h-84 lg:h-full post-left">
      <img
        src="https://www.beachsiderehab.com/wp-content/uploads/beachside_house_banner.jpg"
        class="absolute h-full w-full object-cover opacity-50"
      />
      <div class="overlay"></div>
      <div class="absolute top-32 left-32 text-indigo-700">
        <NuxtLink to="/"><Logo /></NuxtLink>
        <div class="mt-16 -mb-3 flex uppercase text-sm">
          <p class="mr-3">
            04/30/2021
          </p>
          <span class="mr-3">•</span>
          <p>{{ article.name }}</p>
        </div>
        <h1 class="text-6xl font-bold">{{ article.name }}</h1>
        <span v-for="(tag, id) in article.social_media" :key="id">
          <a :href="`${tag.url}`" target="_blank">
            <span
              class="truncate uppercase tracking-wider font-medium text-ss px-2 py-1 rounded-full mr-2 mb-2 border border-light-border dark:border-dark-border transition-colors duration-300 ease-linear"
            >
              {{ tag.type }}
            </span>
          </a>
        </span>
      </div>
      <div class="flex absolute top-3rem right-3rem">
        <NuxtLink
          to="/"
          class="mr-8 self-center text-white font-bold hover:underline"
        >
          All articles
        </NuxtLink>
        <a
          href="https://nuxtjs.org/blog/creating-blog-with-nuxt-content"
          class="mr-8 self-center text-white font-bold hover:underline"
        >
          Tutorial
        </a>
      </div>
    </div>
    <div
      class="relative xs:py-8 xs:px-8 lg:py-32 lg:px-16 lg:w-1/2 xs:w-full h-full overflow-y-scroll markdown-body post-right custom-scroll"
    >
      <h1 class="font-bold text-4xl">{{ article.name }}</h1>
      <p v-if="article.treatment_philosophy">{{ article.treatment_philosophy }}</p>
      <p class="pb-4">Post last updated: 04/30/2021</p>
      <p class="pb-4">This rehab is the place you to go get cured. Frontal-lobotomies and cyanide injections -- come here right now... You won't even THINK about leaving! Be cured instantaneously and, in spirit, share with your friends and family THE FINAL SOLUTION of getting clean and sober, once and for all.</p>
      <!-- table of contents -->
      <nav class="pb-6">
        <ul>
          <li
            v-for="(link, id) of article.treatment_links"
            :key="id"
            :class="{
              'font-semibold': link.depth === 2
            }"
          >
            <a
              :href="`#${link.url}`"
              target="_blank"
              class="hover:underline"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3
              }"
              >{{ link.type }}</a
            >
          </li>
        </ul>
      </nav>
      <!-- content from markdown -->
      <nuxt-content :document="article" />
      <!-- content author component -->

      <!-- prevNext component -->

    </div>
  </article>
</template>
<script>
export default {
  async asyncData({ $axios, params }) {
    const baseURL = $axios.defaults.baseURL
    const articleData = await $axios.$get(baseURL + '/api/listing/'+params.slug)
    const article = articleData.listing;
  return { article }
},
/*  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch()
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })))
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return {
      article,
      tags,
      prev,
      next
    }
  },*/
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
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
