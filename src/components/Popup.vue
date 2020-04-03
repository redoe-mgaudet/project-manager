<template>
  <v-dialog max-width="600px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn depressed v-on="on" class="success">Add a New Project</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-row>
            <v-col align="center">
              <v-text-field
                label="Title"
                v-model="title"
                prepend-icon="mdi-folder"
                :rules="inputRules"
              ></v-text-field>
              <v-textarea
                label="Information"
                v-model="content"
                prepend-icon="subject"
                :rules="inputRules"
              ></v-textarea>

              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    label="Due Date"
                    prepend-icon="date_range"
                    v-on="on"
                    :value="formattedDate"
                    readonly
                    :rules="inputRules"
                  >
                  </v-text-field>
                </template>
                <v-date-picker v-model="due"></v-date-picker>
              </v-menu>

              <v-btn
                depressed
                class="success mx-0 mt-3"
                @click="submit"
                :loading="loading"
                >Add Project</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import db from "../fb";

export default {
  data() {
    return {
      title: "",
      content: "",
      due: null,
      inputRules: [
        v => (v && v.length >= 3) || "Minimum Length is 3 Characters"
      ],
      loading: false,
      dialog: false
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;

        const project = {
          title: this.title,
          content: this.content,
          due: format(parseISO(this.due), "do MMM yyyy"),
          person: "Mitchell",
          status: "Ongoing"
        };

        db.collection("projects")
          .add(project)
          .then(() => {
            this.loading = false;
            this.dialog = false;
            this.$emit("projectAdded");
            this.$refs.form.reset();
          });
      }
    }
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    }
  }
};
</script>
