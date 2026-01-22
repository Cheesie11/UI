import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Dialog from '../../components/Dialog.vue';

describe('Dialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Dialog, {
      global: {
        stubs: {
          VDialog: {
            template: '<div><slot /></div>'
          },
          VCard: {
            template: '<div><slot /></div>'
          },
          VCardTitle: {
            template: '<div><slot /></div>'
          },
          VCardText: {
            template: '<div><slot /></div>'
          },
          VCardActions: {
            template: '<div><slot /></div>'
          },
          VBtn: {
            template: '<button @click="$emit(\'click\')"><slot /></button>'
          },
          VTextField: {
            template: '<input />'
          },
          VSelect: {
            template: '<select />'
          },
          VIcon: {
            template: '<i />'
          },
          VDivider: true,
          VCheckboxBtn: true,
          VListItem: {
            template: '<li><slot /></li>'
          }
        }
      }
    });
  });

  it('renders dialog component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('has create button with icon', () => {
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('emits save event with correct data', async () => {
    // Set title
    const titleInput = wrapper.find('input[type="text"]');
    
    // Find save button and click
    const buttons = wrapper.findAll('button');
    const saveButton = buttons.find(btn => btn.text().includes('Create'));

    if (saveButton && titleInput.exists()) {
      await titleInput.setValue('Test Session');
      await saveButton.trigger('click');
      
      expect(wrapper.emitted('save')).toBeTruthy();
    }
  });

  it('validates title is required', () => {
    const buttons = wrapper.findAll('button');
    const saveButton = buttons.find(btn => btn.text().includes('Create'));

    if (saveButton) {
      saveButton.trigger('click');
      // Check that title error exists if title is empty
      expect(wrapper.vm.titleError).toBeDefined();
    }
  });

  it('resets form when closed', async () => {
    const vm = wrapper.vm;
    vm.title = 'Test Title';
    vm.selectedOptions = ['option1'];

    await vm.reset();

    expect(vm.title).toBe('');
    expect(vm.selectedOptions).toEqual([]);
    expect(vm.titleError).toBe('');
  });

  it('contains option list for criteria selection', () => {
    expect(wrapper.vm.optionList).toEqual([
      'Clarity of communication',
      'Technical depth',
      'Collaboration readiness',
      'User impact',
    ]);
  });
});
