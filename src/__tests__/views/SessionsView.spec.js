import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import SessionsView from '../../views/SessionsView.vue';

const createMockRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/sessions', component: SessionsView },
      { path: '/sessions/:id', component: { template: '<div>Session Detail</div>' } },
    ],
  });
};

describe('SessionsView.vue', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = createMockRouter();

    wrapper = mount(SessionsView, {
      global: {
        plugins: [router],
        stubs: {
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-card': { template: '<div class="v-card"><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          Dialog: { template: '<div>Dialog</div>' },
          RouterLink: { template: '<a><slot /></a>' },
          'router-link': { template: '<a><slot /></a>' },
        },
      },
    });
  });

  it('renders sessions view', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('component mounts successfully', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
