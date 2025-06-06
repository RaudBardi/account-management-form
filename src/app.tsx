import { defineComponent } from 'vue';
import AccountManagementForm from './components/AccountManagementForm';
import '@/assets/styles.css';

export default defineComponent({
    name: 'App',
    setup() {
        return () => (
            <div class="container mx-auto p-4 max-w-4xl">
                <AccountManagementForm />
            </div>
        );
    },
});
