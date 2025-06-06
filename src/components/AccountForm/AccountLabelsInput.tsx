import { defineComponent } from 'vue';
import { useField } from 'vee-validate';
import { string } from 'yup';
import InputText from "primevue/inputtext";

export default defineComponent({
    name: 'AccountLabelsInput',
    props: {
        modelValue: {
            type: Array as () => Array<{ text: string }>,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const { value, errorMessage } = useField<string>(
            `labels-${props.id}`,
            string().max(50, 'Максимальная длина метки 50 символов'),
            {
                initialValue: props.modelValue.map(label => label.text).join(';'),
            }
        )

        const handleChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            const labels = target.value
                .split(';')
                .filter(text => text.trim())
                .map(text => ({ text: text.trim() }));
            emit('update:modelValue', labels);
        }

        return () => (
            <div class="flex flex-column gap-2">
                <InputText
                    id={`labels-${props.id}`}
                    modelValue={value.value}
                    onInput={handleChange}
                    onBlur={handleChange}
                    placeholder="Введите метки через ;"
                    class={errorMessage.value ? 'p-invalid' : 'mb-4'}
                />
                {
                    errorMessage.value &&
                    (
                        <small class="p-error">{errorMessage.value}</small>
                    )
                }
            </div>
        )
    },
})
