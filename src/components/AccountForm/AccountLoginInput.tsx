import { defineComponent } from 'vue';
import { useField } from 'vee-validate';
import { string } from 'yup';
import InputText from 'primevue/inputtext';

export default defineComponent({
    name: 'AccountLoginInput',
    props: {
        modelValue: {
            type: String,
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
            `login-${props.id}`,
            string()
                .required('Логин обязателен')
                .max(100, 'Максимальная длина логина 100 символов'),
            {
                initialValue: props.modelValue,
            }
        )

        const handleChange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            emit('update:modelValue', target.value);
        }

        return () => (
            <div class="flex flex-column gap-2">
                <InputText
                    id={`login-${props.id}`}
                    modelValue={value.value}
                    onInput={handleChange}
                    onBlur={handleChange}
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
