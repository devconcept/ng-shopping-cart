/**
 * An interface to render option elements inside the select in the AddToCart dropdown editor.
 */
export interface DropdownValue {
  /**
   * The text to display in the option.
   */
  label: string;
  /**
   * The value that will be set when this option is selected.
   */
  value: number;
}
