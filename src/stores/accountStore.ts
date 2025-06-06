import { defineStore } from 'pinia'
import { ref } from 'vue'

type AccountLabel = {
    text: string
}

type Account = {
    id: string
    labels: AccountLabel[]
    type: 'LDAP' | 'Локальная'
    login: string
    password: string | null
}

export const useAccountStore = defineStore('accounts', () => {
    const accounts = ref<Account[]>([])

    function addAccount() {
        accounts.value.push({
            id: Date.now().toString(),
            labels: [],
            type: 'Локальная',
            login: '',
            password: '',
        })
    }

    function updateAccount(accountId: string, updates: Partial<Account>) {
        const index = accounts.value.findIndex(acc => acc.id === accountId)
        if (index !== -1) {
            accounts.value[index] = { ...accounts.value[index], ...updates }
        }
    }

    function removeAccount(accountId: string) {
        accounts.value = accounts.value.filter(acc => acc.id !== accountId)
    }

    return { accounts, addAccount, updateAccount, removeAccount }
}, {
    persist: true,
});

export type { Account };
