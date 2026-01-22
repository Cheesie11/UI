import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import SessionDetailView from '../../views/SessionDetailView.vue';

const createMockRouter = () => {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/sessions/:id', component: SessionDetailView },
      { path: '/sessions', component: { template: '<div>Sessions</div>' } },
    ],
  });
};

describe('SessionDetailView.vue', () => {
  let wrapper;
  let router;

  beforeEach(() => {
    router = createMockRouter();

    wrapper = mount(SessionDetailView, {
      global: {
        plugins: [router],
        stubs: {
          'v-container': { template: '<div><slot /></div>' },
          'v-row': { template: '<div><slot /></div>' },
          'v-col': { template: '<div><slot /></div>' },
          'v-card': { template: '<div class="v-card"><slot /></div>' },
          'v-btn': { template: '<button><slot /></button>' },
          'v-list': { template: '<ul><slot /></ul>' },
          'v-list-item': { template: '<li><slot /></li>' },
          RouterLink: { template: '<a><slot /></a>' },
          'router-link': { template: '<a><slot /></a>' },
        },
      },
    });
  });

  it('renders session detail view', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('component mounts successfully', () => {
    expect(wrapper.vm).toBeDefined();
  });
});
