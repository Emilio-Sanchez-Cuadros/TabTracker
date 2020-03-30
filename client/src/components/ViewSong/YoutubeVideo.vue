<template>
  <panel title="Video">
    <youtube 
    :video-id="videoId"
    :player-height=243
    :player-width=400
    ></youtube>
  </panel>
</template>

<script>
import Panel from "../../components/Panel";

export default {
  props: ["video-id"],
  components: {
    Panel
  }
};
</script>

<style scoped>

</style>