<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="6000" top>
      <span>New Project has been Added!</span>
      <v-btn text color="white" @click="snackbar = false">CLOSE</v-btn>
    </v-snackbar>

    <v-app-bar flat app>
      <v-app-bar-nav-icon
        v-if="user"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase headline">
        <span class="font-weight-light">Project</span>
        <span>Manager</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <span v-if="user">{{ user.email }}</span>

      <v-btn v-if="!user" class="ma-2" text to="/login">
        <span>Sign In</span>
      </v-btn>

      <v-btn v-if="user" class="ma-2" text @click="logout">
        <span>Sign Out</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app class="green darken-3">
      <v-container>
        <v-row>
          <v-col justify="center" align="center" class="mt-5">
            <v-avatar size="90">
              <img src="/avatar-1.png" alt="" />
            </v-avatar>
            <p v-if="user" class="white--text subtitle-1 mt-1">
              {{ user.email }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col justify="center" align="center">
            <Popup @projectAdded="snackbar = true" />
          </v-col>
        </v-row>
      </v-container>
      <v-list>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          link
        >
          <v-list-item-action>
            <v-icon class="white--text" v-text="link.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              class="white--text"
              v-text="link.text"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from "./Popup.vue";
import firebase from "firebase";
export default {
  components: { Popup },
  data() {
    return {
      user: null,
      drawer: false,
      links: [
        { icon: "mdi-view-dashboard", text: "Dashboard", route: "/" },
        { icon: "mdi-folder", text: "My Projects", route: "/projects" },
        { icon: "mdi-account", text: "Team", route: "/team" }
      ],
      snackbar: false
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
};
</script>
