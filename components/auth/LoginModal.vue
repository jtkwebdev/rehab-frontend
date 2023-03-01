<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <span v-if="!$auth.loggedIn">
            <v-btn
              color="primary"
              dark
              icon
              v-bind="attrs"
              v-on="on"
            >
            <v-icon>mdi-account</v-icon>Login
            </v-btn>
        </span>
        <span v-else>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{$auth.user.display_name}}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item href="/profile">
                  Profile
              </v-list-item>
              <v-list-item @click="logout">
                  LogOut
              </v-list-item>
            </v-list>
          </v-menu>
        </span>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  type="email"
                  :rules="emailRules"
                  required
                  v-model="user.email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="user.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small><a  href="/register">Register</a></small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v=> !!v || 'password is required',
      ],
      name: "",
      user: {
        email: "",
        password: "",
        displayName: "",
      }
    }),
    methods: {
        async login() {
          this.dialog=false;
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: this.user.email,
                password: this.user.password
              }
            })
          } catch (e) {
            this.error = e.response.data.message
          }
        },
        async logout(){
          await this.$auth.logout('local')
        }
    }
  }
</script>