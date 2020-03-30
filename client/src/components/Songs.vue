<template>
  <v-container>
    <v-layout column>
      <v-flex xs6>
        <panel title="Canciones">
          <v-btn
            to="/songs/create"
            class="blue accent-3; mt-6"
            slot="action"
            dark
            absolute
            right
            small
            middle
            fab
          >
            <v-icon>add</v-icon>
          </v-btn>
          <div v-for="song in songs" :key="song.song_id">
            <v-layout class="songs-container">
              <v-flex xs6>
                <div class="song-title">{{song.title}}</div>
                <div class="song-artist">{{song.artist}}</div>
                <div class="song-genre">{{song.genre}}</div>
                <v-btn
                  class="deep-purple lighten-1; mt-3"
                  style="color: white"
                  :to="`songs/${song.song_id}`"
                >Ver</v-btn>
              </v-flex>
              <v-flex xs6>
                <div>
                  <img style="height: 200px" :src="song.album_image" />
                </div>
                <div class="song-genre">{{song.album}}</div>
              </v-flex>
            </v-layout>
          </div>
        </panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SongsService from "../services/SongsService";
import Panel from "../components/Panel";
export default {
  components: {
    Panel
  },
  data() {
    return {
      songs: []
    };
  },
  async mounted() {
    try {
      this.songs = (await SongsService.index()).data;
      console.log(this.songs[0]);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

.songs-container {
  margin-top: 20px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}
</style>