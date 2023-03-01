<template>
    <v-expansion-panels>
        <v-expansion-panel v-if="listing.specializations">
            <v-expansion-panel-header>
                Specializations
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(specialization, i) in listing.specializations"
                    :key="i"
                >
                    <v-card>
                        <v-card-title>{{specialization.title}}</v-card-title>
                        <v-card-text>{{specialization.description}}</v-card-text>
                    </v-card>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.environmentalSetting">
            <v-expansion-panel-header>
                 Environmental Setting
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-card>
                    <div
                        v-for="(environmental, i) in listing.environmentalSetting"
                        :key="i"
                    >{{environmental}}</div>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.highlights">
            <v-expansion-panel-header>
                HighLights
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-card>
                    <ul>
                    <li
                        v-for="(hl, i) in listing.highlights"
                        :key="i">{{hl.title}}</li></ul>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.staff">
            <v-expansion-panel-header>Staff</v-expansion-panel-header>
            <v-expansion-panel-content v-for="(person,i) in sortWeight(listing.staff)" :key="i">
                <v-card>
                    <v-card-title><v-avatar><img :src="person.fileName"/></v-avatar>{{person.name}}</v-card-title>
                    <v-card-text>{{person.title}}</v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.editorialReview">
            <v-expansion-panel-header>editorialReview</v-expansion-panel-header>
            <v-expansion-panel-content v-for="(editorial,i) in listing.editorialReview" :key="i">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Author: {{editorial.author}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p><span v-html="editorial.editorial"></span></p>
                            <p>{{editorial.assignedAt}}</p><p>{{editorial.publishedAt}}</p><p>{{editorial.status}}</p>
                            <ul v-if="editorial.attachments">
                                <li v-in="attachment in editorial.attachments">
                                    <a :href="attachment"> {{ attachment }}</a>
                                </li>
                            </ul>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.popularity" disabled>
            <v-expansion-panel-header>Popularity: {{listing.popularity}}</v-expansion-panel-header>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.insuranceAccepted">
            <v-expansion-panel-header>Accpeted Insurance</v-expansion-panel-header>
            <v-expansion-panel-content><span v-for="(insurer, i) in listing.insuranceAccepted" :key="i">{{insurer}}, </span></v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.service">
            <v-expansion-panel-header>Service</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(serv,i) in listing.service"
                    :key="i"
                >
                    {{serv}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.genderRestrictions">
            <v-expansion-panel-header>genderRestrictions</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(gr,i) in listing.genderRestrictions"
                    :key="i"
                >
                    {{gr}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.programTypes">
            <v-expansion-panel-header>programTypes</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(pt,i) in listing.programTypes"
                    :key="i"
                >
                    {{pt}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.financingAvailable">
            <v-expansion-panel-header>financingAvailable</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(fa,i) in listing.financingAvailable"
                    :key="i"
                >
                    {{fa}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.pressMediaLinks">
            <v-expansion-panel-header>MediaLinks</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(link, id) of sortWeight(listing.pressMediaLinks)"
                    :key="id"
                    :class="{
                        'font-semibold': link.depth === 2
                        }"
                >
                    <a
                    :href="`${link.url}`"
                    class="hover:underline"
                    target="_blank"
                    :class="{
                        'py-2': link.depth === 2,
                        'ml-2 pb-2': link.depth === 3
                    }"
                    >{{ link.anchor }}</a>
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.showPricingToCustomer">
            <span v-if="listing.pricing">
                <v-expansion-panel-header>pricing</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div
                        v-for="(price,i) in listing.pricing"
                        :key="i"
                    >
                        {{price}}
                    </div>
                </v-expansion-panel-content>
            </span>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.ageRangeSpecializations">
            <v-expansion-panel-header>ageRangeSpecializations</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(age,i) in listing.ageRangeSpecializations"
                    :key="i"
                >
                    {{age}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.category">
            <v-expansion-panel-header>category</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(cat,i) in listing.category"
                    :key="i"
                >
                    {{cat}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.programTypes">
            <v-expansion-panel-header>programTypes</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(types,i) in listing.programTypes"
                    :key="i"
                >
                    {{types}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel v-if="listing.treatmentTypes">
            <v-expansion-panel-header>treatmentTypes</v-expansion-panel-header>
            <v-expansion-panel-content>
                <div
                    v-for="(treatments,i) in listing.treatmentTypes"
                    :key="i"
                    
                >
                    {{treatments}}
                </div>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="listing.treatmentLinks">
            <v-expansion-panel-header>treatmentLinks</v-expansion-panel-header>
            <v-expansion-panel-content>
                <li
                    v-for="(link, id) of sortWeight(listing.treatmentLinks)"
                    :key="id"
                    :class="{
                    'font-semibold': link.depth === 2
                    }"
                >
                    <a
                    :href="`${link.url}`"
                    class="hover:underline"
                    target="_blank"
                    :class="{
                        'py-2': link.depth === 2,
                        'ml-2 pb-2': link.depth === 3
                    }"
                    >{{ link.anchor }}</a>
                </li>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>
<script>
export default({
    props: {
        listing: {
            type: Object
        }
    },
    methods: {
        sortWeight(object) {
        if( object.weight===undefined || object.weight === null){
            return object
        }
        else {
            return object.pressMediaLinks.sort((a,b)=> a.weight < b.weight ? 1 : -1);
        }
        },
    }
})
</script>