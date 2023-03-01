<template>
  <v-container id="container">
    <template v-if="states">
      <v-row 
        no-gutters
        v-for="i in numberOfRows(states)"
        :key="i"
      >
        <v-col
          v-for="j in 8"
          :key="j"
          id="theCol"
        >
          <v-chip
            tile
            id="chip"
            v-if="((8*(i-1))+(j-1)) < states.length"
            :href="`/states/${states[(8*(i-1))+(j-1)].slug_state_name}`"
            >
              {{states[(8*(i-1))+(j-1)].state_name}}
          </v-chip>
        </v-col>
      </v-row>
    </template>
    <div v-if="autoCompleteItems">
      <v-autocomplete
        :items="autoCompleteItems"
        label="Search by State"
      >
      <template v-slot:item="data">
        <v-list-item v-text="data.item.text" link :to="'/states/'+data.item.value"></v-list-item>
      </template>
      </v-autocomplete>
    </div>
    <template v-if="cities">
      <v-row 
        no-gutters
        v-for="i in numberOfRows(cities)"
        :key="i"
      >
        <v-col
          v-for="j in 8"
          :key="j"
          id="theCol"
        >
          <v-chip
            tile
            id="chip"
            v-if="((8*(i-1))+(j-1)) < cities.length"
            :href="`/states/${cities[(8*(i-1))+(j-1)].slug_state_name}/city/${cities[(8*(i-1))+(j-1)].slug_city_name}`"
            >
              {{cities[(8*(i-1))+(j-1)].city_name}}
          </v-chip>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>
<script>
export default {
  props: {
    states: {
      type: Array,
      default: () => null
    },
    cities: {
      type: Array,
      default: () => null
    },
    autoCompleteItems: {
      type: Array,
      default: () => null
    }
  },
  methods: {
    numberOfRows: function(places){
      if (places)
      return Math.ceil(places.length/8)
    }
  }
}
</script>
<style scoped>
#theCol{
  text-overflow: hidden;
}
#chip{
  background-color: white;
}
</style>