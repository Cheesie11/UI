import { describe, it, expect } from 'vitest';
import { login, register } from '../../api/auth';
import {
  createSession,
  getUserSessions,
  getSession,
  updateSession,
  addCriteriaToSession,
  deleteSession,
} from '../../api/sessions';

describe('Auth API', () => {
  it('login function exists', () => {
    expect(login).toBeDefined();
    expect(typeof login).toBe('function');
  });

  it('register function exists', () => {
    expect(register).toBeDefined();
    expect(typeof register).toBe('function');
  });
});

describe('Sessions API', () => {
  it('createSession function exists', () => {
    expect(createSession).toBeDefined();
    expect(typeof createSession).toBe('function');
  });

  it('getUserSessions function exists', () => {
    expect(getUserSessions).toBeDefined();
    expect(typeof getUserSessions).toBe('function');
  });

  it('getSession function exists', () => {
    expect(getSession).toBeDefined();
    expect(typeof getSession).toBe('function');
  });

  it('updateSession function exists', () => {
    expect(updateSession).toBeDefined();
    expect(typeof updateSession).toBe('function');
  });

  it('addCriteriaToSession function exists', () => {
    expect(addCriteriaToSession).toBeDefined();
    expect(typeof addCriteriaToSession).toBe('function');
  });

  it('deleteSession function exists', () => {
    expect(deleteSession).toBeDefined();
    expect(typeof deleteSession).toBe('function');
  });
});
