<template>
  <div class="projects">
    <h1 class="subtitle-1">Projects</h1>

    <v-container class="my-10">
      <v-expansion-panels>
        <v-expansion-panel v-for="project in myProjects" :key="project.title">
          <v-expansion-panel-header>{{
            project.title
          }}</v-expansion-panel-header>
          <v-expansion-panel-content class="px-4">
            <div class="font-weight-bold">Due By: {{ project.due }}</div>
            <div>{{ project.content }}</div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import db from "../fb";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      projects: []
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        let user = firebase.auth().currentUser;
        return project.person === user;
      });
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
