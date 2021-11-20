//createElement
import createElement from './element';
import Component from './component';

export type ClassComponent = typeof Component;
export default {
  createElement,
  Component,
};
export * from '../types';
