<template>
    <div class="open-page" :style="{
    transform: `translateY(${y}px)`
    }">
        <pre class="score">I-         00  HI- 20000</pre>
        <div class="title"></div>
        <pre class="options">
1  PLAYER
2  PLAYERS
CONSTRUCTION
        </pre>
    </div>
</template>

<script>


    export default {
        name: 'open',
        data() {
            return {
                y: 448,
                isStart: false,
            }
        },
        watch: {
            isStart(val) {
                if (val) {
                    this.y = 448
                    this.move()
                }
            }
        },
        methods: {
            move() {
                requestAnimationFrame(() => {
                    if (this.y <= 0) {
                        return
                    }
                    this.y -= 2
                    this.move()
                })
            },
            start() {
                this.$store.commit('togglePage', 'stage')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .open-page {
        font-size: 22px;
        color: #ffffff;
        font-weight: bold;

        .score {
            position: absolute;
            left: 36px;
            top: 48px;
        }

        .title {
            position: absolute;
            left: 56px;
            top: 96px;
            width: 376px;
            height: 138px;
            background: url(../images/ui.png) 0 0;
        }

        .score, .options {
            font-family: "Arial Black", sans-serif;
        }

        .options {
            position: absolute;
            left: 178px;
            top: 272px;
        }
    }
</style>