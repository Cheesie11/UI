import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import LoginView from '../../views/LoginView.vue';

const createMockRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/login', component: LoginView },
      { path: '/register', component: { template: '<div>Register</div>' } },
    ],
  });
};

describe('LoginView.vue', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = createMockRouter();

    // Mock the auth API
    vi.mock('../../api/auth', () => ({
      login: vi.fn().mockResolvedValue({ data: { id: 1, name: 'Test User' } }),
    }));

    wrapper = mount(LoginView, {
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
        mocks: {
          $t: (key) => key,
        },
      },
    });
  });

  it('renders login form', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders welcome header', () => {
    const text = wrapper.text();
    expect(text).toContain('Welcome back');
  });

  it('has first name and last name input fields', () => {
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBeGreaterThanOrEqual(2);
  });

  it('shows register link', () => {
    const registerLink = wrapper.find('a');
    expect(registerLink.exists()).toBe(true);
  });

  it('has submit button', () => {
    const button = wrapper.find('button[type="submit"]');
    expect(button.exists()).toBe(true);
  });

  it('initializes with empty credentials', () => {
    expect(wrapper.vm.credentials.firstname).toBe('');
    expect(wrapper.vm.credentials.lastname).toBe('');
  });

  it('has loading state', () => {
    expect(wrapper.vm.loading).toBe(false);
  });

  it('initializes with empty banner', () => {
    expect(wrapper.vm.banner).toBe('');
  });

  it('requires first name', () => {
    const rule = wrapper.vm.rules.required;
    expect(rule('')).toBe('Required');
    expect(rule('Test')).toBe(true);
  });

  it('requires last name', () => {
    const rule = wrapper.vm.rules.required;
    expect(rule('')).toBe('Required');
    expect(rule('User')).toBe(true);
  });
});
