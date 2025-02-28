import { describe, expect, it } from 'vitest';

import { sum } from '../src';

describe('index function', () => {
  it('should add two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
