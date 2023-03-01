<template>
<v-container>
    <v-card>
        <v-card-title v-if="$auth.loggedIn">{{ $auth.user.display_name }}</v-card-title>
        <v-card-title v-else>Must be logged in to leave a Review: <LoginModal/></v-card-title>
        <v-card-actions>
        <v-row v-if="listingId">
            <v-col cols="4">
                Accomidations and Amenities
                <v-rating
                    v-model="review.rating.amenities"
                    length="5"
                    small
                ></v-rating>
            </v-col>
            <v-col cols="4">
                Treatmeant and Effectiveness
                <v-rating
                    v-model="review.rating.effectiveness"
                    length="5"
                    small
                ></v-rating>
            </v-col>
            <v-col cols="4">
                Meals and Nutrition
                <v-rating
                    length="5"
                    v-model="review.rating.meals"
                    small
                ></v-rating>
            </v-col>
            
        </v-row>
        </v-card-actions>
        <v-row  v-if="listingId">
            <v-col>
                <v-text-field label="Title" v-model="review.description"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-textarea
                    outlined
                    auto-grow
                    label="Your Review"
                    rows="3"
                    value="words"
                    v-model="review.text"
                ></v-textarea>
                <v-btn
                    @click="addReview"
                    :disabled="!$auth.loggedIn"
                    >submit</v-btn>
            </v-col>
        </v-row>
    </v-card>
</v-container>
</template>
<script>
export default {
    props: {
        listingId:{
            type: Number
        },
        reviewId: {
            type: Number
        }
    },
    data: () => ({
        review: {
            rating: {
                amenities: 0,
                effectiveness: 0,
                meals: 0,
            },
            author_email: '',
            author: '',
            text: '',
            description: ''
        }
    }),
    methods: {
        async addReview() {
            if(this.$auth.loggedIn){
                if(this.listingId){
                     await this.$axios.post('/api/listings/'+this.listingId+'/reviews', {
                        author_email: this.$auth.user.email,
                        author: this.$auth.user.display_name,
                        text: this.review.text,
                        listingId: this.listingId,
                        description: this.review.description,
                        ratings: {
                            treatment_effectiveness: this.review.rating.effectiveness,
                            accomidations_amenities: this.review.rating.amenities,
                            meals_nutrition: this.review.rating.meals
                        }
                    }).then((res)=>{console.log('review posted',res)})
                }
                else{
                     await this.$axios.post('/api/reviews/'+this.reviewId+'/comments', {
                        email: this.$auth.user.email,
                        author: this.$auth.user.display_name,
                        text: this.review.text,
                        listingId: this.listingId
    
                    }).then((res)=>{console.log('review posted',res)})
                }
            }
        }
    }
}
</script>
