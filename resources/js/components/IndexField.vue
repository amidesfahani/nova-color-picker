<template>
    <div class="inline-flex items-center">
        <div v-if="isValidColor(field.value)" class="inline-block rounded-full border border-primary-30% mr-3 w-3 h-3" :style="{'background-color': color}"></div>
        <span class="text-sm">{{ field.value }}</span>
    </div>
</template>

<script>
export default {
    props: ['resourceName', 'field'],
    computed: {
        color() {
            if (/^#[0-9A-F]{6}$/i.test(this.field.value))
            {
                return this.field.value
            }
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
        },
        isValidColor(color) {
            return (/^(#)((?:[A-Fa-f0-9]{3}){1,2})$/.test(color) || /^(rgb|hsl)(a?)[(]\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*,\s*([\d.]+\s*%?)\s*(?:,\s*([\d.]+)\s*)?[)]$/.test(color))
        }
    }
}
</script>
