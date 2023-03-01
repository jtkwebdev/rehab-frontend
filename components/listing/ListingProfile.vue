<template>
    <v-card>
        <v-card-title>{{listing.name}}</v-card-title>
        <v-row>
            <v-col cols="4">
                <v-card-text>
                        <v-rating
                            :value="(listing.quality/20)"
                            color="yellow"
                            half-increments
                            readonly
                        ></v-rating>
                        <ul>{{Math.round(listing.quality)}} / 100
                            <a href="/reviews">Add Rating</a>
                        </ul>
                </v-card-text>
                <v-card-text>
                        {{ listing.address.streetAddress }}<br>
                        {{ listing.address.city }},
                        {{ listing.location.stateName }}
                        {{ listing.address.zipCode }}
                        <div v-if="listing.timeZone">Timezone: {{ listing.timeZone }}</div>
                </v-card-text>
                <v-card-actions v-if="listing.phone">
                    <v-btn>
                        <v-icon>mdi-phone</v-icon>
                    </v-btn>
                    <v-btn
                        v-for="(tag,i) in listing.socialMedia"
                        :key="i"
                        :href="`${tag.url}`"
                        >
                        {{tag.type}}
                    </v-btn>
                </v-card-actions>
                <v-card-text>
                     <ul v-if="listing.treatmentPhilosophy">
                        <li v-for="(tp, id) in listing.treatmentPhilosophy" :key="id">
                            <v-textarea readonly rows="10" :value="tp.description"></v-textarea>
                        </li>
                    </ul>
                </v-card-text>
            </v-col>
            <v-col cols="8">
                <v-card-text>
                <v-carousel v-if="hasItems(listing.photos) && listing.photos !== undefined">
                    <v-carousel-item
                        v-for="(photo, i) in listing.photos"
                        :key="i"
                        :src="photo.fileName"
                    ></v-carousel-item>
                </v-carousel>
                </v-card-text>
            </v-col>
        </v-row>
        <v-row v-if="listing.ratings">
            <v-col v-if="listing.ratings.accommodationsAmenities">
                Accomidations and Amenities
                <v-rating
                    half-increments
                    length="5"
                    readonly
                    :value="listing.ratings.accommodationsAmenities"
                ></v-rating>
            </v-col>
            <v-col v-if="listing.ratings.treatmentEffectiveness">
                Treatmeant and Effectiveness
                <v-rating
                    half-increments
                    length="5"
                    readonly
                    :value="listing.ratings.treatmentEffectiveness.value"
                ></v-rating>
            </v-col>
            <v-col v-if="listing.ratings.mealsNutrition">
                Meals and Nutrition
                <v-rating
                    half-increments
                    length="5"
                    readonly
                    :value="listing.ratings.mealsNutrition.value"
                ></v-rating>
            </v-col>
            <v-col v-if="listing.ratings.overall">
                Overall
                <v-rating
                    half-increments
                    readonly
                    length="5"
                    :value="listing.ratings.overall.value"
                ></v-rating>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    props: {
        listing: {
        type: Object,
        default: () => null
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
<style scoped>
#philosophy{
    text-overflow: ellipsis;
}
</style>