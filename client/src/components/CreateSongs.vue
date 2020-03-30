<template>
  <v-container fluid>
    <v-layout align-top justify-center>
      <v-flex xs4>
        <panel title="Crear canción">
          <v-text-field label="Título" :rules="[required]" v-model="song.title"></v-text-field>
          <v-text-field label="Grupo" :rules="[required]" v-model="song.artist"></v-text-field>
          <v-text-field label="Álbum" :rules="[required]" v-model="song.album"></v-text-field>
          <v-text-field label="Imagen del álbum" :rules="[required]" v-model="song.album_image"></v-text-field>
          <v-text-field label="ID de youtube" :rules="[required]" v-model="song.youtube_id"></v-text-field>
          <v-text-field label="Género" :rules="[required]" v-model="song.genre"></v-text-field>
        </panel>
      </v-flex>
      <v-flex xs8>
        <panel title="Tablatura y letra" class="ml-4">
          <v-textarea
            label="Tab"
            :rules="[required]"
            multiline
            v-model="song.tab"
            @input="insertTab"
          ></v-textarea>
          <v-textarea
            label="Letra"
            :rules="[required]"
            multi-line
            v-model="song.lyrics"
            @input="insertLyrics"
          ></v-textarea>
        </panel>
        <div style="color: red" v-if="error">{{error}}</div>
        <v-btn
          class="deep-purple lighten-1; mt-4"
          style="color: white"
          @click="submit"
        >Crear canción</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Panel from "../components/Panel";
import SongsService from "../services/SongsService";
export default {
  data() {
    return {
      song: {
        title: null,
        artist: null,
        album: null,
        album_image: null,
        youtube_id: null,
        lyrics: null,
        tab: null,
        genre: null
      },
      error: null,
      required: value => !!value || "Requerido"
    };
  },
  components: {
    Panel
  },
  methods: {
    async submit() {
      this.error = null;
      const areAllFieldsFilledIn = Object.keys(this.song).every(
        key => !!this.song[key]
      );
      if (!areAllFieldsFilledIn) {
        this.error = "Por favor, rellena todos los campos requeridos.";
        return;
      }
      try {
        await SongsService.submit(this.song);
        this.$router.push({
          path: "/songs"
        });
      } catch (err) {
        console.log(err);
      }
    }
  },
  mutations: {
    insertTab(state, tab) {
      state.song.tab = tab;
    },
    insertLyrics(state, lyrics) {
      state.song.lyrics = lyrics;
    }
  },
  computed: {
    tab: {
      get() {
        return this.$store.data.song.tab
        // return this.$store.data.song.tab.replace("'", "'");
      },
      set(value) {
        this.$store.commit("insertTab", value);
      }
    },
    lyrics: {
      get() {
        return this.$store.data.song.lyrics
        // return this.$store.data.song.lyrics.replace("'", "'");
      },
      set(value) {
        this.$store.commit("insertLyrics", value);
      }
    }
  }
};
</script>

<style>
</style>
