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
                            v-if="timer"
                            @click="scroll(time)"
                            fab dark
                        >
                        Start
                    </v-btn>
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
                        class="lyric"
                        :columns="time === 0"
                        v-html="lyric"
                    ></v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            @click="returnTop"
                            class="grey darken-2"
                            fab dark
                        >
                        UP
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            title: '',
            time:  0,
            lyric: '',
            timer: false
        }
    },
    methods: {
        /** Automatic scroll for timed Lyrics */
        scroll(time) {
            let wh = $(window).height(),
                dh = $('.v-card').height(),
                hh = (dh - wh);
            this.timer = false;
            $('.v-dialog').animate({
                scrollTop: hh
            }, time, 'linear');
        },
        /** Return to top */
        returnTop() {
            $('.v-dialog')
                .finish()
                .animate({
                    scrollTop: 0
                }, 2000, 'linear');
            if (this.time > 0)
                this.timer = true
        },
        /** Transform minutes to milliseconds */
        setTime(val) {
            let num = val.split(':'),
                set = 0;
            if (this.isNumber(num[0]) && this.isNumber(num[1])) {
                set = (((parseInt(num[0]) * 60) + parseInt(num[1])) * 1000) + 5000;
                this.timer = true;
            }
            return set;
        },
        /** Clean all data */
        close() {
            this.dialog = false;
            this.returnTop();
            this.time   = 0;
            this.title  = '';
            this.lyric  = '';
            this.timer  = false;
        },
        /** Util */
        isNumber(val) {
            return val !== null && val !== undefined && !isNaN(val) && parseInt(val) >= 0
        }
    },
    mounted() {
        /** Get lyric data using Event Bus */
        EventBus.$on('lyric', lyric => {
            this.dialog = true;
            this.title  = lyric.title;
            this.lyric  = lyric.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');
            if (lyric.time !== undefined)
                this.time = this.setTime(lyric.time)
        })
    }
}
</script>