<template>
  <v-row>
    <v-col align="center">
      <v-card outlined max-width="600">
        <v-card-title class="headline pb-8 justify-center">
          Log In to Your Account
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              type="email"
              class="pa-3"
              v-model="email"
              label="Email"
              required
              :rules="inputRules"
            ></v-text-field>
            <v-text-field
              type="password"
              class="pa-3"
              v-model="password"
              label="Password"
              required
              :rules="inputRules"
            ></v-text-field>
            <p v-if="feedback" class="red--text center">{{ feedback }}</p>
            <v-btn class="success" @click.prevent="login">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      inputRules: [
        v => (v && v.length >= 3) || "Minimum Length is 3 Characters"
      ]
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user);
            this.$router.push("/");
          })
          .catch(err => {
            this.feedback = err.message;
          });
        this.feedback = null;
      } else {
        this.feedback = "Please Fill In Both Fields!";
      }
    }
  }
};
</script>

<style></style>
