import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeSwitcher from '../../components/ThemeSwitcher.vue';

// Mock vuetify
vi.mock('vuetify', () => ({
  useTheme: () => ({
    global: {
      current: {
        value: {
          dark: false
        }
      },
      name: {
        value: 'light'
      }
    }
  })
}));

describe('ThemeSwitcher.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ThemeSwitcher, {
      global: {
        stubs: {
          VBtn: true,
          VIcon: true
        }
      }
    });
  });

  it('renders button element', () => {
    expect(wrapper.find('v-btn-stub').exists()).toBe(true);
  });

  it('has toggle theme aria-label', () => {
    const button = wrapper.find('v-btn-stub');
    expect(button.attributes('aria-label')).toBe('Toggle theme');
  });

  it('renders correctly with light theme', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('v-icon-stub').exists()).toBe(true);
  });
});
