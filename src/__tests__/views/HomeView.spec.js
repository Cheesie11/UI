import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import HomeView from '../../views/HomeView.vue';

const createMockRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/sessions', component: { template: '<div>Sessions</div>' } },
    ],
  });
};

describe('HomeView.vue', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = createMockRouter();

    wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        stubs: {
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-card': { template: '<div class="v-card"><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          RouterLink: { template: '<a><slot /></a>' },
        },
      },
    });
  });

  it('renders home view', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('component mounts successfully', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
