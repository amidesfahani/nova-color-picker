<template>
    <panel-item :field="field">
        <template slot="value">
            <div class="inline-flex items-center">
                <div class="inline-block rounded border border-primary-30% mr-3 w-8 h-8" :style="{'background-color': color}"></div>
                <span class="text-sm">{{ field.value }}</span>
            </div>
        </template>
    </panel-item>
</template>

<script>
export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],
    computed: {
        color() {
            var rgb = this.toRGB(this.field.value)
            return this.rgbToHex(rgb[0], rgb[1], rgb[2])
        }
    },
    methods: {
        toRGB(string) {
            return string.replace(/[^\d,]/g, '').split(',')
        },
        componentToHex(c) {
            c = parseInt(c)
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        },
        rgbToHex(r, g, b) {
            return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        }
    }
}
</script>
