/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";

export type DataTableKey = string;

export type DataTableValue = any;

export interface DataTableEmptyHeader<Row extends DataTableRow = DataTableRow> {
  key: keyof Row;
  empty: boolean;
  display?: (item: Value) => DataTableValue;
  sort?: false | ((a: DataTableValue, b: DataTableValue) => 0 | -1 | 1);
  columnMenu?: boolean;
}

export interface DataTableNonEmptyHeader<
  Row extends DataTableRow = DataTableRow
> {
  key: keyof Row;
  value: DataTableValue;
  display?: (item: Value) => DataTableValue;
  sort?: false | ((a: DataTableValue, b: DataTableValue) => 0 | -1 | 1);
  columnMenu?: boolean;
}

export type DataTableHeader<Row extends DataTableRow = DataTableRow> =
  | DataTableNonEmptyHeader<Row>
  | DataTableEmptyHeader<Row>;

export interface DataTableRow {
  id: any;
  [key: string]: DataTableValue;
}

export type DataTableRowId = any;

export interface DataTableCell<Row extends DataTableRow = DataTableRow> {
  key: keyof Row;
  value: DataTableValue;
  display?: (item: Value) => DataTableValue;
}

export interface DataTableProps<Row extends DataTableRow = DataTableRow>
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Specify the data table headers
   * @default []
   */
  headers?: DataTableHeader<Row>[];

  /**
   * Specify the rows the data table should render
   * keys defined in `headers` are used for the row ids
   * @default []
   */
  rows?: Row[];

  /**
   * Set the size of the data table
   */
  size?: "compact" | "short" | "medium" | "tall";

  /**
   * Specify the title of the data table
   * @default ""
   */
  title?: string;

  /**
   * Specify the description of the data table
   * @default ""
   */
  description?: string;

  /**
   * Set to `true` to use zebra styles
   * @default false
   */
  zebra?: boolean;

  /**
   * Set to `true` for the sortable variant
   * @default false
   */
  sortable?: boolean;

  /**
   * Set to `true` for the expandable variant
   * Automatically set to `true` if `batchExpansion` is `true`
   * @default false
   */
  expandable?: boolean;

  /**
   * Set to `true` to enable batch expansion
   * @default false
   */
  batchExpansion?: boolean;

  /**
   * Specify the row ids to be expanded
   * @default []
   */
  expandedRowIds?: DataTableRowId[];

  /**
   * Set to `true` for the radio selection variant
   * @default false
   */
  radio?: boolean;

  /**
   * Set to `true` for the selectable variant
   * Automatically set to `true` if `radio` or `batchSelection` are `true`
   * @default false
   */
  selectable?: boolean;

  /**
   * Set to `true` to enable batch selection
   * @default false
   */
  batchSelection?: boolean;

  /**
   * Specify the row ids to be selected
   * @default []
   */
  selectedRowIds?: DataTableRowId[];

  /**
   * Set to `true` to enable a sticky header
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Set to `true` to use static width
   * @default false
   */
  useStaticWidth?: boolean;
}

export default class DataTable<
  Row extends DataTableRow = DataTableRow
> extends SvelteComponentTyped<
  DataTableProps<Row>,
  {
    click: CustomEvent<{
      header?: DataTableHeader<Row>;
      row?: Row;
      cell?: DataTableCell<Row>;
    }>;
    ["click:header--expand"]: CustomEvent<{ expanded: boolean }>;
    ["click:header"]: CustomEvent<{
      header: DataTableHeader<Row>;
      sortDirection?: "ascending" | "descending" | "none";
    }>;
    ["click:row"]: CustomEvent<Row>;
    ["mouseenter:row"]: CustomEvent<Row>;
    ["mouseleave:row"]: CustomEvent<Row>;
    ["click:row--expand"]: CustomEvent<{
      expanded: boolean;
      row: Row;
    }>;
    ["click:cell"]: CustomEvent<DataTableCell<Row>>;
  },
  {
    default: {};
    cell: { row: Row; cell: DataTableCell<Row> };
    ["cell-header"]: { header: DataTableNonEmptyHeader<Row> };
    description: {};
    ["expanded-row"]: { row: Row };
    title: {};
  }
> {}
