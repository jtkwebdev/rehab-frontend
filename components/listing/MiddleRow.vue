<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <v-btn href="/review">Write Review</v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn href="/share">Share</v-btn>
            </v-col>
            <v-col cols="3">
                <v-btn href="/save">Save</v-btn>
            </v-col>
            <v-col cols="3">
                Last Update: "add variable"
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-card>
                    <v-card-title>Details</v-card-title>
                    <v-card-text>
                        details variable
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6">
                <v-card>
                    <v-card-text>
                        <strong>Meals and Nutrition</strong>
                        <v-rating
                            length="5"
                            :value="listing.rating.meal"
                            half-increments
                            readonly
                        ></v-rating>
                        <strong>Accommodations and Amenities</strong>
                        <v-rating
                            length="5"
                            :value="listing.rating.accommodations"
                            half-increments
                            readonly
                        ></v-rating>
                        <strong>Treatment Quality and Effectiveness</strong>
                        <v-rating
                            length="5"
                            :value="listing.rating.quality"
                            half-increments
                            readonly
                        ></v-rating>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="listing.about">
            <v-card>
                words here by author
            </v-card>
        </v-row>
        <v-row>
            <v-expansion-panels>
                <v-expansion-panel>
                    <v-expansion-panel-header>Log-in</v-expansion-panel-header>
                    <v-expantion-panel-content>
                        LOGINCOMPONENT
                    </v-expantion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props: {
        listing: {
        type: Object,
        default: () => null
        }
    }
}
</script>