import { configure, defineRule } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import {
    required,
    max,
    min,
    email,
    min_value as minValue,
    max_value as maxValue,
    confirmed,
    regex
} from '@vee-validate/rules'

export default function useAccountManagement() {
    // Регистрируем только необходимые правила
    defineRule('required', required)
    defineRule('max', max)
    defineRule('min', min)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('confirmed', confirmed)
    defineRule('regex', regex)

    // Настраиваем локализацию
    configure({
        generateMessage: localize('ru', {
            messages: {
                required: 'Поле обязательно для заполнения',
                max: 'Максимальная длина {length} символов',
                min: 'Минимальная длина {length} символов',
                email: 'Введите корректный email',
                min_value: 'Значение должно быть не менее {min}',
                max_value: 'Значение должно быть не более {max}',
                confirmed: 'Пароли не совпадают',
                regex: 'Некорректный формат'
            },
        }),
    })
}
