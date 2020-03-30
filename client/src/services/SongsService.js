import Api from './Api'

export default {
    index () {
        return Api().get('songs')
    },
    submit (song) {
        return Api().post('songs/create', song)
    },
    listSong (song_id) {
        return Api().get(`songs/${song_id}`)
    }
}



