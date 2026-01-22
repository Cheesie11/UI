import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import RegisterView from '../../views/RegisterView.vue';

const createMockRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/register', component: RegisterView },
      { path: '/login', component: { template: '<div>Login</div>' } },
    ],
  });
};

describe('RegisterView.vue', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = createMockRouter();

    vi.mock('../../api/auth', () => ({
      register: vi.fn().mockResolvedValue({ data: { id: 1, name: 'New User' } }),
    }));

    wrapper = mount(RegisterView, {
      global: {
        plugins: [router],
        stubs: {
          VCard: {
            template: '<div class="v-card"><slot /></div>'
          },
          VForm: {
            template: '<form @submit.prevent="$emit(\'submit.prevent\')"><slot /></form>'
          },
          VTextField: {
            template: '<input :placeholder="label" @input="$emit(\'update:model-value\', $event.target.value)" />'
          },
          VBtn: {
            template: '<button type="submit"><slot /></button>'
          },
          VAlert: {
            template: '<div class="v-alert"><slot /></div>'
          },
          RouterLink: {
            template: '<a><slot /></a>'
          }
        },
      },
    });
  });

  it('renders register form', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('component mounts successfully', () => {
    expect(wrapper.vm).toBeDefined();
  });

  it('has form inputs', () => {
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('has submit button', () => {
    const button = wrapper.find('button[type="submit"]');
    expect(button.exists()).toBe(true);
  });

  it('shows login link', () => {
    const links = wrapper.findAll('a');
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});
