<template>
    <v-layout
            align-center
            justify-center
            wrap
        >
        <v-flex xs12>
            <v-list>
                <template v-for="(item, key) in lc">
                    <v-list-item
                            v-if="item.lyrics !== undefined"
                            @click="getLyric(item)"
                            :key="item.title"
                            two-line
                        >
                        <v-list-item-content
                            >
                            <v-list-item-title
                                v-text="item.title"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-flex
                        v-else
                        tag="h3"
                        class="grey darken-4"
                        v-text="item.title"
                        :key="'k' + key"
                    ></v-flex>
                    <v-divider :key="key"></v-divider>
                </template>
            </v-list>
        </v-flex>
        <lyric-component></lyric-component>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            lc: LYRICS
        }
    },
    methods: {
        /** Send lyric data to <lyric-component> using Event Bus */
        getLyric(item) {
            if (item.lyrics !== undefined)
                EventBus.$emit('lyric', item)
        }
    }
}
</script>