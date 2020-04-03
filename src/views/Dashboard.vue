<template>
  <div class="dashboard">
    <h1 class="subtitle-1">Dashboard</h1>

    <v-container class="my-10">
      <v-row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small depressed @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">By Project Name</span>
            </v-btn>
          </template>
          <span>Sort By Project Name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small depressed @click="sortBy('person')" v-on="on">
              <v-icon left small>mdi-face</v-icon>
              <span right class="caption text-lowercase">By Agent</span>
            </v-btn>
          </template>
          <span>Sort By Agent</span>
        </v-tooltip>
      </v-row>
      <v-card flat v-for="project in projects" :key="project.title">
        <v-row :class="`pa-3 project ${project.status}`">
          <v-col cols="12" md="6">
            <div class="caption">Project Title</div>
            <div>{{ project.title }}</div>
          </v-col>
          <v-col xs="6" sm="4" md="2">
            <div class="caption">Agent</div>
            <div>{{ project.person }}</div>
          </v-col>
          <v-col xs="6" sm="4" md="2">
            <div class="caption">Due By</div>
            <div>{{ project.due }}</div>
          </v-col>
          <v-col xs="2" sm="4" md="2">
            <div class="right">
              <v-chip
                :color="`${project.status}`"
                class="v-chip--active white--text caption my-2"
                >{{ project.status }}</v-chip
              >
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "../fb";

export default {
  data() {
    return {
      projects: []
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(changes => {
        if (changes.type === "added") {
          this.projects.push({
            ...changes.doc.data(),
            id: changes.doc.id
          });
        }
      });
    });
  }
};
</script>

<style>
.project.Completed {
  border-left: 4px solid #43a047;
}
.project.Ongoing {
  border-left: 4px solid orange;
}
.project.Overdue {
  border-left: 4px solid tomato;
}
.v-chip.Completed {
  background: #43a047;
}
.v-chip.Ongoing {
  background: orange;
}
.v-chip.Overdue {
  background: tomato;
}
</style>
