import ruleEngineOptions from './ruleEngineOptions.json';

export const clientAttributes = ruleEngineOptions.clientAttributes;
export const operators = ruleEngineOptions.operators;

export type ClientAttribute = (typeof clientAttributes)[number];
export type Operator = (typeof operators)[number];
