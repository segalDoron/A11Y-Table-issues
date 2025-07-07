export type Issue = {
    id: number;
    issueType: string;
    severity: 'Low' | 'Minor' | 'Critical';
    component: string;
    selector: string;
    url: string;
    description: string;
    codeSnippet: string;
    screenshot: string;
  };

  export const COLUMN_KEYS = [
    'rowIndex',
    'issueType',
    'severity',
    'component',
    'selector',
    'url',
  ] as const;

  
  export type ColumnKey = typeof COLUMN_KEYS[number]; 
  
  export const SEARCHABLE_COLUMNS: ColumnKey[] = ['selector', 'url'];

  export const COLUMN_NAMES: Record<ColumnKey, string> = {
    rowIndex: 'No.',
    issueType: 'Issue Type',
    severity: 'Severity',
    component: 'Component',
    selector: 'Selector',
    url: 'URL',
  };