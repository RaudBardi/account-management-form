import {defineComponent} from 'vue';
import {useField} from 'vee-validate';
import {string} from 'yup';
import Password from 'primevue/password'

export default defineComponent({
    name: 'AccountPasswordInput',
    props: {
        modelValue: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        }
    },

    emits: ['update:modelValue'],

    setup(props, {emit}) {
        const {value, errorMessage} = useField<string>(
            `password-${props.id}`,
            string()
                .required('Пароль обязателен')
                .max(100, 'Максимальная длина пароля 100 символов'),
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
                <div class="flex flex-column">
                    <Password
                        inputId={`password-${props.id}`}
                        modelValue={value.value}
                        onInput={handleChange}
                        onBlur={handleChange}
                        toggleMask
                        feedback={false}
                        inputClass="w-full"
                        class={errorMessage.value ? 'p-invalid' : 'mb-4'}
                    />
                </div>
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
