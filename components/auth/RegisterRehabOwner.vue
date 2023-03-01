<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.accountId"
      :counter="20"
      :rules="nameRules"
      label="Account Number"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.displayName"
      :rules="nameRules"
      label="Display Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      :rules="passwordRules"
      label="password"
      type="password"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.confirmPassword"
      :rules="passwordRules"
      label="confirm password"
      type="password"
      required
    ></v-text-field>
    <v-btn
      color="success"
      class="mr-4"
      @click="submitRegistration"
    >
      Submit
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules:[],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
      user: {
          displayName:"",
          email:"",
          password:"",
          confirmPassword:"",
      }
    }),

    methods: {
      submitRegistration () {
        this.$refs.form.validate()
        //this.post or whatever
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>