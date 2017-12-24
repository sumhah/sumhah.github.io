<template>
    <div id="app">
        <div class="GameScreen">
            <canvas width="512" height="448" ref="canvas">A drawing of something.</canvas>
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
    /* eslint-disable */
    export default {
        name: 'app',
        mounted() {
            const app = new App(this.$refs.canvas);
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }

    html, body {
        padding: 0;
        margin: 0;
        background-color: #666600;
    }

    img {
        border: 0;
    }

    a {
        outline: none;
    }

    #drawing {
        background-color: #666;
    }

    .GameScreen {
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
