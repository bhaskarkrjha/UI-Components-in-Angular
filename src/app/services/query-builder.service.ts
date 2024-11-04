import { Injectable } from '@angular/core';

const getUniqueID = () => {
  return (Date.now().toString(36) + Math.random().toString(36).substring(2, 8)).toUpperCase();
};

export interface Rule {
  id: string;
  type: 'rule';
  name: string;
  operator: string;
  value: string;
  hasGroups: boolean;
}

export interface Group {
  id: string;
  type: 'group';
  condition: string;
  rules: (Rule | Group)[];
  hasGroups: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  private query: Group;

  constructor() {
    this.query = {
      id: getUniqueID(),
      type: 'group',
      condition: '',
      rules: [],
      hasGroups: true,
    };
  }

  getQuery(): Group {
    return this.query;
  }

  getNewRule(): Rule {
    return {
      id: getUniqueID(),
      type: 'rule',
      name: '',
      operator : '',
      value: '',
      hasGroups: false,
    };
  }

  getNewGroup(): Group {
    return {
      id: getUniqueID(), // Generate unique id for the group
      type: 'group',
      condition: '',
      rules: [],
      hasGroups: true,
    };
  }
}
