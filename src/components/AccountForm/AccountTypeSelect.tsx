import { defineComponent } from 'vue';
import Select from 'primevue/select';

export default defineComponent({
    name: 'AccountTypeSelect',
    props: {
        modelValue: {
            type: String as () => 'LDAP' | 'Локальная',
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },

    emits: ['update:modelValue'],

    setup(props, {emit}) {
        const types = ['LDAP', 'Локальная']

        return () => (
            <div class="flex flex-column">
                <Select
                    {
                        ...{
                            modelValue: props.modelValue,
                            'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
                            options: types,
                            placeholder: "Выберите тип",
                            class: 'mb-4',
                            inputId: `type-${props.id}`,
                        }
                    }
                />
            </div>
        )
    },
})
