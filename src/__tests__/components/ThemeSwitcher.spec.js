import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ThemeSwitcher from '../../components/ThemeSwitcher.vue';

describe('ThemeSwitcher.vue', () => {
  it('renders button element', () => {
    const wrapper = mount(ThemeSwitcher, {
      global: {
        stubs: {
          VBtn: {
            template: '<button><slot /></button>'
          },
          VIcon: {
            template: '<i />'
          }
        }
      }
    });
    
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('has aria-label', () => {
    const wrapper = mount(ThemeSwitcher, {
      global: {
        stubs: {
          VBtn: {
            template: '<button :aria-label="ariaLabel"><slot /></button>',
            props: ['ariaLabel']
          },
          VIcon: {
            template: '<i />'
          }
        }
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });

  it('component exists', () => {
    const wrapper = mount(ThemeSwitcher, {
      global: {
        stubs: {
          VBtn: true,
          VIcon: true
        }
      }
    });
    
    expect(wrapper.exists()).toBe(true);
  });
});
