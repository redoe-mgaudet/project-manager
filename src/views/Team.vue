<template>
  <div class="team">
    <h1 class="subtitle-1">Team</h1>

    <v-container class="my-10">
      <v-row>
        <v-col
          col="12"
          sm="6"
          md="4"
          lg="3"
          v-for="person in team"
          :key="person.name"
        >
          <v-card flat class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-1">
                <img :src="person.avatar" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subtitle-1">{{ person.name }}</div>
              <div>{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn depressed text color="grey">
                <v-icon small left>mdi-message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { name: "Mitchell Gaudet", role: "IT Co-op", avatar: "/avatar-1.png" },
        { name: "Yoshi", role: "Web Developer", avatar: "/avatar-2.png" },
        {
          name: "Mario",
          role: "Systems Administrator",
          avatar: "/avatar-3.png"
        },
        { name: "Luigi", role: "Graphic Designer", avatar: "/avatar-4.png" },
        { name: "Toad", role: "Data Administrator", avatar: "/avatar-5.png" }
      ]
    };
  }
};
</script>
