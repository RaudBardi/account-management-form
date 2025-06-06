import {defineComponent} from 'vue';
import {useAccountStore} from '@/stores/accountStore';
import type {Account} from '@/stores/accountStore';
import AccountForm from './AccountForm/AccountForm';
import Button from 'primevue/button';
import InputIcon from 'primevue/inputicon';
import Fieldset from 'primevue/fieldset';

export default defineComponent({
    name: 'AccountManagementForm',
    setup() {
        const accountStore = useAccountStore()

        const handleAddAccount = () => {
            accountStore.addAccount()
        }

        const handleUpdateAccount = (accountId: string, updates: Partial<Account>) => {
            accountStore.updateAccount(
                accountId,
                {
                    ...updates,
                    password: updates.type == 'LDAP' ? null : updates.password
                }
            );
        }

        const handleRemoveAccount = (accountId: string) => {
            accountStore.removeAccount(accountId);
        }

        return () => (
            <div>
                <div class="flex align-items-baseline mb-4 gap-4">
                    <h1 class="text-2xl font-bold">Учетные записи</h1>
                    <Button
                        icon="pi pi-plus"
                        outlined
                        onClick={handleAddAccount}
                    />
                </div>

                <div class="flex mb-4">
                    <Fieldset>
                        {{
                            legend: () => (
                                <div class="flex items-center pl-2">
                                    <InputIcon class="pi pi-question-circle" />
                                </div>
                            ),
                            default: () => (
                                <p class="m-0">
                                    Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
                                </p>
                            )
                        }}
                    </Fieldset>
                </div>

                {/* Заголовки таблицы */}
                <div class="account-grid font-bold">
                    <div class="grid-item">Метки</div>
                    <div class="grid-item">Тип записи</div>
                    <div class="grid-item">Логин</div>
                    <div class="grid-item">Пароль</div>
                    <div class="action-cell"></div>
                </div>

                {accountStore.accounts.length === 0 ? (
                    <p class="text-gray-500 mt-4">Нет учетных записей. Нажмите "+" чтобы добавить.</p>
                ) : (
                    <div>
                        {accountStore.accounts.map(account => (
                            <AccountForm
                                key={account.id}
                                account={account}
                                onUpdate:account={(updates) => handleUpdateAccount(account.id, updates)}
                                onRemove:account={() => handleRemoveAccount(account.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        )
    },
})
