<template>
        <panel :title="`${song.title}`">
          <div>
            <v-layout class="song-container">
              <v-flex xs6>
                <div class="song-artist">{{song.artist}}</div>
                <div class="song-genre">{{song.genre}}</div>
              </v-flex>
              <v-flex xs6>
                <div v-if="song.album_image">
                  <img style="height: 200px" :src="song.album_image" />
                </div>
                <div v-else="!song.album_image || undefined || null">
                  <img style="height: 200px" src="https://pbs.twimg.com/profile_images/905183271046193153/q_P1KBUJ_400x400.jpg" />
                </div>
                <div class="song-genre">{{song.album}}</div>
              </v-flex>
            </v-layout>
          </div>
        </panel>
</template>

<script>
import SongsService from "../../services/SongsService";
import Panel from "../../components/Panel";
export default {
  props: 
    [ 'song'
    ],
  components: {
    Panel
  }
};
</script>

<style scoped>
.song-container {
  margin-top: 20px;
  overflow: hidden;
}

.song-artist {
  font-size: 24px;
}

</style>