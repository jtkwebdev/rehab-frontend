<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.displayName"
      :counter="15"
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
      v-model="confirmPassword"
      :rules="passwordRules"
      label="confirm password"
      type="password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="register"
    >Submit</v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >Reset Form</v-btn>
  </v-form>
</template>
<script>
  export default {
    data: () => ({
      valid: true,
      error: null,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
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
          password:""
      },
      confirmPassword: ""
    }),

    methods: {
      async register() {
        this.$refs.form.validate() 
      try {
        await this.$axios.post('/api/register', {
          display_name: this.user.displayName,
          email: this.user.email,
          password: this.user.password
        }).then((res)=>{
          console.log(res)
        })

        await this.$auth.loginWith('local', {
          data: {
            email: this.user.email,
            password: this.user.password
          }
        })
        console.log(this.$auth.loggedIn)
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
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