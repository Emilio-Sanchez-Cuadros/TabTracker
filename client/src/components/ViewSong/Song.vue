<template>
  <v-container fluid>
    <v-container fluid>
      <v-layout>
        <v-flex xs6>
          <song-metadata :song="song" />
        </v-flex>
        <v-flex xs6>
          <youtube-video class="ml-5" :videoId="song.youtube_id" />
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <v-layout>
        <v-flex xs6>
          <panel v-if="song.tab" class="panel; mb-5" title="Tab">
            <textarea>{{song.tab}}</textarea>
          </panel>
          <panel v-else class="panelNoContent mb-5" title="Tab">
            <div class="textareaNoContent">No disponible</div>
          </panel>
        </v-flex>
        <v-flex xs6>
          <panel v-if="song.lyrics" class="panel; ml-5" title="Letra">
            <textarea>{{song.lyrics}}</textarea>
          </panel>
          <panel v-else class="panelNoContent mb-5" title="Letra">
            <div class="textareaNoContent">No disponible</div>
          </panel>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import SongsService from "../../services/SongsService";
import SongMetadata from "./SongMetadata";
import YoutubeVideo from "./YoutubeVideo";
import Panel from "../../components/Panel";
export default {
  components: {
    Panel,
    SongMetadata,
    YoutubeVideo
  },
  data() {
    return {
      song: {}
    };
  },
  async mounted() {
    try {
      const song_id = this.$route.params.song_id;
      this.song = (await SongsService.listSong(song_id)).data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.song-container {
  margin-top: 20px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.panel {
  height: 600px;
}

textarea {
  height: 520px;
  border: none;
  border-style: none;
  font-size: 12px;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
  width: 100%;
}

.textareaNoContent {
  height: auto;
  border: none;
  border-style: none;
  border-color: transparent;
  overflow: auto;
  padding: 40px;
  width: 100%;
}

.panelNoContent {
  height: 200px;
}
</style>