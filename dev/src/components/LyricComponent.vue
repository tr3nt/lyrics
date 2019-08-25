<template>
    <v-row justify="center">
        <v-dialog
                v-model="dialog"
                transition="dialog-bottom-transition"
                fullscreen hide-overlay
            >
            <v-card class="grey darken-4">
                <v-toolbar
                        color="grey darken-3"
                        dark
                    >
                    <v-toolbar-title v-text="title"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                            @click="close"
                            fab dark
                        >
                        X
                    </v-btn>
                </v-toolbar>
                <v-card-text style="padding-top:85px">
                    <v-flex
                        tag="p"
                        @click="close"
                        class="columnas"
                        v-html="lyric"
                    ></v-flex>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            title:  '',
            lyric:  ''
        }
    },
    methods: {
        /** Clean all data */
        close() {
            this.dialog = false;
            this.title  = '';
            this.lyric  = '';
        }
    },
    mounted() {
        /** Get lyric data using Event Bus */
        EventBus.$on('lyric', lyric => {
            this.dialog = true;
            this.title  = lyric.title;
            this.lyric  = lyric.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');
        })
    }
}
</script>