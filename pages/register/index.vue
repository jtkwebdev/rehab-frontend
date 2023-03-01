<template>
    <v-container>
        User Registration
        <v-tabs v-model="tab" centered>
        <v-tab>Public User</v-tab>
        <v-tab>Rehab Owner</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item transition="scroll-y-transition">
                <RegisterPublicUser/>
            </v-tab-item>
            <v-tab-item transition="scroll-y-transition">
                <RegisterRehabOwner/>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>
<script>
export default{
    data() {
        return {
            tab: null
        }
    }
}
</script>
