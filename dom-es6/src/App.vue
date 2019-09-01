<template>
    <div id="app" @click>
        <div class="game-screen">
            <openPage v-show="uiState === 'open'"></openPage>
        </div>
        <ul class="command">
            <li class="left"></li>
            <li class="right"></li>
            <li class="up"></li>
            <li class="down"></li>
        </ul>
    </div>
</template>

<script>
    import openPage from './pages/open.vue'
    import {mapState} from 'vuex'

    export default {
        name: 'app',
        components: {
            openPage,
        },
        computed: {
            ...mapState(['uiState'])
        },
        methods: {
            enter() {

            }
        }
    }
</script>

<style lang="scss">
    @import "./scss/reset.scss";
    @import "./scss/helper.scss";

    html, body {
        background-color: #666600;
    }

    #app {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .game-screen {
        position: absolute;
        overflow: hidden;
        width: 512px;
        height: 448px;
        left: 50%;
        margin-left: -256px;
        top: 50%;
        margin-top: -224px;
        border: #630 double 4px;
        background: #000;
    }
</style>
