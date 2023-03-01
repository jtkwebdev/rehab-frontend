<template>
  <v-app>
    <v-app-bar
        absolute
        app
    ><!-- for original image :src="`${require(`~/assets/img/happy-group-of-people.jpeg`)}`" -->
      <v-app-bar-title><a href="/">TopRatedRehabs</a></v-app-bar-title>
      <v-spacer></v-spacer>
      <LoginModal/>
      <template v-slot:extension>
          <v-tabs align-with-title>
              <v-tab>States</v-tab>
              <v-tab>Claim Listing</v-tab>
              <v-tab href="/reviews">Write Review</v-tab>
              <v-tab>Advertise</v-tab>
          </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app absolute>
        {{ new Date().getFullYear() }} — <strong>TopRatedRehabs.com</strong>
        - <a href="/"> Home </a> - <a href="/about">  About </a>
    </v-footer>
  </v-app>
</template>