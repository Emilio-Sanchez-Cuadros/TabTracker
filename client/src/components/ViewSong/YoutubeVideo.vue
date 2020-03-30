<template>
  <panel title="Video de Youtube">
      {{youtubeId}}
  </panel>
</template>

<script>
import Panel from "../../components/Panel";
export default {
  props: ["youtubeId"],
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