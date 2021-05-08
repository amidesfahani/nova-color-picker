<template>
    <default-field :field="field" :errors="errors" class="relative">
        <template slot="field">
            <div class="picker-container flex items-center" v-on-clickaway="closePicker">
                <input
                    :id="field.name"
                    type="text"
                    class="w-full form-control form-input form-input-bordered ltr"
                    :class="errorClasses"
                    :placeholder="field.name"
                    v-model="value"
                />
                <a href="javascript:://" class="mx-1 px-2 py-1 rounded-full bg-white hover:bg-purple-600 focus:bg-purple-600 text-gray-800 hover:text-gray-100 focus:text-gray-100" @click.prevent="showPicker = !showPicker">
                    <svg class="w-6 h-6 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
                </a>
                <div class="ltr">
                    <sketch-picker v-if="showPicker" :value="value" v-model="colors" @input="updateValue" />
                </div>
            </div>
        </template>
    </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'
import { mixin as clickaway } from 'vue-clickaway';
import SketchPicker from 'vue-color/src/components/Sketch'

export default {
    components: {SketchPicker},
    mixins: [FormField, HandlesValidationErrors, clickaway],
    props: ['resourceName', 'resourceId', 'field'],
    data() {
        return {
            colors: '',
            showPicker: false
        }
    },
    methods: {
        updateValue (value) {
            this.value = value.hex
            // this.value = `rgb(${value.rgba.r},${value.rgba.g},${value.rgba.b})`;
        },
        toRGB(string) {
            return string.replace(/[^\d,]/g, '').split(',')
        },
        setColor(color) {
            if (/^#[0-9A-F]{6}$/i.test(color))
            {
                return this.colors = {
                    hex: color
                }
            }
            color = this.toRGB(color)
            return this.colors = {
                rgba: {
                    r: color[0],
                    g: color[1],
                    b: color[2],
                    a: 1
                }
            }
        },
        closePicker() {
            this.showPicker = false
        },

        /**
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.field.value || ''
            this.setColor(this.value)
        },

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value
        },
    },
    directives: {
        'click-outside': {
            priority: 700,
            bind () {
                let self  = this
                this.event = function (event) { 
                    console.log('emitting event')
                    self.vm.$emit(self.expression,event) 
                }
                this.el.addEventListener('click', this.stopProp)
                document.body.addEventListener('click',this.event)
            },
            
            unbind() {
                console.log('unbind')
                this.el.removeEventListener('click', this.stopProp)
                document.body.removeEventListener('click',this.event)
            },
            stopProp(event) {event.stopPropagation() }
        }
    }
}
</script>
