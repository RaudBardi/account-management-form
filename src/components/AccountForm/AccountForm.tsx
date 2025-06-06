import {defineComponent} from 'vue';
import AccountLabelsInput from './AccountLabelsInput';
import AccountTypeSelect from './AccountTypeSelect';
import AccountLoginInput from './AccountLoginInput';
import AccountPasswordInput from './AccountPasswordInput';
import Button from 'primevue/button';

export default defineComponent({
    name: 'AccountForm',
    props: {
        account: {
            type: Object as () => {
                id: string
                labels: Array<{ text: string }>
                type: 'LDAP' | 'Локальная'
                login: string
                password: string | null
            },
            required: true,
        },
    },

    emits: ['update:account', 'remove:account'],

    setup(props, {emit}) {
        const updateField = <K extends keyof typeof props.account>(field: K, value: typeof props.account[K]) => {
            emit('update:account', {...props.account, [field]: value});
        }

        return () => (
            <div class="account-grid">
                <div class="grid-item">
                    <AccountLabelsInput
                        modelValue={props.account.labels}
                        onUpdate:modelValue={val => updateField('labels', val)}
                        id={props.account.id}
                    />
                </div>

                <div class="grid-item">
                    <AccountTypeSelect
                        modelValue={props.account.type}
                        onUpdate:modelValue={val => updateField('type', val)}
                        id={props.account.id}
                    />
                </div>

                <div class={`grid-item ${props.account.type === 'LDAP' ? 'span-2' : ''}`}>
                    <AccountLoginInput
                        modelValue={props.account.login}
                        onUpdate:modelValue={val => updateField('login', val)}
                        id={props.account.id}
                    />
                </div>

                {
                    props.account.type === 'Локальная' &&
                    (
                        <div class="grid-item">
                            <AccountPasswordInput
                                modelValue={props.account.password || ''}
                                onUpdate:modelValue={val => updateField('password', val)}
                                id={props.account.id}
                            />
                        </div>

                    )
                }

                <div class="action-cell mb-4">
                    <Button
                        icon="pi pi-trash"
                        severity="danger"
                        outlined
                        onClick={() => emit('remove:account')}
                    />
                </div>
            </div>
        )
    },
})
